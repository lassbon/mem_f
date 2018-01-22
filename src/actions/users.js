import api from "../api";
import { USER_PROFILE, USER_ACTIVITY, USER_FRIENDS, USER_PROFILE_UPDATE } from '../types'

export const signup = (data) => (dispatch) => api.user.signup(data)

export const setUserProfile = payload => ({
  type: USER_PROFILE,
  payload,
})

export const setUserActivity = activity => ({
  type: USER_ACTIVITY,
  activity,
})

export const setUserFriends = friends => ({
  type: USER_FRIENDS,
  friends,
})


export const updateProfile = payload => ({
  type: USER_PROFILE_UPDATE,
  payload,
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

export const getuserFriends = id => dispatch =>
  api.user.friends(id).then(res => {
    dispatch(setUserFriends(res));
    return Promise.resolve(res)
  });

export const updateUserProfile = (id, userData) => dispatch =>
  api.user.updateUser(id, userData).then(res => {
    dispatch(updateProfile(res));
    return Promise.resolve(res)
  });
