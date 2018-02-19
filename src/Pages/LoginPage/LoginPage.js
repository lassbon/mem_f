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
  '/regmessage',
  '/cont6',
  '/cont7',
]

class LoginPage extends React.Component {
  submit = data => {
    console.log('login history', this.props.history)
    const { history: { location: { state } } } = this.props

    return this.props.login(data).then(user => {
      const { history } = this.props
      const { regState } = user
      // console.log(regState, registrationStages[regState])
      regState > 7
        ? history.push('/app')
        : state && state.redirect
          ? history.push(state.redirect)
          : history.push(registrationStages[regState])
      // this.props.history.push('/app')
      console.log(
        'login check: ',
        state && state.redirect,
        'login path: ',
        registrationStages[regState]
      )
    })
  }

  render() {
    console.log('login load history', this.props.history)

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
