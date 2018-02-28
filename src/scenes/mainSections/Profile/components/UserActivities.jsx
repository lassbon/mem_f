import React from 'react'
import { connect } from 'react-redux'

import UserActivity from './UserActivity'

// Helpers

import requestHandler from 'helpers/requestHandler'
import { receivedUserActivity } from 'redux/action_creators'

const UserActivities = ({
  token,
  user: { id },
  userActivity,
  fetchUserActivity,
}) => {
  !userActivity && fetchUserActivity(id, token)
  return (
    <>
      <h4 className=" uppercase roman text-grey-darker text-xs font-normal">
        Activity
      </h4>
      <div className="relative">
        <span className="absolute pin-t h-full ml-2 border-r border-dashed" />

        <ul className="list-reset mt-6 text-sm">
          {userActivity &&
            userActivity.result.map(id => (
              <UserActivity
                key={id}
                activity={userActivity.entities.posts[id]}
              />
            ))}
        </ul>
      </div>

      <div />
    </>
  )
}

const mapStateToProps = ({ auth: { token }, user, userActivity }) => ({
  token,
  user,
  userActivity,
})

const mapDispatchToProps = dispatch => ({
  fetchUserActivity: (id, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      const activity = await requestHandler(
        network.user.fetchUserSocialActivity
      )({ id, token })
      dispatch(receivedUserActivity(activity))
      return Promise.resolve(activity)
    }),
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default glueTo(UserActivities)
