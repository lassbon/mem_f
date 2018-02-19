import React, { Component } from 'react'
import {
  Grid,
  Container,
  Image,
  Button,
  Icon,
  Header,
  Form,
} from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'

import './welcome.css'
import logo from '../../images/ACCIHD-LOGO.png'
import screen from '../../images/screen.png'
import LoginForm from '../LoginPage/LoginForm'

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

class WelcomePage extends Component {
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
    return (
      <React.Fragment>
        <Container>
          <Grid className="home-sec-one">
            <Grid.Column computer={11}>
              <Image src={logo} alt="acci logo" />
            </Grid.Column>
            <Grid.Column width={5}>
              <Button as={Link} to="/login" className="btn" content="Login" />
              <Button
                as={Link}
                to="/signup"
                className="btn btn-reverse"
                content="Sign up"
              />
            </Grid.Column>
          </Grid>
        </Container>
        <Grid>
          <Grid.Column width={1} />
          <Grid.Column computer={8} verticalAlign="middle">
            <Header as="h2" style={{ color: '#656768', fontSize: '30px' }}>
              LOGIN OR REGISTER TO
            </Header>
            <Header as="h1" style={{ fontSize: 40, color: '#D5C67A' }}>
              CONNECT WITH OVER <br />3215 ACCI MEMBERS
            </Header>
          </Grid.Column>
          <Grid.Column width={7}>
            <Image src={screen} alt="" />
          </Grid.Column>
        </Grid>
        <Grid style={{ height: '70vh' }}>
          <Grid.Column width={8} style={{ background: '#95A5A6' }}>
            <div
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '60%',
                }}
              >
                <LoginForm submit={this.submit} />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as="h3" style={{ color: '#FFFFFF', marginTop: '30%' }}>
              INCREASE YOUR NETWORK
            </Header>
            <p>NOT A MEMBER?</p>
            <Button
              as={Link}
              to="/signup"
              className="btn btn-reverse"
              style={{ margin: 0 }}
            >
              REGISTER
            </Button>
          </Grid.Column>
        </Grid>
        <Grid style={{ background: '#34495E', textAlign: 'center' }}>
          <Grid.Column width="5">
            <h2 style={{ color: '#D5C67A', fontSize: '50px' }}>3215</h2>
            <h3 style={{ color: 'white', marginTop: 5 }}>Registered Members</h3>
          </Grid.Column>
          <Grid.Column width="6" verticalAlign="middle">
            <Icon
              name="facebook square"
              size="big"
              style={{ color: 'white' }}
            />
            <Icon name="linkedin" size="big" style={{ color: 'white' }} />
            <Icon name="twitter" size="big" style={{ color: 'white' }} />
          </Grid.Column>
          <Grid.Column width="5">
            <h3 style={{ color: 'white' }}>Links</h3>
            <Link to="#" style={{ marginRight: 10 }}>
              ACCI website
            </Link>
            <Link to="#" style={{ marginRight: 10 }}>
              Membership Directory
            </Link>
            <Link to="#" style={{ marginRight: 10 }}>
              ACCI Events
            </Link>
            <Link to="#" style={{ marginRight: 10 }}>
              Shop on ACCI
            </Link>
          </Grid.Column>
        </Grid>
        <footer
          style={{
            verticalAlign: 'middle',
            background: 'white',
            color: '#656768',
            textAlign: 'center',
            padding: '10px',
            fontWeight: 'bold',
          }}
        >
          Copyright © 2018 Abuja Chamber of Commerce & Industry
        </footer>
      </React.Fragment>
    )
  }
}

export default withRouter(connect(null, { login })(WelcomePage))
