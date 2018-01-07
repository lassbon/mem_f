import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from "prop-types";

import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage'
import Home from './Pages/Home/Home';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/UserRoute';
import SignUpPage from './Pages/SignUpPage/SignUpPage';

const App = ({location}) => (
  <div>
    <Route location={location} path='/' exact component={LandingPage} />
    <Route location={location} path='/login' exact component={LoginPage} />
    <Route location={location} path='/signup' exact component={SignUpPage} />
    {/* <GuestRoute location={location} path='/login' exact component={LoginPage} /> */}
    <UserRoute location={location} path='/home' exact component={Home} />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App