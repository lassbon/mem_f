import {
  USER_PROFILE
 } from "../types";

export default function user(state = {}, action = {}) {
  switch(action.type){
    case USER_PROFILE:
      return {
        profileDetails: action.payload,
      }
    default: 
      return state
  }
}