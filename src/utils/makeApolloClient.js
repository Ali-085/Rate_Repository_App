import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';

// Polyfill fetch for web environment
import fetch from 'cross-fetch';

// Use the environment variable for the API URL, with a fallback to localhost
const apiUrl = Constants.expoConfig?.extra?.env || 'http://localhost:4000/graphql';

console.log('Using API URL:', apiUrl);

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    const token = await authStorage.getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(new HttpLink({ uri: apiUrl, fetch })),
    cache: new InMemoryCache(),
  });

  return client;
};

export default createApolloClient;