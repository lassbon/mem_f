// import { userLoggedIn } from "./auth";
import api from "../api";
import { USER_PROFILE } from '../types'

export const signup = (data) => (dispatch) => api.user.signup(data)

export const setUserProfile = payload => ({
  type: USER_PROFILE,
  payload,
})

export const getUserProfile = id => dispatch =>
  api.user.profile(id).then(res => {
    const { email, membershipId } = res;
    dispatch(setUserProfile({email, membershipId}));
  });


// export const signup = (data) => (dispatch) =>
//   api.user.signup(data).then(user => {
//     dispatch(userLoggedIn(user))
//   });