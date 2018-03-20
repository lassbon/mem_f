import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { firebaseReducer } from 'react-redux-firebase'

import * as actions from 'redux/actions'
import * as generic from './generic'
import * as auth from './auth'
import * as user from './user'
import * as social from './social'
import * as event from './event'
import * as hack from './hack'
import * as news from './news'

const reducers = {
  ...auth,
  ...event,
  fbDb: firebaseReducer,
  ...generic,
  ...hack,
  ...news,
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
