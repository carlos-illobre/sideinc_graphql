process.env.PORT = 4000
process.env.SIMPLYRETS_URL = 'https://api.simplyrets.com'
process.env.SIMPLYRETS_USERNAME = 'simplyrets'
process.env.SIMPLYRETS_PASSWORD = 'simplyrets' 

const axios = require('axios')
const nock = require('nock')

let server
let requestGraphQL

const token = 'dXNlcjFAc2lkZWluYy5jb206Njc2Y2ZkMzQtZTcwNi00Y2NlLTg3Y2EtOTdmOTQ3YzQzYmQ0'

beforeAll(async () => {

  server = (await require('../server')).server
  
  nock(process.env.SIMPLYRETS_URL)
    .get('/properties')
    .query({ q: 'Houston', count: false })
    .reply(200, require('./getHoustonProperties.json'))
  
  requestGraphQL = async ({ query, headers }) =>
    axios.post(`http://localhost:${process.env.PORT}/graphql`, JSON.stringify({ query }), {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })

})


afterAll(async () => {
  debugger
  server.close()
})


describe('GraphQL - listProperties', () => {

  it('should list the Houston properties', async () => {
    const { data } = await requestGraphQL({
      query: `
        query {
          listProperties(city: "Houston") {
            privateRemarks
            property {
              roof
            }
          }
        }
      `, 
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
    expect(data).toMatchSnapshot()
  })

  it('should throw an error if it is not authenticated', async () => {
    const { data } = await requestGraphQL({
      query: `
        query {
          listProperties(city: "Houston") {
            privateRemarks
            property {
              roof
            }
          }
        }
      `, 
    })
    expect(data).toMatchSnapshot()
  })

  it('should throw an error if bad credentials', async () => {
    const { data } = await requestGraphQL({
      query: `
        query {
          listProperties(city: "Houston") {
            privateRemarks
            property {
              roof
            }
          }
        }
      `, 
      headers: {
        Authorization: `Basic badtoken`,
      },
    })
    expect(data).toMatchSnapshot()
  })

})
