import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GATEWAY_ENDPOINT ?? "http://localhost:4001/graphql",
  }),
  cache: new InMemoryCache(),
});

export default client;
