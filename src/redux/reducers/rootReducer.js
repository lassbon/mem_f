import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as actions from 'redux/actions'
import * as generic from './generic'
import * as auth from './auth'
import * as user from './user'
import * as social from './social'
import * as event from './event'
import * as hack from './hack'

const reducers = {
  ...auth,
  ...event,
  ...generic,
  ...hack,
  routing: routerReducer,
  ...social,
  ...user,
}
const appReducer = combineReducers(reducers)
const rootReducer = (state, action) => {
  if (action.type === actions.LOG_OUT) state = undefined
  return appReducer(state, action)
}

export default rootReducer
