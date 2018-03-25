import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import { reactReduxFirebase } from 'react-redux-firebase'

import firebase from 'services/firebase'
import rootReducer from './reducers/rootReducer'
import network from 'services/network'

const dev = window.location.href.indexOf('localhost') > -1

const enhancer = dev
  ? compose(
      applyMiddleware(thunk.withExtraArgument({ network })),
      persistState(['auth', 'user']),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
      reactReduxFirebase(firebase)
    )
  : compose(
      applyMiddleware(thunk.withExtraArgument({ network })),
      persistState(['auth', 'user']),
      reactReduxFirebase(firebase)
    )

const initialState = undefined
const store = createStore(rootReducer, initialState, enhancer)

store.subscribe(() => {
  window.postMessage(JSON.stringify(store.getState()), '*')
})

export default store
