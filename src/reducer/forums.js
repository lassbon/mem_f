import {
  ALL_FORUM_TOPICS, FORUM_BY_ID
} from "../types";

const initialState = {
  allTopics: [],
  topic: {}
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case ALL_FORUM_TOPICS:
      return {
        allTopics: action.payload
      }
    case FORUM_BY_ID:
      return {
        topic: action.payload
      }
    default:
      return state
  }
}
