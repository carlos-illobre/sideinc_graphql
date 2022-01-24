const express = require('express')
const bodyParser = require('body-parser')
const expressWinston = require('express-winston')
const authorize = require('./middlewares/authorize')

module.exports = async ({ db, logger }) => express()
  .use(expressWinston.logger({
    winstonInstance: logger,
    msg: '{{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms',
    meta: false,
  }))
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use((req, res, next) => {
    req.base = `${req.protocol}://${req.get('host')}`
    req.logger = logger
    return next()
  })
  .use('/graphql', authorize)
  .use((error, req, res, next) => {
    logger.error(error, error)
    res.json({ message: error.message })
  })
