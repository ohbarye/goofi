import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { extractCritical } from 'emotion-server';

// Document component is strongly typed with `@types/next`
export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = extractCritical(page.html);

    return {
      ...page,
      ...styles,
    };
  }

  render () {
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
    document.querySelector('form[name=tune]').addEventListener('change', () => document.tune.submit())

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
