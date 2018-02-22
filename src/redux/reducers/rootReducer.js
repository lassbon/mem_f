import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as generic from './generic'

const reducers = {
  ...generic,
  routing: routerReducer,
}
const rootReducer = combineReducers(reducers)

export default rootReducer
