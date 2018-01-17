import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from "prop-types";

import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage'
import Home from './Pages/Home/Home';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import ContReg from './Pages/contReg/ContReg';
import ContReg2 from './Pages/contReg/ContReg2';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import Main from './components/Main';
import ContReg3 from './Pages/contReg/ContReg3';
import ContReg4 from './Pages/contReg/ContReg4';
import ContReg5 from './Pages/contReg/ContReg5';

const App = ({ location }) => (
  <div>
    <Route location={location} path="/" exact component={LandingPage} />
    <Route exact path="/cont" component={ContReg} />
    <Route exact path="/cont2" component={ContReg2} />
    <Route exact path="/cont3" component={ContReg3} />
    <Route exact path="/cont4" component={ContReg4} />
    <Route exact path="/cont5" component={ContReg5} />
    {/* <Route location={location} path='/login' exact component={LoginPage} /> */}
    <GuestRoute
      location={location}
      path="/signup"
      exact
      component={SignUpPage}
    />
    <GuestRoute
      location={location}
      path="/forgotpassword"
      exact
      component={ForgotPassword}
    />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <UserRoute location={location} path="/app" exact component={Main} />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App