import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import jwt from 'jsonwebtoken'
import { composeWithDevTools } from 'redux-devtools-extension'
import persistState from 'redux-localstorage'
import { AppContainer } from 'react-hot-loader'

// ------ paystack -----------------

// import 'semantic-ui-css/semantic.min.css'

// import './index.css'
// import './normalize.css'
import './css/imports.css'
import App from './App'
import rootReducer from './rootReducer'
import store from 'redux/store'

const renderApp = Component =>
  render(
    <AppContainer>
      <BrowserRouter>
        <Provider store={store}>
          <Route component={Component} />
        </Provider>
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('root')
  )

renderApp(App)

if (module.hot) {
  module.hot.accept('App', () => {
    import('App').then(app => renderApp(app.default))
  })
}
