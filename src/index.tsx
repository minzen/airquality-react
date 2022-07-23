import React from 'react'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { createRoot } from 'react-dom/client'

const APOLLO_SERVER_URI = process.env.REACT_APP_APOLLO_SERVER_URI
const APOLLO_SERVER_WS_URI = process.env.REACT_APP_APOLLO_SERVER_WS_URI

const cache = new InMemoryCache()

const wsLink = new WebSocketLink({
  uri: APOLLO_SERVER_WS_URI,
  options: { reconnect: true, timeout: 60000 }
})

const httpLink = new HttpLink({
  uri: APOLLO_SERVER_URI,
  headers: {
    authorization: process.env.AUTH
  }
})

const terminatingLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

const link = ApolloLink.from([terminatingLink]) 

const client = new ApolloClient({
  cache,
  link
})

const container = document.getElementById('root')
const root = createRoot(container)
root.render (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
