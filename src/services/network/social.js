import * as endpoints from 'data/endpoints'
import { authGetRequestHeaders, authPostRequestHeaders } from 'fixed/network'

export const fetchTimelinePosts = ({ token }) =>
  fetch(endpoints.social.timelinePosts, {
    headers: authGetRequestHeaders(token),
  })

export const createTimelinePost = ({ params, token }) =>
  fetch(endpoints.social.timelinePosts, {
    body: JSON.stringify(params),
    headers: authPostRequestHeaders(token),
    method: 'POST',
  })

export const createComment = ({ params, token }) =>
  fetch(endpoints.social.comments, {
    body: JSON.stringify(params),
    headers: authPostRequestHeaders(token),
    method: 'POST',
  })

export const likePost = ({ params, token }) =>
  fetch(endpoints.social.likePost, {
    body: JSON.stringify(params),
    headers: authPostRequestHeaders(token),
    method: 'POST',
  })
