import * as endpoints from 'data/endpoints'
import {
  authGetRequestHeaders,
  noAuthPostRequestHeaders,
  authPostRequestHeaders,
} from 'fixed/network'

export const fetchALlNews = ({ token }) =>
  fetch(endpoints.news.allNews, {
    headers: authGetRequestHeaders(token),
  })

export const fetchSingleNews = ({ id, token }) =>
  fetch(endpoints.news.singleNews`${id}`, {
    headers: authGetRequestHeaders(token),
    method: 'GET',
  })
