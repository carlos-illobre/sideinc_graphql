const { ApolloServer, gql } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const { fileLoader, mergeTypes } = require('merge-graphql-schemas')

module.exports = async ({ app, logger, simplyrets }) => {

  const apollo = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs: [
        gql(mergeTypes(fileLoader(`${__dirname}/**/*.gql`), { all: true })),
      ],
      resolvers: [
        ...fileLoader(`${__dirname}/**/*.resolver.js`),
      ],
    }),
    context: ({ req, connection }) => ({
      logger,
      req,
      simplyrets,
    }),
    playground: {
      settings: {
        'tracing.hideTracingResponse': false,
      },
    },
    formatResponse: (response) => {
      return response
    },
  })

  apollo.applyMiddleware({ app })

  return apollo

}
