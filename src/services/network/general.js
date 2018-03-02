import * as endpoints from 'data/endpoints'
import {
  authGetRequestHeaders,
  noAuthPostRequestHeaders,
  authPostRequestHeaders,
} from 'fixed/network'

export const fetchMembershipLevels = ({ token }) =>
  fetch(endpoints.general.membershipLevels, {
    headers: authGetRequestHeaders(token),
  })

export const validateReferee = ({ params, token }) =>
  fetch(endpoints.general.validateReferee, {
    body: JSON.stringify(params),
    headers: authPostRequestHeaders(token),
    method: 'POST',
  })

export const alertReferee = ({ params, token }) =>
  fetch(endpoints.general.alertReferee, {
    body: JSON.stringify(params),
    headers: authPostRequestHeaders(token),
    method: 'POST',
  })

export const upload = ({ form: body, token }) =>
  fetch(endpoints.general.upload, {
    body,
    headers: authPostRequestHeaders(token),
    method: 'POST',
  })

export const confirmUser = ({ params }) =>
  fetch(endpoints.general.referrerConfirm, {
    body: JSON.stringify(params),
    method: 'POST',
  })
