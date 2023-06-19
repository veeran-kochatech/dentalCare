import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { URL, PERMANENTAUTH_TOKEN } from './constants';
import { setContext } from '@apollo/client/link/context';
import axios from 'axios';

const httpLink = createHttpLink({
  uri: URL,
});





const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer {authToken}`
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;