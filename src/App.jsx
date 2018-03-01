import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import General from 'Layout/General'
import MainApp from 'Layout/MainApp'
import Login from 'Pages/Login'
import OldmemberLogin from 'Pages/oldmember/Login'
import OldmemberSignup from 'Pages/oldmember/Signup'
import ForgotPassword from 'Pages/ForgotPassword'
import ResetPassword from 'Pages/ResetPassword'
import Signup from 'Pages/Signup'
import Timeline from 'scenes/mainSections/Timeline'
import Profile from 'scenes/mainSections/Profile'
import Events from 'scenes/mainSections/Events'
import Payment from 'scenes/mainSections/Payment'

import RefereeConfirm from 'Pages/RefereeConfirm'

const App = () => {
  return (
    <div>
      <Switch>
        <Route
          path="/login"
          exact
          render={props => (
            <General>
              <Login {...props} />
            </General>
          )}
        />
        <Route
          path="/forgotpassword"
          exact
          render={props => (
            <General>
              <ForgotPassword {...props} />
            </General>
          )}
        />

        <Route
          path="/resetpassword"
          exact
          render={props => (
            <General>
              <ResetPassword {...props} />
            </General>
          )}
        />
        <Route path="/signup" exact render={props => <Signup {...props} />} />
        <Route exact path="/app" render={props => <MainApp />} />
        <Route
          exact
          path="/app/timeline"
          render={props => (
            <MainApp>
              <Timeline {...props} />
            </MainApp>
          )}
        />

        <Route
          exact
          path="/app/profile"
          render={props => (
            <MainApp>
              <Profile {...props} />
            </MainApp>
          )}
        />

        <Route
          exact
          path="/app/profile/:id"
          render={props => (
            <MainApp>
              <Profile {...props} />
            </MainApp>
          )}
        />

        <Route
          exact
          path="/app/payment"
          render={props => (
            <MainApp>
              <Payment {...props} />
            </MainApp>
          )}
        />

        <Route
          exact
          path="/app/events"
          render={props => (
            <MainApp>
              <Events {...props} />
            </MainApp>
          )}
        />

        <Route
          exact
          path="/confirm/:id/:user"
          render={props => <RefereeConfirm {...props} />}
        />

        <Route
          path="/oldmember/login"
          exact
          render={props => (
            <General>
              <OldmemberLogin {...props} />
            </General>
          )}
        />
        <Route
          path="/oldmember/signup"
          exact
          render={props => (
            <General>
              <OldmemberSignup {...props} />
            </General>
          )}
        />
        <Route
          exact
          path="\/"
          render={props => (
            <General>
              <Login {...props} />
            </General>
          )}
        />
      </Switch>
    </div>
  )
}

export default connect(({ user }) => ({ user }))(App)
