Please read the PLEASE_READ_FIRST.md first.

Please document your code & design decisions here.

I can't use Bearer authentication because to use it we need a login endpoint to generate a token, with more time I can create it but in only 3hs I can only implement a Basic authentication.

# Run

1) yarn install
2) yarn start
3) go to http://localhost:4000/graphql
4) Use the editoro to send this query
```
query {
  listProperties(city: "Houston") {
    privateRemarks
    property {
      roof
    }
  }
}
```
5) Set the athorization header to
```
"Authorization": "Basic dXNlcjFAc2lkZWluYy5jb206Njc2Y2ZkMzQtZTcwNi00Y2NlLTg3Y2EtOTdmOTQ3YzQzYmQ0"
```

Or just execute this: 
```
curl 'http://localhost:4000/graphql' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic dXNlcjFAc2lkZWluYy5jb206Njc2Y2ZkMzQtZTcwNi00Y2NlLTg3Y2EtOTdmOTQ3YzQzYmQ0' --data-binary '{"query":"query {\n  listProperties(city: ${city}) {\n    \n}"}'
```

# Test

```
yarn test
```
