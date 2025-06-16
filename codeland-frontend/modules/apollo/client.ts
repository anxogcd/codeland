"use client";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const token = localStorage.getItem("token");

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: process.env.GATEWAY_ENDPOINT ?? "http://localhost:4001/graphql",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
