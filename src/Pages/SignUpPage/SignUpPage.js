import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from './SignupForm'

class SignupPage extends React.Component {

  submit = (data) => 
    this.props.signup(data).then(() => this.props.history.push('/home'))

  render() {
    return (
      <SignupForm submit={this.submit} />
    )
  }
};

SignupPage.PropTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
}

// export default connect(null, {signup})(SignupPage);
export default SignupPage