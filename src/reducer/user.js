import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_REGISTERED } from '../types'

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...action.payload,
        email: action.payload.email,
        name: action.payload.companyName,
        // picture: action.payload.user.picture,
        id: action.payload.id,
        role: action.payload.role,
        token: state.token || action.payload.token,
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
