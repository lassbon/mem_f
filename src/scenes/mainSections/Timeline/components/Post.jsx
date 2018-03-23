import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comments from './Comments'
import moment from 'moment'

import requestHandler from 'helpers/requestHandler'
import { likedPost } from 'redux/action_creators'

const Post = ({
  auth,
  likePost,
  post: { comments, createdAt, id, likes, postImage, postText },
  user,
}) => {
  return !user ? null : (
    <li className="lg:mt-16 cursor-pointer">
      <div className="flex">
        <span
          style={{
            backgroundImage: !!user.profileImage
              ? user.profileImage
              : '/static/images/011-woman-5.svg',
          }}
          className="lg:w-24 w-8 mr-4 rounded-lg overflow-hidden"
        >
          {!!user.profileImage ? (
            <img src={user.profileImage} alt="" className="relative" />
          ) : (
            <img src="/static/images/011-woman-5.svg" alt="" className="" />
          )}
        </span>

        <div className="flex-grow">
          <div className="mb-4 text-xs">
            <p className="mb-1 text-purple-light capitalize">
              {user.companyName}
            </p>
            <p className=" text-grey-darker">{moment(createdAt).fromNow()}</p>
          </div>
          {postImage ? (
            <div
              style={
                {
                  // backgroundImage: `url(${postImage})`
                }
              }
              className=" bg-bottom bg-cover"
            >
              <img style={{ minWidth: '100%' }} src={postImage} alt="" />{' '}
            </div>
          ) : null}
          <div className="w-full p-6 py-4 mb-4 roboto text-lg leading-normal text-grey-darker bg-white lg:lt-shadow rounded-sm">
            {postText.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-3">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex text-sm text-grey-dark">
            <div
              onClick={() =>
                likePost(
                  {
                    id: id,
                    liker: user.id,
                  },
                  auth.token
                )
              }
              className="mx-4"
            >
              <span className="lg:text-2xl text-sm text-blue-lighter">
                <i className="ion-thumbsup" />
              </span>
              <span className="ml-1 text-sm text-grey-dark font-normal">
                {likes ? likes.length : '0'}
              </span>
            </div>
            <div className="lg:mx-4 flex-grow">
              <Comments comments={comments} postId={id} />
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

const mapStateToProps = ({ auth }) => ({
  auth,
})

const mapDispatchToProps = dispatch => ({
  likePost: (params, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      const response = await requestHandler(network.social.likePost)({
        params,
        token,
      })
      if (response.status === 'success')
        dispatch(likedPost({ ...response, ...params }))
      return Promise.resolve(response)
    }),
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default glueTo(Post)
