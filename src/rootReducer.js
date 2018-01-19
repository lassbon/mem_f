import { combineReducers } from "redux";

import user from './reducer/user';
import posts from './reducer/posts';
import signup from './reducer/signup'
import projects from './reducer/projects'
import events from './reducer/events'

export default combineReducers({
  user,
  posts,
  signup,
  projects,
  events
})