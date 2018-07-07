import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/orange';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
});

function MyApp() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  );
}

ReactDOM.render(
  <MyApp />,
  document.getElementById('root') as HTMLElement
);
