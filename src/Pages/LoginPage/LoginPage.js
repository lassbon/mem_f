import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from "../../actions/auth";
import {Message, Grid, Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import LoginForm from './LoginForm';

class LoginPage extends React.Component {

  submit = (data) => 
    this.props.login(data).then(() => this.props.history.push('/app'))

  render() {
    return <div className='login-form'>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
          
            <Image style={{marginBottom: 20}} verticalAlign='middle' src='http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png' />

        <LoginForm submit={this.submit} />
            <Message>
              New to us? <Link to="/signup" style={{ color: "var(--main-blue)" }}>
                Sign Up
              </Link>
            </Message>
            
              <Link to="/forgotpassword" style={{ color: "var(--main-blue)" }}>
                forgot password?
              </Link>
            
          </Grid.Column>
        </Grid>
      </div>;
  }
};

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
}

export default connect(null, { login })(LoginPage)