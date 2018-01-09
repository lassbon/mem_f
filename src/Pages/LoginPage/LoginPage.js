import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from "../../actions/auth";
import {Message, Grid} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import LoginForm from './LoginForm';

class LoginPage extends React.Component {

  submit =(data) => 
    this.props.login(data).then(() => this.props.history.push('/app'))

  render() {
    return(
      <div>
        <LoginForm submit={this.submit} />
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Message>
              New to us? <Link to='/signup' style={{ color: 'var(--main-blue)' }}>Sign Up</Link>
            </Message>
            <Message>
              <Link to='/forgotpassword' style={{ color: 'var(--main-blue)' }}>forgot password?</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
};

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
}

export default connect(null, { login })(LoginPage)