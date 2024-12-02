// import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GraphQLClient } from "graphql-request";
// const client = new ApolloClient({
//     uri: 'http://127.0.0.1:8000/graphql', // Backend GraphQL endpoint
//     cache: new InMemoryCache(),
//     ssrMode: typeof window !== 'undefined',
// });
export const client = new GraphQLClient('http://127.0.0.1:8000/graphql/');

// export default client;

