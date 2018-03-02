import * as actions from '../actions'

export const auth = (state = {}, action) =>
  action.type === actions.RECEIVED_LOGIN_AUTH_DETAILS ||
  action.type === actions.RECEIVED_OLD_USER_LOGIN_DETAILS
    ? { ...state, ...action.payload }
    : state
