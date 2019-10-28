import { HttpLink, InMemoryCache, ApolloClient } from "apollo-boost";
import fetch from "isomorphic-unfetch";
import { GoofiGlobal } from "../interfaces";

let apolloClient = null;

if (!process.browser) {
  // Polyfill fetch() on the server (used by apollo-client)
  (global as GoofiGlobal).fetch = fetch;
}

function create(initialState, nowUrl) {
  const url = process.env.api ? process.env.api : nowUrl;

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: new HttpLink({
      uri: `${url}/api/graphql`,
      credentials: "same-origin"
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export function initApollo(initialState, nowUrl) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections
  if (!process.browser) {
    return create(initialState, nowUrl);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, nowUrl);
  }

  return apolloClient;
}
