import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { array, any } from 'prop-types'

import Sidebar from 'Sidebar'
import TopBar from 'TopBar'
import Circle from 'loaders/Circle'
import './styles.css'

// Helpers

import validMember from 'helpers/validMember'
import { receivedUsers } from 'redux/action_creators'
import requestHandler from 'helpers/requestHandler'

const MainApp = ({ children, auth: { token }, fetchUsers, user, users }) => {
  if (!user.id) return <Redirect to="/login" />
  const valid = validMember(user)
  if (valid !== true) return <Redirect to={valid} />
  if (users === null) fetchUsers(token)
  return !users ? (
    <div className="flex justify-center py-6 text-dark-grey">
      <Circle text="Retreiving users. Please wait" />
    </div>
  ) : (
    <div className="main-app lg:h-screen">
      <TopBar />
      <div className="below-top-bar lg:flex">
        <Sidebar />
        <main className="lg:w-5/6 lg:h-full">{children}</main>
      </div>
    </div>
  )
}

MainApp.propTypes = {
  children: any.isRequired,
}

const mapStateToProps = ({ auth, user, users }) => ({
  auth,
  user,
  users,
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: token =>
    dispatch(async (dispatch, getState, { network }) => {
      const users = await requestHandler(network.user.fetchUsers)({ token })
      return dispatch(receivedUsers(users))
    }),
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default withRouter(glueTo(MainApp))
