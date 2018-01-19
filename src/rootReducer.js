import { combineReducers } from "redux";

import user from './reducer/user';
import posts from './reducer/posts';
import signup from './reducer/signup'
import projects from './reducer/projects'

export default combineReducers({
  user,
  posts,
  signup,
  projects
})