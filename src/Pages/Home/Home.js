import React from "react";
import { Button } from 'semantic-ui-react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'

import * as actions from "../../actions/auth";

const Home = ({logout}) => (
  <React.Fragment>
    Home
    <Button onClick={() => logout()}>Logout</Button>
  </React.Fragment>
)

Home.propTypes = {
  logout: PropTypes.func.isRequired
}

export default ({logout: actions.logout})(Home)