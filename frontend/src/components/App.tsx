import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { withStyles, WithStyles, StyleRulesCallback } from '@material-ui/core/styles';
import * as React from 'react';

import Header from "./Header";
import RepositoryCard from "./RepositoryCard";
import { apiClient } from '../utils/ApiClient';

const styles: StyleRulesCallback = theme => ({
  body: {
    paddingBottom: '16px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '80px',
    textAlign: 'center',
  },
});

interface Props extends WithStyles<typeof styles> {}

interface State {
  language: string;
  loading: boolean;
  repos: object[];
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      repos: [],
      language: 'javascript',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  public async fetchRepos(language: string = this.state!.language) {
    const perPage = 10;
    const params = {
      language,
      perPage,
    };
    const response = await apiClient.get('issues', {params});
    const repos = response.data.data.search.nodes;

    this.setState((prevState) => {
      return {
        ...prevState,
        loading: false,
        repos,
      }
    })
  }

  public componentDidMount() {
    this.fetchRepos()
  }

  public handleChange(event: any) {
    const language = event.target.value;
    this.fetchRepos(language);
    this.setState((prevState) => {
      return {
        ...prevState,
        language,
        loading: true,
      };
    });
  }

  public render() {
    const { classes } = this.props;
    return (
      <Paper elevation={1}>
        <Header currentLanguage={this.state!.language} handleChange={this.handleChange}/>
        <div className={classes.body}>
          {this.state!.loading && <CircularProgress />}
          {!this.state!.loading && this.state!.repos.map((repo: any, i: number) => (
            <RepositoryCard key={repo.id} repo={repo} />))}
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
