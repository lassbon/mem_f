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

export const createNewsComment = ({ params, token }) =>
  fetch(endpoints.news.comments, {
    body: JSON.stringify(params),
    headers: authPostRequestHeaders(token),
    method: 'POST',
  })

export const likeNews = ({ params, token }) =>
  fetch(endpoints.news.likeNews, {
    body: JSON.stringify(params),
    headers: authPostRequestHeaders(token),
    method: 'POST',
  })
