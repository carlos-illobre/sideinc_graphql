const base64 = require('base-64')

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  try {
    if (!authorization || !authorization.startsWith('Basic ')) {
      throw new Error('Authorization header is mandatory: "Authorization": "Basic dXNlcjFAc2lkZWluYy5jb206Njc2Y2ZkMzQtZTcwNi00Y2NlLTg3Y2EtOTdmOTQ3YzQzYmQ0"')
    }
    const token = authorization.substring('Basic '.length)
    const decoded = base64.decode(token)
    const [username, password] = decoded.split(':')
    if (username != `user1@sideinc.com` || password != `676cfd34-e706-4cce-87ca-97f947c43bd4`) {
      throw new Error('Bad credentials, you should use this header: "Authorization": "Basic dXNlcjFAc2lkZWluYy5jb206Njc2Y2ZkMzQtZTcwNi00Y2NlLTg3Y2EtOTdmOTQ3YzQzYmQ0"')
    }
    next()
  } catch(error) {
    next(error)
  }
}
