import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comments from './Comments'

import requestHandler from 'helpers/requestHandler'
import { likedPost } from 'redux/action_creators'

const Post = ({
  auth,
  likePost,
  post: { comments, id, likes, postImage, postText },
  user,
}) => {
  return !user ? null : (
    <li className="lg:mt-16 cursor-pointer">
      <div className="flex">
        <span className="w-8 mr-4">
          <img src="/static/images/011-woman-5.svg" alt="" className="w-8" />
        </span>

        <div className="flex-grow">
          <div className="mb-4 text-xs">
            <p className="mb-1 text-purple-light capitalize">
              {user.companyName}
            </p>
            <p className=" text-grey-darker">@1:25pm on the 23rd of Jan</p>
          </div>
          {postImage ? (
            <div
              style={{ backgroundImage: `url(${postImage})` }}
              className="h-64 bg-bottom bg-cover"
            />
          ) : null}
          <div className="w-full p-6 py-4 mb-4 roboto text-lg leading-normal text-grey-darker bg-white lg:lt-shadow rounded-sm">
            {postText.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-3">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex  text-sm text-grey-dark">
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
              <span className="text-2xl text-blue-lighter">
                <i className="ion-thumbsup" />
              </span>
              <span className="ml-1 text-sm text-grey-dark font-normal">
                {likes ? likes.length : '0'}
              </span>
            </div>
            <div className="mx-4 flex-grow">
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
