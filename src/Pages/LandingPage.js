import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types'

import Home from './Home/Home';
import WelcomePage from "./WelcomePage/WelcomePage";

const LandingPage = ({ isAuthenticated }) => (
  <React.Fragment>
    { isAuthenticated ? 
      <Home /> : 
      <WelcomePage /> 
    }
  </React.Fragment>
)

LandingPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return{
    isAuthenticated: !!state.user.token
  }
}

export default connect(mapStateToProps)(LandingPage)