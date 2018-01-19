import { combineReducers } from "redux";

import user from './reducer/user';
import posts from './reducer/posts';
import signup from './reducer/signup'

export default combineReducers({
  user,
  posts,
  signup
})