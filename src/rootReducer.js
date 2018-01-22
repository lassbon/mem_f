import { combineReducers } from "redux";

import user from './reducer/user';
import posts from './reducer/posts';
import profile from './reducer/profile';
import signup from './reducer/signup'
import projects from './reducer/projects'
import events from './reducer/events'
import payments from './reducer/payments'
import forums from './reducer/forums'

export default combineReducers({
  user,
  profile,
  posts,
  signup,
  projects,
  events,
  payments,
  forums
})