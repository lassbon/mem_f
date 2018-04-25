import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { array, any } from 'prop-types'

import Chat from 'Chat'
import Sidebar from 'Sidebar'
import TopBar from 'TopBar'
import Circle from 'loaders/Circle'
import './styles.css'

// Helpers

import validMember from 'helpers/validMember'
import { receivedUsers, receivedFriendRequests, updateNotification } from 'redux/action_creators'
import requestHandler from 'helpers/requestHandler'

const MainApp = ({ children, auth: { token }, fetchUsers, fetchFriendRequests, user, users, chatNotifications, friendRequestNotifications }) => {
  if (!user.id) return <Redirect to="/login" />
  const valid = validMember(user)
  if (valid !== true) return <Redirect to={valid} />
  if (users === null) {
    fetchUsers(token)
    fetchFriendRequests(user.id, token)
  }
  return !users ? (
    <div className="flex justify-center py-6 text-dark-grey">
      <Circle text="Retrieving users. Please wait" />
    </div>
  ) : (
    <>
      <div className="lg:flex main-app lg:h-screen ">
        <div className="lg:w-full">
          <TopBar users={users} chatNotifications={chatNotifications} friendRequestNotifications={friendRequestNotifications} />
          <div className="below-top-bar lg:flex">
            <Sidebar />
            <main className="lg:w-4/5 lg:h-full">{children}</main>
          </div>
        </div>
        <div className="fixed pin-b pin-r z-50 h-full overflow-y-scroll below-top-bar bg-white">
          <Chat />
        </div>
      </div>
    </>
  )
}

MainApp.propTypes = {
  children: any.isRequired,
}

const mapStateToProps = ({ auth, user, users, myNotifications: { chatNotifications, friendRequestNotifications } }) => ({
  auth,
  user,
  users,
  chatNotifications,
  friendRequestNotifications,
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: token =>
    dispatch(async (dispatch, getState, { network }) => {
      const users = await requestHandler(network.user.fetchUsers)({ token })      
      users.sort((a,b) => {return (a.companyName > b.companyName) ? 1 : ((b.companyName > a.companyName) ? -1 : 0);} ).map(function(id) {
        if  (id.profileImage && id.profileImage.substring(0, 4) !== 'data')  { // url is not a blob convert to blob
          const xmlhttp=new XMLHttpRequest();
          xmlhttp.open("GET", id.profileImage, true);
          xmlhttp.onreadystatechange = function()
          {
              if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
              {
                id.profileImage = xmlhttp.responseText
                dispatch(receivedUsers(users))
                return id
              }
          }
          xmlhttp.send();
        }
        return id
      })
      return dispatch(receivedUsers(users))
    }),
    fetchFriendRequests: (id, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      const requests = await requestHandler(network.user.fetchFriendRequests)({
        id,
        token,
      })
      dispatch(receivedFriendRequests(requests))
      for (var key in requests) {
        if (requests.hasOwnProperty(key)) {
          dispatch(updateNotification({type: 'friendRequest', message: requests[key].requester}))
        }
      }      
      return Promise.resolve(requests)
    }),
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default withRouter(glueTo(MainApp))
