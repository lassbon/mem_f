import { NEW_FORUM_TOPIC } from "../types";
import api from "../api";

// data.entities.posts
const topicCreated = payload => ({
  type: NEW_FORUM_TOPIC,
  payload
});


export const newForumTopic = forumParams => dispatch =>
  api.forum
    .reg(forumParams)
    .then(res => dispatch(topicCreated(res.data)));
