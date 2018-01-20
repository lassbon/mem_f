import {
  USER_DONATIONS, USER_EVENTS, USER_MEMBERSHIPS, USER_TRAININGS
} from "../types";

const initialState = {
  donations: {},
  events: {},
  memberships: {},
  trainings: {}
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case USER_DONATIONS:
      return {
        donations: action.donations,
      }
    case USER_EVENTS:
      return {
        ...state,
        events: action.events
      }
    case USER_MEMBERSHIPS:
      return {
        ...state,
        memberships: action.memberships
      }
    case USER_TRAININGS:
      return {
        ...state,
        trainings: action.trainings
      }
    default:
      return state
  }
}
