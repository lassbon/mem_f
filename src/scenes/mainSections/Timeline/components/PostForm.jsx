import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'

// Components

import Circle from 'loaders/Circle'

// Helpers

import requestHandler from 'helpers/requestHandler'
import network from 'services/network'
import { receivedTimelinePosts } from 'redux/action_creators'

// Data

const initialValues = {
  postText: '',
  postImage: '',
  postImagePreview: '',
  submitingPost: false,
  submitingMessage: 'Sending your post. Please wait',
}

const PostForm = ({ fetchPosts, id, token }) => (
  <Formik
    initialValues={{ ...initialValues, owner: id }}
    onSubmit={(values, { setFieldValue }) => {
      setFieldValue('submitingPost', true)
      requestHandler(network.social.createTimelinePost)({
        params: {
          postText: values.postText,
          postImage: values.postImagePreview,
          owner: values.owner,
        },
        token,
      })
        .then(console.log)
        .catch(error => console.error(error))
        .then(() => {
          setFieldValue('submitingMessage', 'Upadting your timeline')
          return fetchPosts(token)
        })
        .then(() => {
          setFieldValue('submitingPost', false)
          setFieldValue('postText', '')
          setFieldValue('postImagePreview', '')
          setFieldValue('submitingMessage', 'Sending your post. Please wait')
        })
    }}
    render={props => <Form {...props} />}
  />
)

const Form = ({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
  values,
}) => (
  <form action="" onSubmit={handleSubmit} id="postForm">
    <div className="relative">
      {values.postImagePreview ? (
        <div
          style={{ backgroundImage: `url(${values.postImagePreview})` }}
          className="h-64 bg-bottom bg-cover"
        />
      ) : null}
      <textarea
        placeholder="Share a post or picture"
        name="postText"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.postText}
        id="postText"
        rows="10"
        className="w-full h-64 px-6 py-4 pb-8 roboto text-lg leading-normal text-grey-darker border-r-2 border-b-2 border-dotted border-grey-light lg:lt-shadow rounded-sm"
      />
      <div className="flex flex-nowrap justify-between items-center w-full absolute pin-b pin-l px-6 pb-3">
        <div className="flex items-center bg-blue-lightest text-xs text-grey-darker cursor-pointer relative">
          <i className="inline-block w-4 mr-1">
            <img
              src="/static/images/png.svg"
              alt=""
              className="w-auto h-full"
            />
          </i>
          {values.postImagePreview ? 'Change picture' : 'Add a picture'}
          <input
            id="postImage"
            type="file"
            onChange={e => {
              let reader = new FileReader()
              let file = e.target.files[0]

              reader.onloadend = () => {
                setFieldValue('postImage', file)
                setFieldValue('postImagePreview', reader.result)
              }

              reader.readAsDataURL(file)
            }}
            className="absolute pin-l pin-t opacity-0 w-full cursor-pointer"
          />
        </div>
        <button>
          <span className="text-lg">
            <i className="ion-android-send" />
          </span>
        </button>
      </div>
      {values.submitingPost ? (
        <div className="absolute pin-l pin-t h-full w-full bg-white flex justify-center py-6">
          <Circle text={values.submitingMessage} />
        </div>
      ) : null}
    </div>
  </form>
)

const mapStateToProps = ({ auth: { token, user: { id } } }) => ({
  token,
  id,
})

const mapDispatchToProps = dispatch => ({
  fetchPosts: token =>
    dispatch(async (dispatch, getState, { network }) => {
      const posts = await requestHandler(network.social.fetchTimelinePosts)({
        token,
      })
      return Promise.resolve(dispatch(receivedTimelinePosts(posts)))
    }),
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default glueTo(PostForm)
