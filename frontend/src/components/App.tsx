import Paper from '@material-ui/core/Paper';
import * as React from 'react';

import Header from "./Header";
import RepositoryList from "./RepositoryList";
import { apiClient } from '../utils/ApiClient';
import { Repository } from "../interfaces";

interface State {
  language: string;
  loading: boolean;
  repos: Repository[];
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
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
    return (
      <Paper elevation={1}>
        <Header currentLanguage={this.state!.language} handleChange={this.handleChange}/>
        <RepositoryList loading={this.state!.loading} repos={this.state!.repos}/>
      </Paper>
    );
  }
}

export default App;
