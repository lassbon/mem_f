import * as endpoints from 'data/endpoints'
import {
  authGetRequestHeaders,
  noAuthPostRequestHeaders,
  authPostRequestHeaders,
} from 'fixed/network'

export const getUserDetails = ({ id, token }) =>
  fetch(endpoints.user.idedUser`${id}`, {
    headers: authGetRequestHeaders(token),
  })

export const getUserEvents = () => {}

export const registerUser = ({ params }) =>
  fetch(endpoints.user.user, {
    headers: noAuthPostRequestHeaders(),
    body: JSON.stringify(params),
    method: 'POST',
  })

export const updateUserDetails = ({ id, params, token }) =>
  fetch(endpoints.user.idedUser`${id}`, {
    headers: authPostRequestHeaders(token),
    body: JSON.stringify(params),
    method: 'PUT',
  })

export const fetchUsers = ({ token }) =>
  fetch(endpoints.user.user, {
    headers: authGetRequestHeaders(token),
  })

export const resetPassword = ({ params }) =>
  fetch(endpoints.user.resetPassword, {
    headers: noAuthPostRequestHeaders(),
    body: JSON.stringify(params),
    method: 'POST',
  })

export const changePassword = ({ params }) =>
  fetch(endpoints.user.changePassword, {
    body: JSON.stringify(params),
    method: 'POST',
  })

export const fetchUserSocialActivity = ({ id, token }) =>
  fetch(endpoints.user.activity`${id}`, {
    headers: authGetRequestHeaders(token),
    method: 'GET',
  })

export const fetchFriendRequests = ({ id, token }) =>
  fetch(endpoints.user.friendRequests`${id}`, {
    headers: authGetRequestHeaders(token),
    method: 'GET',
  })

export const sendFriendRequest = ({ params, token }) =>
  fetch(endpoints.user.sendFriendRequest, {
    body: JSON.stringify(params),
    headers: authPostRequestHeaders(token),
    method: 'POST',
  })
