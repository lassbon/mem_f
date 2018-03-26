import * as endpoints from 'data/endpoints'
import {
  authGetRequestHeaders,
  noAuthPostRequestHeaders,
  authPostRequestHeaders,
} from 'fixed/network'

export const fetchCompletedProjects = ({ token }) =>
  fetch(endpoints.projects.completed, {
    headers: authGetRequestHeaders(token),
  })

export const fetchOngoingProjects = ({ token }) =>
  fetch(endpoints.projects.ongoing, {
    headers: authGetRequestHeaders(token),
  })

export const fetchOngoingProject = ({ id, token }) =>
  fetch(endpoints.projects.ongoingProject`${id}`, {
    headers: authGetRequestHeaders(token),
    method: 'GET',
  })

export const fetchCompletedProject = ({ id, token }) =>
  fetch(endpoints.projects.completedProject`${id}`, {
    headers: authGetRequestHeaders(token),
    method: 'GET',
  })
