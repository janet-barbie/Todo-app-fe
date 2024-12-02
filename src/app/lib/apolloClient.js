import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://127.0.0.1:8000/graphql', // Backend GraphQL endpoint
    cache: new InMemoryCache(),
    ssrMode: typeof window !== 'undefined',
});

export default client;
