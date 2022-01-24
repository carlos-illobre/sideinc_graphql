const axios = require('axios')

const url = process.env.SIMPLYRETS_URL
const username = process.env.SIMPLYRETS_USERNAME
const password = process.env.SIMPLYRETS_PASSWORD

module.exports = city => axios({
  url: `${url}/properties`,
  method: 'get',
  auth: {
    username,
    password,
  },
  params: {
    q: city,
    count: false,
  }
})

// curl -X GET "https://api.simplyrets.com/properties?q=Houston&count=true" -H  "accept: application/json" -H  "Authorization: Basic c2ltcGx5cmV0czpzaW1wbHlyZXRz"


