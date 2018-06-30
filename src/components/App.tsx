import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { withStyles, WithStyles, StyleRulesCallback } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import './App.css';

import RepositoryList from "./RepositoryList";

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
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      language: 'javascript',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  public handleChange(event: any) {
    this.setState((prevState) => {
      return {
        ...prevState,
        language: event.target.value,
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
          <RepositoryList language={this.state!.language} />
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
