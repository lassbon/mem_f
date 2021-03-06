import * as actions from '../actions'
import { normalize, schema } from 'normalizr'

const defaults = {
  user: {},
  users: null,
  userActivity: null,
  friendRequests: null,
  myFriendRequests: null,
  friends: null,
  notifications: {
    chatNotifications: [],
    friendRequestNotifications: [],
  },
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

  if (
    action.type === actions.CANCELED_FRIEND_REQUEST ||
    action.type === actions.ACCEPTED_FRIEND_REQUEST
  ) {
    const newRequests = state.result.filter(id => id !== action.payload.id)
    return {
      ...state,
      result: newRequests,
    }
  }
  return state
}

export const myFriendRequests = (state = defaults.myFriendRequests, action) => {
  if (action.type === actions.RECEIVED_MY_FRIEND_REQUESTS) {
    const requestsListSchema = [new schema.Entity('requests')]
    const normalizedRequests = normalize(action.payload, requestsListSchema)
    return normalizedRequests
  }

  return state
}

export const friends = (state = defaults.friends, action) => {
  if (action.type === actions.RECEIVED_USER_ACTIVITY) {
    const friendsListSchema = [new schema.Entity('friends')]
    const normalizedFriends = normalize(
      action.payload.friends,
      friendsListSchema
    )
    return normalizedFriends
  }

  if (action.type === actions.ACCEPTED_FRIEND_REQUEST) {
    console.log(action.payload)
    const { friend } = action.payload
    //console.log(friend)
    return {
      ...state,
      entities: {
        ...state.entities,
        friends: {
          ...state.entities.friends,
          [action.payload.id]: action.payload,
        },
      },
      result: [action.payload.id, ...state.result],
    }
  }
  return state
}

export const myNotifications = (state = defaults.notifications, action) => {
  if (action.type === actions.UPDATE_NOTIFICATION) {
    if (action.payload.type === 'chat') {
      return {
        ...state,
        chatNotifications: [...action.payload.message]
      }
    } else if (action.payload.type === 'friendRequest' && state.friendRequestNotifications.indexOf(action.payload.message) < 0) {
      return {
        ...state,
        friendRequestNotifications: [action.payload.message, ...state.friendRequestNotifications]
      }
    } else if (action.payload.type === 'friendRequest' && state.friendRequestNotifications.indexOf(action.payload.message) > -1) {
      return {
        ...state,
        friendRequestNotifications: state.friendRequestNotifications.splice(state.friendRequestNotifications.indexOf(action.payload.message), 1)
      }
    }
  }

  return state
}
