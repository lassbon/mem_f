import { COMPLETED_EVENTS, CURRENT_EVENTS, ALL_EVENTS, EVENTS_BY_ID } from "../types";

const initialState = {
  currentevent: [],
  completedevent: [],
  events: []
}
export default function user(state = initialState, action = {}) {
  switch(action.type){
    case CURRENT_EVENTS:
      return {
        currentevent: action.events,
      }
    case COMPLETED_EVENTS:
      return {
        completedevent: action.completedEvent,
      };
    case EVENTS_BY_ID:
      return {
        events: action.payload
      }
    default: 
      return state
  }
}
