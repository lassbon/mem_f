import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

// ------ paystack -----------------

// import 'semantic-ui-css/semantic.min.css'

// import './index.css'
// import './normalize.css'
import './css/imports.css'
import App from './App'
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
