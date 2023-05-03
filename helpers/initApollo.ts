import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import fetch from "isomorphic-unfetch";

let apolloClient = null;

if (!process.browser) {
  // Polyfill fetch() on the server (used by apollo-client)
  globalThis.fetch = fetch;
}

function create(initialState, vercelUrl) {
  const url = process.env.api ? process.env.api : vercelUrl;

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: new HttpLink({
      uri: `${url}/api/graphql`,
      credentials: "same-origin",
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export function initApollo(initialState, vercelUrl) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections
  if (!process.browser) {
    return create(initialState, vercelUrl);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, vercelUrl);
  }

  return apolloClient;
}
