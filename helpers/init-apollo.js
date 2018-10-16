import { InMemoryCache, ApolloClient } from "apollo-boost";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { SchemaLink } from 'apollo-link-schema';
import { schema } from '../server/graphql';

let apolloClient = null;

if (!process.browser) {
  // Polyfill fetch() on the server (used by apollo-client)
  global.fetch = fetch;
}

function create(initialState) {
  console.log('initttttttttttttttttttttttttttttttttttttttttttttttttttt')
  // console.log(initialState)
  console.log(process.browser)
  console.log(publicRuntimeConfig)
  console.log(fetch)
  console.log('initttttttttttttttttttttttttttttttttttttttttttttttttttt')
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
