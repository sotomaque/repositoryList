import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App';

import { SubscriptionClient } from 'onegraph-subscription-client'
import { subscriptionExchange, defaultExchanges, Provider, Client } from 'urql'

import OneGraphAuth from 'onegraph-auth';

const APP_ID = "b4b68f71-c1b6-4d93-bdda-fa7bbe5a9e47"

export const auth = new OneGraphAuth({
  appId: APP_ID,
});

const subscriptionClient = new SubscriptionClient(auth.appId, {
  oneGraphAuth: auth,
});

const urqlClient = new Client({
  url: `https://serve.onegraph.com/graphql?app_id=${APP_ID}`,
  fetchOptions: () => ({ headers: auth.authHeaders() }),
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation);
      },
    }),
  ],
});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={urqlClient}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
