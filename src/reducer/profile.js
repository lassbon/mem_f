import {
  USER_PROFILE, USER_ACTIVITY
} from "../types";

const initialState = {
  profileDetails: {},
  userActivity: {}
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case USER_PROFILE:
      return {
        profileDetails: action.payload,
      }
    case USER_ACTIVITY:
      return {...state,
        userActivity: action.activity
      }
    default:
      return state
  }
}