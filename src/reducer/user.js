import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_REGISTERED } from '../types'

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        email: action.payload.user.email,
        name: action.payload.user.company,
        picture: action.payload.user.picture,
        id: action.payload.user.id,
        role: action.payload.user.role,
        token: action.payload.token,
      }
    case USER_LOGGED_OUT:
      return {}
    case USER_REGISTERED:
      return {
        ...state,
        ...action.payload.user,
      }
    default:
      return state
  }
}
