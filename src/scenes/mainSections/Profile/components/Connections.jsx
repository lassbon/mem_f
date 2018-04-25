import React from 'react'
import { connect } from 'react-redux'

import './connections.css'

// Components
import Connection from './Connection'
import Friend from './Friend'
import MyFriendRequests from './MyFriendRequests'

// Helpers
import requestHandler from 'helpers/requestHandler'
import {
  acceptedFriendRequest,
  canceledFriendRequest,
  changeSearchBarKey,
  receivedFriendRequests,
  receivedMyFriendRequests,
  updateNotification,
} from 'redux/action_creators'

const Connections = ({
  acceptFriendRequest,
  cancelFriendRequest,
  changeSearchBarKey,
  fetchFriendRequests,
  fetchMyFriendRequests,
  friends,
  friendRequests,
  myFriendRequests,
  id,
  token,
  users,
}) => {
  (!friendRequests && fetchFriendRequests(id, token)) || (!myFriendRequests && fetchMyFriendRequests(id, token))
  return (
    friendRequests && (
      <>
        <h3 className="flex justify-between items-center lg:px-8 py-6 border-b border-grey-lighter text-grey-darker font-normal text-sm">
          <span>Connections</span>
          <span className="">
            <button
              onClick={() => changeSearchBarKey(Math.random())}
              className="px-4 py-2 bg-grey text-white rounded-sm"
            >
              Add Connection
            </button>
          </span>
        </h3>
        <div>                    
          {friendRequests === null || friendRequests.result.length === 0 ? null : (
            <ul className="list-reset">
            <div className="bg-pink-lightest text-sm py-2 px-2" >Friend requests from other members</div>
              {friendRequests.result.map(id => {
                const request = friendRequests.entities.requests[id]
                return (
                  <Connection
                    key={id}
                    token={token}
                    request={request}
                    requester={users.entities.users[request.requester]}
                    cancelFriendRequest={cancelFriendRequest}
                    acceptFriendRequest={acceptFriendRequest}
                  />
                )
              })}                     
            </ul>
          )}
          {myFriendRequests === null || myFriendRequests.result.length === 0 ? null : (
            <ul className="list-reset">
            <div className="bg-pink-lightest text-sm py-2 px-2" >Your Friend Requests</div>
              {myFriendRequests.result.map(id => {
                const request = myFriendRequests.entities.requests[id]
                return <MyFriendRequests key={id} friendRequest={users.entities.users[request.requestee]} />
              })}
            </ul>
          )} 
          {friends &&
            friends.result.length > -1 && (
              <ul className="list-reset">
              <div className="bg-pink-lightest text-sm py-2 px-2" >Your Friends</div>
                {friends.result.map(id => {
                  const friend = users.entities.users[id]
                  return <Friend key={id} friend={friend} />
                })}
              </ul>
            )}
          {friends &&
            friends.result.length === 0 &&
            friendRequests.result.length === 0 && (
              <div className="lg:absolute lg:w-full lg:px-12 lg:mt-8 py-6">
                <figure className="flex flex-col justify-center items-center">
                  <div className="w-1/3">
                    <img src="/static/images/empty.svg" alt="" />
                  </div>
                  <figcaption className="text-center pt-4 text-grey-darker">
                    <p className="mb-4">You don't have any connections</p>
                    <span className="">
                      <button
                        onClick={() => changeSearchBarKey(Math.random())}
                        className="px-4 py-2 bg-pink-dark text-white rounded-sm"
                      >
                        Add Connection
                      </button>
                    </span>
                  </figcaption>
                </figure>
              </div>
            )}
        </div>
      </>
    )
  )
}

const mapStateToProps = ({
  auth: { token, user: { id } },
  friends,
  friendRequests,
  myFriendRequests,
  users,
}) => ({
  friends,
  friendRequests,
  myFriendRequests,
  id,
  token,
  users,
})

const mapDispatchToProps = dispatch => ({
  fetchFriendRequests: (id, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      const requests = await requestHandler(network.user.fetchFriendRequests)({
        id,
        token,
      })
      dispatch(receivedFriendRequests(requests))
      // for (var key in requests) { // Already done in MainApp.jsx 
      //   if (requests.hasOwnProperty(key)) {
      //     dispatch(updateNotification({type: 'friendRequest', message: requests[key].requester}))
      //   }
      // }      
      return Promise.resolve(requests)
    }),
  fetchMyFriendRequests: (id, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      const requests = await requestHandler(network.user.fetchMyFriendRequests)({
        id,
        token,
      })
      dispatch(receivedMyFriendRequests(requests))
      return Promise.resolve(requests)
    }),
  acceptFriendRequest: (requestId, params, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      const response = await requestHandler(network.user.acceptFriendRequest)({
        params,
        token,
      })
      if (response.status === 'success')
        dispatch(acceptedFriendRequest({ ...params, id: requestId }))
        dispatch(updateNotification({type: 'friendRequest', message: params.requester }))
      return response
    }),
  cancelFriendRequest: (requestId, params, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      const response = await requestHandler(network.user.cancelFriendRequest)({
        params,
        token,
      })
      if (response.status === 'success')  {
        dispatch(canceledFriendRequest({ ...params, id: requestId }))
        dispatch(updateNotification({type: 'friendRequest', message: params.requester }))
      }
      return response
    }),
  changeSearchBarKey: key => dispatch(changeSearchBarKey(key)),
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default glueTo(Connections)
