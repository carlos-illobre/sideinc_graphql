const { createLogger, format, transports } = require('winston')

module.exports = () => createLogger({
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
  ),
  silent: process.env.NODE_ENV == 'test',
  transports: [
    new transports.Console({
      name: 'error-console',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      exitOnError: true,
    }),
    new transports.File({
      name: 'debug-file',
      filename: 'log.log',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      exitOnError: true,
      json: false,
      maxsize: 104857600,
      maxFiles: 5,
    }),
  ],
})
