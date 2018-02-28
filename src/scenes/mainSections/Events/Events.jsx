import React from 'react'
import { connect } from 'react-redux'
import simpleScrollbar from 'fixed/simpleScrollbar'
import './eventsStyles.css'

//Component
import OngoingEvent from 'OngoingEvent'
import CompletedEvent from 'CompletedEvent'

// Helpers
import requestHandler from 'helpers/requestHandler'
import {
  likedEvent,
  receivedCompletedEvents,
  receivedOngoingEvents,
} from 'redux/action_creators'

const Events = ({
  auth: { token },
  completedEvents,
  fetchCompletedEvents,
  fetchOngoingEvents,
  likeEvent,
  ongoingEvents,
  user,
}) => {
  !completedEvents && fetchCompletedEvents(token)
  !ongoingEvents && fetchOngoingEvents(token)
  return (
    <div
      ref={el => el && simpleScrollbar.initEl(el)}
      className="lg:w-full lg:h-full overflow-y-scroll"
    >
      <div className="lg:px-16 lg:py-6 ">
        {ongoingEvents && (
          <ul className="list-reset flex flex-wrap">
            {ongoingEvents.result.map(id => (
              <OngoingEvent
                key={id}
                event={ongoingEvents.entities.ongoing[id]}
                likeEvent={likeEvent}
                token={token}
                user={user}
              />
            ))}
          </ul>
        )}
        {completedEvents && (
          <ul className="list-reset flex flex-wrap">
            {completedEvents.result.map(id => (
              <OngoingEvent
                key={id}
                event={completedEvents.entities.completed[id]}
                likeEvent={likeEvent}
                token={token}
                user={user}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({ auth, completedEvents, ongoingEvents, user }) => ({
  auth,
  completedEvents,
  ongoingEvents,
  user,
})

const mapDispatchToProps = dispatch => ({
  fetchCompletedEvents: token =>
    dispatch(async (dispatch, getState, { network }) => {
      const completedEvents = await requestHandler(
        network.event.fetchCompletedEvents
      )({ token })
      dispatch(receivedCompletedEvents(completedEvents))
      return Promise.resolve(completedEvents)
    }),
  fetchOngoingEvents: token =>
    dispatch(async (dispatch, getState, { network }) => {
      const ongoingEvents = await requestHandler(
        network.event.fetchOngoingEvents
      )({ token })
      dispatch(receivedOngoingEvents(ongoingEvents))
      return Promise.resolve(ongoingEvents)
    }),
  likeEvent: (params, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      console.log(params)
      const response = await requestHandler(network.event.likeEvent)({
        params,
        token,
      })
      if (response.status === 'success') dispatch(likedEvent(params))
      return Promise.resolve(response)
    }),
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default glueTo(Events)
