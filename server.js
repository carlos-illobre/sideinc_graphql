const { PORT } = process.env

const http = require('http')
const logger = require('./createLogger')()
const createExpressApp = require('./createExpressApp')
const createApolloServer = require('./graphql/createApolloServer')
const simplyrets = require('./SimplyRETS')

module.exports = (async () => {

  const app = await createExpressApp({ logger })
  const apollo = await createApolloServer({ app, logger, simplyrets })

  return new Promise((resolve, reject) => {

    const server = http.createServer().on('request', app)

    apollo.installSubscriptionHandlers(server)

    server.listen(PORT, () => {
      logger.info(`Graphql server ready at http://localhost:${PORT}${apollo.graphqlPath}`)
      return resolve({ server })
    })

  })

})()

