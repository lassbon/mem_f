import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import requestHandler from 'helpers/requestHandler'

class Project extends Component {
  componentDidMount() {
    const {
      auth: { token },
      fetchCompletedProject,
      fetchOngoingProject,
      match: { params: { id, status } },
    } = this.props
    if (status == 'ongoing') {
      fetchOngoingProject(id, token).then(res => {
        console.log(res)
      })
    } else if (status == 'completed') {
      fetchCompletedProject(id, token).then(res => {
        console.log(res)
      })
    }
  }
  render() {
    return (
      <section className="lg:px-16 py-8 bg-white ">
        <div className=" flex justify-center items-center bg-white lg:lt-shadow relative">
          <figure className="lg:w-1/2 relative">
            <img src="/static/images/olu_eletu_3.jpg" alt="" />
            <figcaption
              style={{
                background:
                  'linear-gradient(to bottom, rgba(2,2,2,0) 0%,rgba(7,4,5,1) 100%)',
              }}
              className="absolute pin-b pin-l w-full p-8 py-4 text-white"
            >
              <h3 className="text-3xl hind">Name</h3>
            </figcaption>
          </figure>
          <div className="lg:w-1/2 p-4 lg:px-8 lg:py-6 text-xs text-grey-darker">
            <div className="pb-4 border-b border-grey-light font-bold roboto">
              <span>Start date</span>
              <span className="mx-4">
                <i className="ion-arrow-right-c" />
              </span>
              <span>End date</span>
            </div>

            <p className="mt-4">
              The impact Google Fonts has had on the web is undeniable. Since
              its somewhat humble beginnings in 2010, the 800+ fonts now hosted
              by the library have been viewed well
            </p>

            <div className="mt-6">
              <Link
                to={`https://twitter.com/share?url=${
                  window.location.href
                }&text=Simple%20Social%20Network%20Sharing%20Plugin`}
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
        <div className="p-4 lg:px-12 bg-pink-lightest lg:lt-shadow">
          <div className=" relative">
            <span className="absolute h-full pin-t pin-l ml-2 border-r-2 border-yellow-light border-dashed" />
            <div className="mb-2 relative">
              <span className="lg:text-2xl text-blue-lighter">
                <i className="ion-chatbubbles" />
              </span>
              <span className="ml-1 text-sm text-grey-dark font-normal">
                {/* {comments.length} */}
              </span>
            </div>
            <div className="pl-8">
              {/* <CommentForm ownerId={id} postId={postId} token={token} /> */}
            </div>
            <ul className="list-reset my-8 relative">
              {/* {comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))} */}
              <li className=" mt-6">
                <div className="text-grey-dark">
                  someone <span className="">said:</span>
                </div>

                <div className="p-4 ml-8 bg-grey-lighter border border-grey-light text-grey-darkest rounded-sm">
                  <p>my first comment</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ auth, user }) => ({
  auth,
  user,
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
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default glueTo(Project)
