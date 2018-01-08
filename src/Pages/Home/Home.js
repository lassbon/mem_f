import React from "react";
import { Button } from 'semantic-ui-react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'

import * as actions from "../../actions/auth";
import ConfirmEmailMessage from '../../components/messages/ConfirmEmailMessage';
import PostStatus from "../../components/Post/Post";
import Header from "semantic-ui-react/dist/commonjs/elements/Header/Header";

const Home = ({isConfirmed}) => (
  <React.Fragment>
    <h1>Hello world</h1>
  </React.Fragment>
)

// Home.propTypes = {
//   isConfirmed: PropTypes.bool.isRequired
// }

// function mapStateToProps(state) {
//   return {
//     isConfirmed: !!state.user.confirmed
//   }
// }

// export default connect(mapStateToProps)(Home)
export default Home