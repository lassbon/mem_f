import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import rootReducer from './reducers/rootReducer'

const enhancer = compose(applyMiddleware(thunk), persistState(['auth', 'user']))

const initialState = undefined
const store = createStore(
  rootReducer,
  initialState,
  enhancer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
