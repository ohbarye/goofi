import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';

function MyApp() {
  return (
    <>
      <CssBaseline />
      <App />
    </>
  );
}

ReactDOM.render(
  MyApp(),
  document.getElementById('root') as HTMLElement
);
