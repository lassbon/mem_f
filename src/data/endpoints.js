export const baseUrl = 'https://acciapi.ml'
const returnFullUrl = url => baseUrl + url

export const user = {
  login: returnFullUrl('/api/v1/auth/user'),
  idedUser: (strs, id) => returnFullUrl('/api/v1/user/') + id,
  user: returnFullUrl('/api/v1/user/'),
  resetPassword: returnFullUrl('/api/v1/user/reset'),
  changePassword: returnFullUrl('/api/v1/change'),
  friendRequests: (strs, id) => returnFullUrl('/api/v1/social/requests/') + id,
  activity: (strs, id) => returnFullUrl('/api/v1/useractivity/') + id,
  sendFriendRequest: returnFullUrl('/api/v1/social/request'),
  acceptFriendRequest: returnFullUrl('/api/v1/social/accept'),
  cancelFriendRequest: returnFullUrl('/api/v1/social/cancel'),
  removeFriend: returnFullUrl('/api/v1/social/remove'),
}

export const social = {
  timelinePosts: returnFullUrl('/api/v1/social/post/'),
  timelinePost: returnFullUrl('/api/v1/social/posts'),
  comments: returnFullUrl('/api/v1/social/comment'),
  likePost: returnFullUrl('/api/v1/social/post/like'),
}

export const general = {
  membershipLevels: returnFullUrl('/api/v1/levels/'),
  validateReferee: returnFullUrl('/api/v1/validatereferee'),
  alertReferee: returnFullUrl('/api/v1/alertreferee'),
  upload: returnFullUrl('/api/v1/user/upload'),
}

export const events = {
  completed: returnFullUrl('/api/v1/events/completed'),
  ongoing: returnFullUrl('/api/v1/events/ongoing'),
}
