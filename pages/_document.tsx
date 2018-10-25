import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server';

// Document component is strongly typed with `@types/next`
class MyDocument extends Document {
  render () {
    const { pageContext } = this.props;

    return (
      <html lang="en">
        <Head>

          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="This is a simple app to list issues labelled as 'good first issue' in popular repositories" />
          <meta name="keywords" content="OSS,JavaScript,TypeScript,GraphQL,Nodejs" />
          <meta name="author" content="Masato Ohba<over.rye@gmail.com>" />
          <meta name="application-name" content="goofi" />

          <title>Good First Issues</title>

          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />

          <meta name="theme-color" content={pageContext.theme.palette.primary.main} />

          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />

          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: clientSideJS }}
          />

          {/* Global site tag (gtag.js) - Google Analytics */}
          <script
            async
            src={"https://www.googletagmanager.com/gtag/js?id=UA-58056432-8"}
          />

          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: GA }}
          />
        </body>
      </html>
    )
  }
}

const clientSideJS = `
  document.addEventListener('DOMContentLoaded', event => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
          console.log('SW registered: ', registration)
        }).catch(registrationError => {
          console.log('SW registration failed: ', registrationError)
        })
      })
    }
  })
`;

const GA = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-58056432-8');
`;


MyDocument.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  let pageContext;
  const page = ctx.renderPage(Component => {
    const WrappedComponent = props => {
      pageContext = props.pageContext;
      return <Component {...props} />;
    };

    return WrappedComponent;
  });

  return {
    ...page,
    pageContext,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
        />
        {flush() || null}
      </React.Fragment>
    ),
  };
};

export default MyDocument;
