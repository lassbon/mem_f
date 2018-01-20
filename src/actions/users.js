import api from "../api";
import { USER_PROFILE, USER_ACTIVITY } from '../types'

export const signup = (data) => (dispatch) => api.user.signup(data)

export const setUserProfile = payload => ({
  type: USER_PROFILE,
  payload,
})

export const setUserActivity = activity => ({
  type: USER_ACTIVITY,
  activity,
})

export const getUserProfile = id => dispatch =>
  api.user.profile(id).then(res => {
    dispatch(setUserProfile(res));
    return Promise.resolve(res)
  });

export const getuserActivity = id => dispatch =>
  api.user.activity(id).then(res => {
    dispatch(setUserActivity(res));
    return Promise.resolve(res)
  });
