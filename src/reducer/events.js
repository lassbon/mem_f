import { COMPLETED_EVENTS, CURRENT_EVENTS } from "../types";

const initialState = {
  currentevent: [],
  completedevent: []
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
    default: 
      return state
  }
}
