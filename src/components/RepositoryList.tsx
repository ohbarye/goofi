import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import './App.css';

import { octokit } from '../utils/GitHubClient';
import RepositoryCard from "./RepositoryCard";

interface Props {
  language: string;
}

interface State {
  loading: boolean;
  repos: object[];
}

class RepositoryList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      repos: [],
    };
  }

  public async fetchRepos() {
    const q = `good-first-issues:>1 language:${this.props.language} stars:>500`;
    const sort = 'stars';
    const order = 'desc';
    const perPage = 20;
    const page = 1;
    const result = await octokit.search.repos({q, sort, order, per_page: perPage, page});

    this.setState((prevState) => {
      return {
        ...prevState,
        loading: false,
        repos: result.data.items,
      }
    })

  }

  public componentDidMount() {
    this.fetchRepos()
  }

  public render() {
    return (
      <div>
        {this.state!.loading && <CircularProgress />}
        {!this.state!.loading && this.state!.repos.map((repo: any) => <RepositoryCard key={repo.id} repo={repo} />)}
      </div>
    );
  }
}

export default RepositoryList;
