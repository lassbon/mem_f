import * as actions from '../actions'

export const auth = (state = {}, action) =>
  (action.type === actions.RECEIVED_LOGIN_AUTH_DETAILS ? { ...state, ...action.payload } : state)
