import { createSelector } from "reselect";

export default function posts(state = {}, action = {}) {
  switch (action.type) {
    default:
      return state
  }
}

export const postsSelector = state => state.posts

export const allPostSelctor = createSelector(
  postsSelector,
  postsHash => Object.values(postsHash)
)