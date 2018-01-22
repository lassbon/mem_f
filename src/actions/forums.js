import { NEW_FORUM_TOPIC, ALL_FORUM_TOPICS, FORUM_BY_ID } from "../types";
import api from "../api";

// data.entities.posts
const topicCreated = payload => ({
  type: NEW_FORUM_TOPIC,
  payload
});

const allForums = payload => ({
  type: ALL_FORUM_TOPICS,
  payload
});

const forum = payload => ({
  type: FORUM_BY_ID,
  payload
});


export const newForumTopic = forumParams => dispatch =>
  api.forum
    .reg(forumParams)
    .then(res => dispatch(topicCreated(res.data)));

export const getAllForums = () => dispatch =>
  api.forum
    .getForums()
    .then(res => dispatch(allForums(res)));

export const getForum = (id) => dispatch =>
  api.forum
    .getOne(id)
    .then(res => dispatch(forum(res)));
