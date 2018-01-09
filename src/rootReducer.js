import { combineReducers } from "redux";

import user from './reducer/user';
import posts from './reducer/posts';

export default combineReducers({
  user,
  posts
})