import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import rootReducer from './reducers/rootReducer'
import network from 'services/network'

const enhancer = compose(
  applyMiddleware(thunk.withExtraArgument({ network })),
  persistState(['auth', 'user']),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const initialState = undefined
const store = createStore(rootReducer, initialState, enhancer)

export default store
