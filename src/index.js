import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import 'semantic-ui-css/semantic.min.css';

import './index.css';
import './normalize.css'
import App from './App';
import rootReducer from './rootReducer'

import registerServiceWorker from './registerServiceWorker';
import { userLoggedIn } from './actions/auth';
import setAuthorizationHeader from './actions/setAuthorizationHeader';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

if (localStorage.acciJWT) {
  const user = { token: localStorage.acciJWT }
  store.dispatch(userLoggedIn(user)) 
  setAuthorizationHeader(localStorage.acciJWT);
}

render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
