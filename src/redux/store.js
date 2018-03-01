import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import rootReducer from './reducers/rootReducer'
import network from 'services/network'

const dev = window.location.href.indexOf('localhost') > -1

const enhancer = dev
  ? compose(
      applyMiddleware(thunk.withExtraArgument({ network })),
      persistState(['auth', 'user']),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  : compose(
      applyMiddleware(thunk.withExtraArgument({ network })),
      persistState(['auth', 'user'])
    )

const initialState = undefined
const store = createStore(rootReducer, initialState, enhancer)

export default store
