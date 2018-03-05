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
  receivedFriendRequests,
} from 'redux/action_creators'

const Connections = ({
  acceptFriendRequest,
  cancelFriendRequest,
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
        <h3 className="px-8 py-6 border-b border-grey-lighter text-grey-dark font-normal text-sm">
          Connections
        </h3>
        <div>
          {friends &&
            friends.result.length > -1 && (
              <ul className="list-reset">
                {friends.result.map(id => {
                  const friend = friends.entities.friends[id]
                  return <Friend key={id} friend={friend} />
                })}
              </ul>
            )}
          {friendRequests.result.length === 0 || !friends ? (
            <div className="empty-state-container absolute lg:w-full lg:px-12 lg:mt-8">
              <figure className="flex flex-col justify-center items-center">
                <div className="w-1/3">
                  <img src="/static/images/empty.svg" alt="" />
                </div>
                <figcaption className="pt-4 text-grey-darker">
                  You don't have any connections
                </figcaption>
              </figure>
            </div>
          ) : (
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
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default glueTo(Connections)
