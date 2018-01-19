import { CURRENT_EVENTS, COMPLETED_EVENTS } from "../types";
import api from "../api";

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
    api.projects.completed(token)
      .then(res => {
        dispatch(completedEvent(res.data))
      })
      .catch(err => {
        console.log('error', err);
      })