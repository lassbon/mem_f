import * as actions from '../actions'
import { normalize, schema } from 'normalizr'

const defaults = {
  posts: null,
}

export const posts = (state = defaults.posts, action) => {
  if (action.type === actions.RECIEVED_TIMELINE_POSTS) {
    const posts = action.payload
    const postsListSchema = [new schema.Entity('posts')]
    const normalizedPosts = normalize(posts, postsListSchema)

    return normalizedPosts
  }

  if (action.type === actions.LIKED_POST) {
    const { id: postId, liker } = action.payload
    const likedPost = state.entities.posts[postId]
    const updatedLikes = likedPost.likes ? [...likedPost.likes, liker] : [liker]
    const updatedPost = { ...likedPost, likes: updatedLikes }
    return {
      ...state,
      entities: {
        ...state.entities,
        posts: {
          ...state.entities.posts,
          [postId]: updatedPost,
        },
      },
    }
  }

  if (action.type === actions.CREATED_COMMENT) {
    const { post: postId } = action.payload
    const postCommentedOn = state.entities.posts[postId]
    const updatedPost = {
      ...postCommentedOn,
      comments: [action.payload, ...postCommentedOn.comments],
    }
    return {
      ...state,
      entities: {
        ...state.entities,
        posts: {
          ...state.entities.posts,
          [postId]: updatedPost,
        },
      },
    }
  }
  return state
}
