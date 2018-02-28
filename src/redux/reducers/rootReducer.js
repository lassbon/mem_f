import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as generic from './generic'
import * as auth from './auth'
import * as user from './user'
import * as social from './social'
import * as event from './event'

const reducers = {
  ...auth,
  ...event,
  ...generic,
  routing: routerReducer,
  ...social,
  ...user,
}
const rootReducer = combineReducers(reducers)

export default rootReducer
