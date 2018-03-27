import * as actions from './actions'

export const changeMainSection = ({ index: payload }) => ({
  type: actions.CHANGE_MAIN_SECTION,
  payload,
})

// AUTH

export const receivedLoginAuthDetails = auth => ({
  type: actions.RECEIVED_LOGIN_AUTH_DETAILS,
  payload: auth,
})

export const receivedOldMemberLoginAuthDetails = auth => ({
  type: actions.RECEIVED_OLD_USER_LOGIN_DETAILS,
  payload: auth,
})

export const logOut = () => ({
  type: actions.LOG_OUT,
  payload: undefined,
})

// USERS

export const receivedUserDetails = obj => ({
  type: actions.RECEIVED_USER_DETAILS,
  payload: obj,
})

export const receivedUsers = users => ({
  type: actions.RECEIVED_USERS,
  payload: users,
})

export const receivedUserActivity = activity => ({
  type: actions.RECEIVED_USER_ACTIVITY,
  payload: activity,
})

export const receivedFriendRequests = requests => ({
  type: actions.RECEIVED_FRIEND_REQUESTS,
  payload: requests,
})

export const sentFriendRequest = successResponse => ({
  type: actions.SENT_FRIEND_REQUEST,
  payload: successResponse,
})

export const acceptedFriendRequest = params => ({
  type: actions.ACCEPTED_FRIEND_REQUEST,
  payload: params,
})

export const canceledFriendRequest = params => ({
  type: actions.CANCELED_FRIEND_REQUEST,
  payload: params,
})

// SOCIAL

export const receivedTimelinePosts = posts => ({
  type: actions.RECIEVED_TIMELINE_POSTS,
  payload: posts,
})

export const likedPost = successResponse => ({
  type: actions.LIKED_POST,
  payload: successResponse,
})

export const createdComment = obj => ({
  type: actions.CREATED_COMMENT,
  payload: obj,
})

// Event

export const receivedOngoingEvents = onGoingEvents => ({
  type: actions.RECEIVED_ONGOING_EVENTS,
  payload: onGoingEvents,
})

export const receivedCompletedEvents = onCompletedEvents => ({
  type: actions.RECEIVED_COMPLETED_EVENTS,
  payload: onCompletedEvents,
})

export const likedEvent = event => ({
  type: actions.LIKED_EVENT,
  payload: event,
})

// Project

export const receivedOngoingProjects = ongoingProjects => ({
  type: actions.RECEIVED_ONGOING_PROJECTS,
  payload: ongoingProjects,
})

export const receivedCompletedProjects = completedProjects => ({
  type: actions.RECEIVED_COMPLETED_PROJECTS,
  payload: completedProjects,
})

export const likedProject = project => ({
  type: actions.LIKED_PROJECT,
  payload: project,
})

export const createdProjectComment = project => ({
  type: actions.CREATED_PROJECT_COMMENT,
  payload: project,
})

// Payment

export const receiveMembershipPayment = payment => ({
  type: actions.RECEIVED_MEMBERSHIP_PAYMENT,
  payload: payment,
})

// Hack

export const changeSearchBarKey = key => ({
  type: actions.CHANGE_SEARCHBAR_KEY,
  payload: key,
})

// News

export const receivedAllNews = news => ({
  type: actions.RECEIVED_ALL_NEWS,
  payload: news,
})
