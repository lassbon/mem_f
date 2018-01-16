import { normalize } from "normalizr";
import { POSTS_FETCHED, POSTS_CREATED } from "../types";
import api from "../api";
import { postSchema } from "../schemas";

// data.entities.posts
const postsFetched = data => ({
  type: POSTS_FETCHED,
  data
});

const postCreated = data => ({
  type: POSTS_CREATED,
  data
});

export const fetchPosts = () => dispatch =>
  api.posts
    .fetchAll()
    .then(posts => dispatch(PostsFetched(normalize(posts, [postSchema]))));

export const createpost = data => dispatch =>
  api.posts
    .create(data)
    .then(post => dispatch(postCreated(normalize(post, postSchema))));
