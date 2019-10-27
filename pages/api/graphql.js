import { typeDefs, resolvers } from '../../server/graphql';
import { ApolloServer } from 'apollo-server-micro'

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false
  }
}

export default apolloServer.createHandler({ path: '/api/graphql' })
