import {
  USER_PROFILE, USER_ACTIVITY, USER_FRIENDS, USER_PROFILE_UPDATE
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
      return {
        ...state,
        userActivity: action.activity
      }
    case USER_FRIENDS:
      return {
        ...state,
        userFriends: action.friends
      }
    default:
      return state
  }
}
