import * as endpoints from 'data/endpoints'
import {
  authGetRequestHeaders,
  noAuthPostRequestHeaders,
  authPostRequestHeaders,
} from 'fixed/network'

export const getMembershipPayment = ({ id, token }) =>
  fetch(endpoints.payment.membership`${id}`, {
    headers: authGetRequestHeaders(token),
  })

export const unsubscribeDue = ({ params, token }) => fetch(endpoints.payment.unsubscribeDue, {
  body: JSON.stringify(params),
  headers: authPostRequestHeaders(token),
  method: 'POST'
})