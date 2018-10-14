import React from 'react';
import App, { Container } from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/orange';
import { ApolloProvider } from 'react-apollo';

import withApolloClient from '../helpers/with-apollo';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
});

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </MuiThemeProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp);
