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
import StepOne from './Pages/contReg/StepOne';
import StepTwo from './Pages/contReg/StepTwo';
import ContReg2 from './Pages/contReg/ContReg2';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import Main from './components/Main';

const App = ({ location }) => (
  <div>
    <Route location={location} path="/" exact component={LandingPage} />
    <Route exact path="/cont" component={ContReg} />
    <Route exact path="/cont2" component={ContReg2} />
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
    <GuestRoute location={location} path='/signup/continue/step-one' exact component = {StepOne} />
    <GuestRoute location={location} path='/signup/continue/step-two' exact component = {StepTwo} />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App