import express from 'express';
// import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './typeDefs';
import resolvers from './resolvers';


const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: { apiKey: process.env.APOLLO_API_KEY },
  introspection: true,
  // playground: {
    // settings: {
    //   'editor.theme': 'light',
    // },
  // },
});


const port = process.env.PORT || 4000;
const app = express();
server.applyMiddleware({ app });


// @ts-ignore
app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});


