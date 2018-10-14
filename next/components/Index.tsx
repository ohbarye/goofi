import Paper from '@material-ui/core/Paper';
import * as React from 'react';

import Header from "./Header";
import RepositoryList from "./RepositoryList";
import { apiClient } from '../utils/ApiClient';
import { Repository } from "../interfaces";
import ButtonArea from "./ButtonArea";
import Grid from "@material-ui/core/Grid";
import { StyleRulesCallback } from "@material-ui/core/styles";
import { WithStyles, withStyles } from "@material-ui/core";

interface State {
  language: string;
  loading: boolean;
  repos: Repository[];
  pageInfo: {
    endCursor?: string;
    hasNextPage: boolean;
  };
  repositoryCount: number;
}

const styles: StyleRulesCallback = theme => ({
  paper: {
    backgroundColor: '#efefef',
    paddingTop: '70px',
  },
});

interface Props extends WithStyles<typeof styles> {
  language: string;
  goodFirstIssues: any;
}

class Index extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      language: props.language,
      repos: props.goodFirstIssues.repositories,
      pageInfo: {...props.goodFirstIssues.pageInfo},
      repositoryCount: props.goodFirstIssues.repositoryCount,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  public async fetchRepos(language: string = this.state!.language) {
    if (language === this.state!.language) {
      this.setState((prevState) => {
        return {
          ...prevState,
          loading: true,
        }
      });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          language,
          repos: [],
          loading: true,
          pageInfo: {
            endCursor: undefined,
            hasNextPage: true,
          },
          repositoryCount: 0,
        };
      });
    }

    const endCursor = language === this.state!.language ? this.state!.pageInfo.endCursor : undefined;

    const params = {
      endCursor,
      language,
      perPage: 10,
    };
    const response = await apiClient.get('issues', {params});
    const repos = response.data.data.search.nodes;
    const pageInfo = response.data.data.search.pageInfo;
    const repositoryCount = response.data.data.search.repositoryCount;

    this.setState((prevState) => {
      return {
        ...prevState,
        loading: false,
        repos: prevState.repos.concat(repos),
        pageInfo,
        repositoryCount,
      }
    });
  }

  public handleClick() {
    this.fetchRepos();
  }

  public render() {
    return (
      <Paper elevation={1} className={this.props.classes.paper}>
        <Header
          language={this.state!.language}
          fetchedRepositoryCount={this.state!.repos.length}
          totalRepositoryCount={this.state!.repositoryCount}
        />
        <Grid container={true} justify={'center'}>
          <Grid item={true} xs={12} sm={10} md={10} lg={8}>
            <RepositoryList loading={this.state!.loading} repos={this.state!.repos}/>
            <ButtonArea loading={this.state!.loading} handleClick={this.handleClick} hasNextPage={this.state!.pageInfo.hasNextPage}/>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(Index);
