import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, WithStyles, StyleRulesCallback } from '@material-ui/core/styles';
import * as React from 'react';
import { GitHub } from './icons/GitHub'

// TODO Try Downshift https://material-ui.com/demos/autocomplete/#react-autosuggest
const languageOptions = [
  { value: 'javascript', name: 'JavaScript' },
  { value: 'go', name: 'Go' },
  { value: 'java', name: 'Java' },
  { value: 'python', name: 'Python' },
  { value: 'ruby', name: 'Ruby' },
  { value: 'shell', name: 'Shell' },
  { value: 'typescript', name: 'TypeScript' },
  { value: 'swift', name: 'Swift' },
  { value: 'rust', name: 'Rust' },
];

const styles: StyleRulesCallback = theme => ({
  select: {
    color: '#fff',
  },
  title: {
    flex: '1',
    textAlign: 'left',
  },
});

interface Props extends WithStyles<typeof styles> {
  language: string;
  handleChange: (event: any) => void;
}

const Header: React.SFC<Props> = ({ language, handleChange, classes }: Props) => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.title}>
          Good First Issues
        </Typography>

        <FormControl>
          <Select
            value={language}
            onChange={handleChange}
            inputProps={{
              id: 'language',
              name: 'language',
            }}
            className={classes.select}
          >
            {languageOptions.map((languageOption) => (
              <MenuItem key={languageOption.value} value={languageOption.value}>{languageOption.name}</MenuItem>)
            )}
          </Select>
        </FormControl>

        <Tooltip title="GitHub repository" enterDelay={200}>
          <IconButton
            color='inherit'
            component='a'
            href='https://github.com/ohbarye/goofi'
            target='_blank'
          >
            <GitHub />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
};

export default withStyles(styles)(Header);
