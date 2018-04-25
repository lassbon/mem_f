import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

// Components

import Comment from 'Comment'
import CommentForm from 'CommentForm'
import Circle from 'loaders/Circle'

// Helpers

import simpleScrollbar from 'fixed/simpleScrollbar'
import requestHandler from 'helpers/requestHandler'
import { likedProject } from 'redux/action_creators'

const toastOptions = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 3 * 60 * 60,
}

class Project extends Component {
  state = {
    liking: false,
    loading: true,
    project: null,
  }
  stateSetLiking = liking => this.setState(state => ({ ...state, liking }))
  stateSetLoading = loading => this.setState(state => ({ ...state, loading }))
  stateSetProject = project => this.setState(state => ({ ...state, project }))
  componentDidMount() {
    const {
      auth: { token },
      fetchCompletedProject,
      fetchOngoingProject,
      match: { params: { id, status } },
    } = this.props
    if (status == 'ongoing') {
      fetchOngoingProject(id, token)
        .then(res => {
          this.stateSetProject(res)
        })
        .catch(error => {})
        .then(() => {
          this.stateSetLoading(false)
        })
    } else if (status == 'completed') {
      fetchCompletedProject(id, token)
        .then(res => {
          this.stateSetProject(res)
        })
        .catch(error => {})
        .then(() => {
          this.stateSetLoading(false)
        })
    }
  }
  render() {
    const { liking, loading, project } = this.state
    const { auth: { token }, likeProject, user, users } = this.props

    return loading && !project ? (
      <div className="flex justify-center py-6">
        <Circle text="Retrieving project details. Please wait" />
      </div>
    ) : (
      <>
        <ToastContainer {...toastOptions} />

        <section
          ref={el => el && simpleScrollbar.initEl(el)}
          className="lg:h-full overflow-y-scroll bg-grey-lighter "
        >
          <div className="py-8 lg:px-16">
            <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:lt-shadow relative">
              <figure className="lg:w-1/2 relative">
                <img src={project.banner} alt="" />
                <figcaption
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(2,2,2,0) 0%,rgba(7,4,5,1) 100%)',
                  }}
                  className="absolute pin-b pin-l w-full p-8 py-4 text-white"
                >
                  <h3 className="text-3xl hind">{project.title}</h3>
                </figcaption>
              </figure>
              <div className="lg:w-1/2 p-4 lg:px-8 lg:py-6 text-xs text-grey-darker">
                <div className="pb-4 border-b border-grey-light font-bold roboto">
                  <span>{project.date}</span>
                  <span className="mx-4">
                    {/* <i className="ion-arrow-right-c" /> */}
                  </span>
                  {/* <span>End date</span> */}
                </div>

                <p className="mt-4">{project.description}</p>

                <div className="flex mt-6 text-lg">
                  <button
                    onClick={() => {
                      this.stateSetLiking(true)
                      likeProject(
                        {
                          id: project.id,
                          liker: user.id,
                        },
                        token
                      ).then(response => {
                          response.id = project.id; // id and liker not being returned from the back end, set here directly
                          response.liker = user.id;
                          const oldLikes = !!project.likes ? project.likes : []
                          const updatedProject = {
                            ...project,
                            likes: [response, ...oldLikes],
                          }
                          this.stateSetProject(updatedProject)
                          toast.success('Project liked')
                        })
                        .catch((error) => {
                          console.log(error)
                        })
                        .then(() => {
                          this.stateSetLiking(false)
                        })
                    }}
                    className="inline-block flex flex-wrap justify-center items-center rounded-full mr-4 cursor-pointer"
                  >
                    {!!project.likes && (
                      <span className="mr-1">{project.likes.length}</span>
                    )}
                    {!!project.likes && project.likes.includes(user.id) ? (
                      <i className="ion-android-favorite" />
                    ) : (
                      <i className="ion-android-favorite-outline" />
                    )}
                    {liking && '...'}
                  </button>

                  <Link
                    to={`https://twitter.com/share?url=${
                      window.location.href
                    }&text=${encodeURIComponent(project.description)}`}
                    target="_"
                  >
                    <span
                      style={{ backgroundColor: '#00aced' }}
                      className="w-8 h-8 inline-flex mr-4 justify-center items-center text-white rounded-full"
                    >
                      <i className="ion-social-twitter" />
                    </span>
                  </Link>
                  <Link
                    to={`https://facebook.com/sharer/sharer.php?u=${
                      window.location.href
                    }`}
                    target="_"
                  >
                    <span
                      style={{ backgroundColor: '#3b5998' }}
                      className="w-8 h-8 inline-flex mr-4 justify-center items-center text-white rounded-full"
                    >
                      <i className="ion-social-facebook" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4 lg:flex lg:justify-center lg:py-8 lg:px-12 bg-white lg:lt-shadow">
              <div className="lg:w-4/5 relative">
                <span className="absolute h-full pin-t pin-l ml-2 border-r-2 border-yellow-light border-dashed" />
                <div className="mb-2 relative">
                  <span className="lg:text-2xl text-blue-lighter">
                    <i className="ion-chatbubbles" />
                  </span>
                  <span className="ml-1 text-sm text-grey-dark font-normal">
                    {project.comments.length}
                  </span>
                </div>
                <div className="pl-8">
                  <CommentForm
                    ownerId={user.id}
                    project={project}
                    postId={project.id}
                    token={token}
                    setProject={this.stateSetProject}
                  />
                </div>
                <ul className="list-reset my-8 relative">
                  {project.comments.map(comment => (
                    <Comment key={comment.id} comment={comment} user={users.entities.users[comment.owner]} />
                  ))}
                  {/* <li className=" mt-6">
                  <div className="text-grey-dark">
                    someone <span className="">said:</span>
                  </div>

                  <div className="p-4 ml-8 bg-grey-lighter border border-grey-light text-grey-darkest rounded-sm">
                    <p>my first comment</p>
                  </div>
                </li> */}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}

const mapStateToProps = ({ auth, user, users }) => ({
  auth,
  user,
  users,
})

const mapDispatchToProps = dispatch => ({
  fetchOngoingProject: (id, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      const response = await requestHandler(
        network.projects.fetchOngoingProject
      )({
        id,
        token,
      })
      return Promise.resolve(response)
    }),
  fetchCompletedProject: (id, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      const response = await requestHandler(
        network.projects.fetchCompletedProject
      )({
        id,
        token,
      })
      return Promise.resolve(response)
    }),
  likeProject: (data, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      try {
        const response = await requestHandler(network.projects.likeProject)({
          params: data,
          token,
        })
        if (response.status === 'success') { 
          dispatch(likedProject(params))
        }
        return Promise.resolve(response)
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
      
    }),
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default glueTo(Project)
