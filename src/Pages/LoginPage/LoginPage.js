import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { Message, Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import LoginForm from './LoginForm'

const registrationStages = [
  '/cont',
  '/cont2',
  '/cont3',
  '/cont4',
  '/cont5',
  '/cont6',
]

class LoginPage extends React.Component {
  submit = data =>
    this.props.login(data).then(user => {
      const { history } = this.props
      const { regState } = user
      console.log(regState, registrationStages[regState])
      regState > 5
        ? history.push('/app')
        : history.push(registrationStages[regState])
      // this.props.history.push('/app')
    })

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
            <LoginForm submit={this.submit} />
            <Message>
              New to us?{' '}
              <Link to="/signup" style={{ color: 'var(--main-blue)' }}>
                Sign Up
              </Link>
            </Message>

            <Link to="/forgotpassword" style={{ color: '#9978ba' }}>
              forgot password?
            </Link>
            <br />
            <div style={{ margin: '1rem 0px 0px' }}>
              Old members:{' '}
              <Link to="/oldmem" style={{ color: '#9978ba' }}>
                click here..
              </Link>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
}

export default connect(null, { login })(LoginPage)
