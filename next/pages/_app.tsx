import React from 'react';
import App, { Container } from 'next/app';
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

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </MuiThemeProvider>
      </Container>
    )
  }
  // render() {
  //   const { Component, pageProps, apolloClient } = this.props;
  //
  //   return (
  //     <Container>
  //       <ApolloProvider client={apolloClient}>
  //         <Component {...pageProps} />
  //       </ApolloProvider>
  //     </Container>
  //   );
  // }
}
