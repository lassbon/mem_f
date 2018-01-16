import api from "../api";
import { USER_LOGGED_IN,USER_LOGGED_OUT } from "../types";
import setAuthorizationHeader from './setAuthorizationHeader'

export const userLoggedIn = (payload) => ({
  type: USER_LOGGED_IN,
  payload
})

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
})


export const login = (credentials) => (dispatch) => 
  api.user.login(credentials).then(
    res => {
      localStorage.acciJWT = res.token;
      setAuthorizationHeader(res.token);
      dispatch(userLoggedIn(res))
    }
  )

export const logout = () => (dispatch) => {
  localStorage.removeItem('acciJWT')
    dispatch(userLoggedOut())
  }

export const resetPasswordRequest = ({ email }) => () =>
  api.user.resetPasswordRequest(email);

export const resetPassword = data => () => api.user.resetPassword(data);