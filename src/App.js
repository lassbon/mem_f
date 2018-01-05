import React from 'react';
import { Route } from 'react-router-dom';

import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage'

const App = () => (
  <div>
    <Route path='/' exact component={LandingPage} />
    <Route path='/login' exact component={LoginPage} />
  </div>
)

export default App