// apollo.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://your-graphql-endpoint.com/graphql', // Replace with actual endpoint or a placeholder
  cache: new InMemoryCache(),
});