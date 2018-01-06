import React from "react";
import { Button } from 'semantic-ui-react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'

import * as actions from "../../actions/auth";
import ConfirmEmailMessage from '../../components/messages/ConfirmEmailMessage';

// const Home = ({logout}) => (
const Home = ({isConfirmed}) => (
  <React.Fragment>
    {/* Home
    <Button onClick={() => logout()}>Logout</Button> */}
    {!isConfirmed && <ConfirmEmailMessage />}
  </React.Fragment>
)

Home.propTypes = {
  isConfirmed: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed
  }
}

// Home.propTypes = {
//   logout: PropTypes.func.isRequired
// }

// export default connect({logout: actions.logout})(Home)
export default connect(mapStateToProps)(Home)