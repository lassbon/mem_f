import * as actions from '../actions'

export const news = (state = null, action) => {
  if (action.type === actions.RECEIVED_ALL_NEWS) {
    return action.payload
  }

  return state
}
