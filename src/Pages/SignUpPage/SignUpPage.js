import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signup } from '../../actions/auth'
import { Message, Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import SignupForm from './SignupForm'

class SignupPage extends React.Component {
  render() {
    return (
      <div className="login-form">
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Image
              style={{ marginBottom: 20 }}
              verticalAlign="middle"
              src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
            />

            <SignupForm registerUser={this.props.signup}/>
            <Message>
              already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--main-blue)' }}>
                Login
              </Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

SignupPage.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,
  login: PropTypes.func.isRequired,
}

export default connect(null, {signup})(SignupPage)
