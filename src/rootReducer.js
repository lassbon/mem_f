import { combineReducers } from "redux";

import user from './reducer/user';
import posts from './reducer/posts';
import signup from './reducer/signup';
import profile from './reducer/profile';

export default combineReducers({
  user,
  profile,
  posts,
  signup
})