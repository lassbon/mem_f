import React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'

// Components

import Circle from 'loaders/Circle'

// Helpers

import network from 'services/network'
import requestHandler from 'helpers/requestHandler'
import { createdComment } from 'redux/action_creators'

// Data

const initialValues = {
  comment: '',
  postImage: '',
  postImagePreview: '',
  submitingPost: false,
  submitingMessage: 'Sending your post. Please wait',
}

const CommentForm = ({ createComment, id: owner, postId, token }) => (
  <Formik
    initialValues={{ ...initialValues, owner }}
    onSubmit={(values, { setFieldValue }) => {
      setFieldValue('submitingPost', true)
      createComment(
        {
          comment: values.comment,
          owner,
          post: postId,
        },
        token
      )
        .then(console.log)
        .catch(error => console.error(error))
        // .then(() => {
        //   setFieldValue('submitingMessage', 'Upadting your timeline')
        //   // return fetchPosts(token)
        // })
        .then(() => {
          setFieldValue('submitingPost', false)
          setFieldValue('comment', '')
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
  <form action="" onSubmit={handleSubmit} id="commentForm">
    <div className="relative">
      <textarea
        placeholder="Share a comment"
        name="comment"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.comment}
        id="comment"
        rows="10"
        className="w-full h-16 px-4 py-2 roboto text-sm leading-normal text-grey-dark bg-grey-lighter border-2 border-dotted border-grey-light rounded-sm"
      />
      <div className="flex flex-nowrap justify-between items-center absolute pin-b pin-l px-6 -mb-3">
        <button className="h-8 w-8 rounded-full bg-teal text-white">
          <span className="text-xs">
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
  createComment: (params, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      const newComment = await requestHandler(network.social.createComment)({
        params,
        token,
      })
      dispatch(createdComment(newComment))
      return Promise.resolve(newComment)
    }),
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default glueTo(CommentForm)
