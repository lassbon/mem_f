import React from 'react'
import { connect } from 'react-redux'

// Components
import Connection from './Connection'

// Helpers
import requestHandler from 'helpers/requestHandler'
import { receivedFriendRequests } from 'redux/action_creators'

const Connections = ({ fetchFriendRequests, friendRequests, id, token }) => {
  !friendRequests && fetchFriendRequests(id, token)
  return (
    friendRequests && (
      <>
        <h3 className="px-8 py-6 text-grey-dark font-normal text-sm">
          Connections
        </h3>
        <div>
          <ul className="list-reset">
            {friendRequests.result.map(id => (
              <Connection
                key={id}
                request={friendRequests.entities.requests[id]}
              />
            ))}
          </ul>
        </div>
      </>
    )
  )
}

const mapStateToProps = ({
  auth: { token, user: { id } },
  friendRequests,
}) => ({
  friendRequests,
  id,
  token,
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
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default glueTo(Connections)
