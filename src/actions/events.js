import { CURRENT_EVENTS, COMPLETED_EVENTS, ALL_EVENTS, EVENTS_BY_ID } from "../types";
import api from "../api";

const events = payload => ({
  type: EVENTS_BY_ID,
  payload
});


const currentEvent = (events) => ({
  type: CURRENT_EVENTS,
  events
});

const completedEvent = (completedEvent) => ({
  type: COMPLETED_EVENTS,
  completedEvent
});

export const fetchCurrentEvent = (token) => dispatch =>
  api.events.ongoing(token)
    .then(res => {
      dispatch(currentEvent(res.data))
    })
    .catch(err => {
      console.log('error', err);
    })

export const fetchCompletedEvent = (token) => dispatch =>
    api.events.completed(token)
      .then(res => {
        dispatch(completedEvent(res.data))
      })
      .catch(err => {
        console.log('error', err);
      })

export const getEvents = (id) => dispatch =>
  api.events
    .getOne(id)
    .then(res => dispatch(events(res)));