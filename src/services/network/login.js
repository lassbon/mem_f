import * as endpoints from 'data/endpoints'
import { noAuthRequestHeaders } from 'fixed/network'

const login = ({ params }) =>
  fetch(endpoints.user.login, {
    headers: noAuthRequestHeaders(),
    body: JSON.stringify(params),
    method: 'POST',
  })

export default login
