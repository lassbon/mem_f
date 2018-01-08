import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react'

import WelcomePage from "./WelcomePage/WelcomePage";
import * as actions from "../actions/auth";

const LandingPage = ({ isAuthenticated, logout }) => (
  <React.Fragment>
    { isAuthenticated ? 
      <Button onClick={() => logout()}>Logout</Button> : 
      <div>
        <Link to='/login'>Login</Link> or <Link to="/signup">Signup</Link>
      </div>
    }
  </React.Fragment>
)

LandingPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return{
    isAuthenticated: !!state.user.token
    // isAuthenticated: !!state.user.email
  }
}

export default connect(mapStateToProps, { logout: actions.logout })(LandingPage)