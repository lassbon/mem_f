import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'

import General from 'Layout/General'
import MainApp from 'Layout/MainApp'
import Login from 'Pages/Login'
import Signup from 'Pages/Signup'
import Timeline from 'scenes/mainSections/Timeline'
import Profile from 'scenes/mainSections/Profile'

const App = ({ location }) => {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={30000}
        newestOnTop={true}
        hideProgressBar={false}
        closeOnClick={false}
      />
      <Switch>
        <Route
          location={location}
          path="/login"
          exact
          render={props => (
            <General>
              <Login {...props} />
            </General>
          )}
        />
        <Route
          location={location}
          path="/signup"
          exact
          render={props => <Signup {...props} />}
        />
        <Route exact path="/app" render={props => <MainApp />} />
        <Route
          location={location}
          exact
          path="/app/timeline"
          render={props => (
            <MainApp>
              <Timeline {...props} />
            </MainApp>
          )}
        />

        <Route
          location={location}
          exact
          path="/app/profile"
          render={props => (
            <MainApp>
              <Profile {...props} />
            </MainApp>
          )}
        />

        <Route exact path="/general" component={General} />
      </Switch>
    </div>
  )
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default connect(({ user }) => ({ user }))(App)
