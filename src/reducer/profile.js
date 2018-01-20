import {
  USER_PROFILE
 } from "../types";

export default function user(state = {}, action = {}) {
  switch(action.type){
    case USER_PROFILE:
      return {
        email: action.payload.email,
        membershipId: action.payload.membershipId
      }
    default: 
      return state
  }
}