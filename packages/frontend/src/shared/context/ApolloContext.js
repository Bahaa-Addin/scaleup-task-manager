import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from "react";

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

export const ApolloServiceProvider = ({ children }) => (
	<ApolloProvider client={client}>
		{children}
	</ApolloProvider>
);