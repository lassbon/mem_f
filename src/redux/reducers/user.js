import * as actions from '../actions'
import { normalize, schema } from 'normalizr'

const defaults = {
  user: {},
  users: null,
  userActivity: null,
  friendRequests: null,
}

export const user = (state = defaults.user, action) =>
  action.type === actions.RECEIVED_USER_DETAILS
    ? { ...state, ...action.payload }
    : state

export const users = (state = defaults.users, action) => {
  if (action.type === actions.RECEIVED_USERS) {
    const usersListSchema = [new schema.Entity('users')]
    const normalizedUsers = normalize(action.payload, usersListSchema)
    return normalizedUsers
  }
  return state
}

export const userActivity = (state = defaults.userActivity, action) => {
  if (action.type === actions.RECEIVED_USER_ACTIVITY) {
    const userActivityListSchema = [new schema.Entity('posts')]
    const normalizedActivity = normalize(
      action.payload.posts,
      userActivityListSchema
    )
    return normalizedActivity
  }
  return state
}

export const friendRequests = (state = defaults.friendRequests, action) => {
  if (action.type === actions.RECEIVED_FRIEND_REQUESTS) {
    const requestsListSchema = [new schema.Entity('requests')]
    const normalizedRequests = normalize(action.payload, requestsListSchema)
    return normalizedRequests
  }
  return state
}
