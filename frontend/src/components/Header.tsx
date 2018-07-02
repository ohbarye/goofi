import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles, StyleRulesCallback } from '@material-ui/core/styles';
import * as React from 'react';

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
  currentLanguage: string;
  handleChange: (event: any) => void;
}

const Header: React.SFC<Props> = ({ currentLanguage, handleChange, classes }: Props) => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.title}>
          Good First Issues
        </Typography>

        <FormControl>
          <Select
            value={currentLanguage}
            onChange={handleChange}
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
  )
};

export default withStyles(styles)(Header);
