// normal import
import router from './Route/router'

// GraphQL import
import db from './mongo';
import { GraphQLServer, PubSub } from 'graphql-yoga';
import ChatBox from './resolvers/ChatBox';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Message from './resolvers/Message';


// GraphQL setting
const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
//    Subscription,
    User,
    Message,
    ChatBox,
  },
  context: {
    db,
    pubsub,
  },
});

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});

db.once("open", () => {
  console.log("Mongo database connected!");
  console.log(db.User);
});










