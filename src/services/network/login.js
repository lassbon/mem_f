import * as endpoints from 'data/endpoints'
import { noAuthRequestHeaders } from 'fixed/network'

export const login = ({ params }) =>
  fetch(endpoints.user.login, {
    headers: noAuthRequestHeaders(),
    body: JSON.stringify(params),
    method: 'POST',
  })

export const oldUserLogin = ({ params }) =>
  fetch(endpoints.user.oldmember.login, {
    headers: noAuthRequestHeaders(),
    body: JSON.stringify(params),
    method: 'POST',
  })

export default login
