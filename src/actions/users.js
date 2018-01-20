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
    dispatch(setUserProfile(res));
    return Promise.resolve(res)
  });
