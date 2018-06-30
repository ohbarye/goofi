import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import './App.css';

import RepositoryList from "./RepositoryList";

const styles = {
  body: {
    marginTop: '64px',
  },
};

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
            <Typography variant="title" color="inherit">
              Good First Issues
            </Typography>

            <FormControl >
              <Select
                value={this.state!.language}
                onChange={this.handleChange}
                inputProps={{
                  id: 'language',
                  name: 'language',
                }}
                color={"inherit"}
              >
                <MenuItem value={'javascript'}>JavaScript</MenuItem>
                <MenuItem value={'go'}>Go</MenuItem>
                <MenuItem value={'ruby'}>Ruby</MenuItem>
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
