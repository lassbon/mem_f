import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import simpleScrollbar from 'fixed/simpleScrollbar'

import Uppy from 'uppy/lib/core'
import Dashboard from 'uppy/lib/plugins/Dashboard'
import XHRUpload from 'uppy/lib/plugins/XHRUpload'
import Form from 'uppy/lib/plugins/Form'
const FileInput = require('uppy/lib/plugins/FileInput')
const ProgressBar = require('uppy/lib/plugins/ProgressBar')
// Components

import Post from 'post'
import PostForm from 'PostForm'
import EmptyPaper from 'EmptyPaper'
import Circle from 'loaders/Circle'

// Helpers

import { receivedTimelinePosts } from 'redux/action_creators'
import requestHandler from 'helpers/requestHandler'
import network from 'services/network'

const renderBasedPostsState = (loading, { posts, users }) => {
  if (!posts)
    return (
      <div className="flex justify-center py-6">
        <Circle text="Retreiving posts. Please wait" />
      </div>
    )
  if (posts.result.length === 0) return <EmptyPaper />
  return (
    <ul className="list-reset relative">
      {posts.result.map(id => (
        <Post
          key={id}
          post={posts.entities.posts[id]}
          user={users.entities.users[posts.entities.posts[id].owner]}
        />
      ))}
    </ul>
  )
}

const BASEURL = 'https://acciapi.ml'

const makeUppy = (
  { trigger, restrictions },
  { token, id, name, completedCallback }
) => {
  Uppy({
    autoProceed: false,
    restrictions,
  })
    .use(Dashboard, { trigger })
    .use(Form, { target: '#form' })
    .use(XHRUpload, {
      bundle: true,
      endpoint: `${BASEURL}/api/v1/user/upload`,
      fieldName: 'file',
      formData: true,
      headers: {
        'Content-Type': 'application/form-data',
        Accept: 'application/form-data',
        authorization: token,
      },
      // metaFields: ['file'],
      method: 'post',
    })
    .run()
    .on('complete', result => {
      completedCallback(result)
      console.log('Upload result:', result)
    })
}

// Data

const toastOptions = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 3 * 60 * 60,
}

const defaultErrorMsg =
  'An error occured while trying to get posts. Please reload the page.'

// COMPONENT!!!

class Timeline extends Component {
  state = {
    posts: [],
    loadingPosts: false,
    post: {
      imagePreview: '',
    },
  }

  stateSetLoadingPosts = loadingPosts =>
    this.setState(state => ({ ...state, loadingPosts }))

  stateSetPosts = posts => this.setState(state => ({ ...state, posts }))

  componentDidMount() {
    const { id, fetchPosts, posts, token } = this.props

    if (!posts) {
      this.stateSetLoadingPosts(true)
      fetchPosts(token)
        .catch(err => toast.error(err.message || defaultErrorMsg))
        .then(() => this.stateSetLoadingPosts(false))
    }
  }
  render() {
    const { loadingPosts } = this.state
    const { posts, user: { companyName }, users } = this.props
    return (
      <>
        <ToastContainer {...toastOptions} />

        <section className="lg:flex lg:h-full">
          <div
            ref={el => el && simpleScrollbar.initEl(el)}
            className="lg:h-full lg:w-3/4 bg-grey-lightest border-r border-grey-light"
          >
            <div className="lg:h-full lg:py-8 lg:px-12 relative">
              <div className="flex pb-4 border-b border-grey-lighter relative">
                <span className="w-8 mr-4">
                  <img
                    src="/static/images/033-boy.svg"
                    alt=""
                    className="w-8"
                  />
                </span>

                <div className="flex-grow">
                  <div className="mb-4 text-sm ">
                    <p className="mb-1 text-purple-light capitalize">
                      {companyName}
                    </p>
                    <p className="text-xs text-grey-darker">
                      @1:25pm on the 23rd of Jan
                    </p>
                  </div>
                  <PostForm />
                </div>
              </div>
              <div className="relative pb-8">
                <span className="absolute h-full pin-t pin-l ml-4 border-r border-grey-light border-dashed" />
                {renderBasedPostsState(loadingPosts, { posts, users })}
              </div>
            </div>
          </div>

          <aside className="lg:w-1/4 lg:h-full lg:bg-grey-lightest">
            <div> </div>
          </aside>
        </section>
      </>
    )
  }
}

const mapStateToProps = ({
  auth: { token, user: { id } },
  posts,
  user,
  users,
}) => ({
  id,
  token,
  posts,
  user,
  users,
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

export default glueTo(Timeline)
