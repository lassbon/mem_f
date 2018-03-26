import React from 'react'
import { connect } from 'react-redux'

import './connections.css'

// Components
import Connection from './Connection'
import Friend from './Friend'

// Helpers
import requestHandler from 'helpers/requestHandler'
import {
  acceptedFriendRequest,
  canceledFriendRequest,
  changeSearchBarKey,
  receivedFriendRequests,
} from 'redux/action_creators'

const Connections = ({
  acceptFriendRequest,
  cancelFriendRequest,
  changeSearchBarKey,
  fetchFriendRequests,
  friends,
  friendRequests,
  id,
  token,
  users,
}) => {
  !friendRequests && fetchFriendRequests(id, token)
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
          {friends &&
            friends.result.length === 0 &&
            friendRequests.result.length === 0 && (
              <div className="empty-state-container lg:absolute lg:w-full lg:px-12 lg:mt-8 py-6">
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
          {friends &&
            friends.result.length > -1 && (
              <ul className="list-reset">
                {friends.result.map(id => {
                  const friend = friends.entities.friends[id]
                  return <Friend key={id} friend={friend} />
                })}
              </ul>
            )}
          {friendRequests.result.length === 0 || !friends ? null : (
            <ul className="list-reset">
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
        </div>
      </>
    )
  )
}

const mapStateToProps = ({
  auth: { token, user: { id } },
  friends,
  friendRequests,
  users,
}) => ({
  friends,
  friendRequests,
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
      return response
    }),
  cancelFriendRequest: (requestId, params, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      const response = await requestHandler(network.user.cancelFriendRequest)({
        params,
        token,
      })
      if (response.status === 'success')
        dispatch(canceledFriendRequest({ ...params, id: requestId }))
      return response
    }),
  changeSearchBarKey: key => dispatch(changeSearchBarKey(key)),
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default glueTo(Connections)
