import AppBar from '@material-ui/core/AppBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { withStyles, WithStyles, StyleRulesCallback } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import './App.css';

import RepositoryCard from "./RepositoryCard";
import { apiClient } from '../utils/ApiClient';

// TODO Try Downshift https://material-ui.com/demos/autocomplete/#react-autosuggest
const languages = [
  { value: 'javascript', name: 'JavaScript' },
  { value: 'go', name: 'Go' },
  { value: 'java', name: 'Java' },
  { value: 'python', name: 'Python' },
  { value: 'ruby', name: 'Ruby' },
  { value: 'shell', name: 'Shell' },
  { value: 'typescript', name: 'TypeScript' },
  { value: 'swift', name: 'Swift' },
];

const styles: StyleRulesCallback = theme => ({
  body: {
    paddingBottom: '16px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '80px',
  },
  select: {
    color: '#fff',
  },
  title: {
    flex: '1',
    textAlign: 'left',
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
    // const q = `good-first-issues:>1 language:${language} stars:>500`;
    // const sort = 'stars';
    // const order = 'desc';
    // const perPage = 20;
    // const page = 1;
    // const result = await octokit.search.repos({q, sort, order, per_page: perPage, page});

    const response = await apiClient.get(`issues?language=${language}`);
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
      <Paper className="App" elevation={1}>
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.title}>
              Good First Issues
            </Typography>

            <FormControl>
              <Select
                value={this.state!.language}
                onChange={this.handleChange}
                inputProps={{
                  id: 'language',
                  name: 'language',
                }}
                className={classes.select}
              >
                {languages.map((language) => (
                  <MenuItem key={language.value} value={language.value}>{language.name}</MenuItem>)
                )}
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
        <div className={classes.body}>
          {this.state!.loading && <CircularProgress />}
          {!this.state!.loading && this.state!.repos.map((repo: any) => <RepositoryCard key={repo.id} repo={repo} />)}
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
