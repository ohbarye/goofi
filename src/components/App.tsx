import * as Octokit from '@octokit/rest';
import * as React from 'react';
import './App.css';

import logo from './logo.svg';

const octokit = new Octokit();

interface State {
  language: string;
  repos: object[];
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      language: 'javascript',
      repos: [],
    };
  }

  public async componentDidMount() {
    const q = `good-first-issues:>1 language:language stars:>500`;
    const sort = 'stars';
    const order = 'desc';
    const perPage = 100;
    const page = 1;
    const result = await octokit.search.repos({q, sort, order, per_page: perPage, page});

    this.setState({ repos: result.data.items})
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div>
          <ul>
            {this.state && this.state.repos &&
               this.state.repos.map((repo: any) => <li key={repo.id}>{repo.name}</li>)
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
