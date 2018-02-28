import * as endpoints from 'data/endpoints'
import {
  authGetRequestHeaders,
  noAuthPostRequestHeaders,
  authPostRequestHeaders,
} from 'fixed/network'

export const fetchCompletedEvents = ({ token }) =>
  fetch(endpoints.events.completed, {
    headers: authGetRequestHeaders(token),
  })

export const fetchOngoingEvents = ({ token }) =>
  fetch(endpoints.events.ongoing, {
    headers: authGetRequestHeaders(token),
  })

export const likeEvent = ({ params, token }) =>
  fetch(endpoints.events.likeEvent, {
    body: JSON.stringify(params),
    headers: authPostRequestHeaders(token),
    method: 'POST',
  })
