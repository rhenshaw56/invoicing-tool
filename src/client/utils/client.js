import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import fetch from 'unfetch';

const getCache = () => {
  if (typeof window !== 'undefined') {
    console.log('AP', window.__APOLLO_STATE__);
    return new InMemoryCache().restore(JSON.parse(window.__APOLLO_STATE__));
  }
  return new InMemoryCache();
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: 'http://localhost:3006/graphql',
    credentials: 'same-origin',
    fetch: fetch,
    ssrForceFetchDelay: 1000,
  })
});

export default client;
