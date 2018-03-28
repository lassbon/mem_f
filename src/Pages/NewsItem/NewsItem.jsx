import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Components

import Comment from 'Comment'
import CommentForm from 'CommentForm'
import Circle from 'loaders/Circle'

// Helpers

import requestHandler from 'helpers/requestHandler'
import network from 'services/network'
import simpleScrollbar from 'fixed/simpleScrollbar'

class NewsItem extends Component {
  state = {
    liking: false,
    news: null,
  }
  stateSetLiking = liking => this.setState(state => ({ ...state, liking }))

  stateSetNews = news => {
    this.setState(state => ({ ...state, news }))
  }
  componentDidMount() {
    const { auth: { token }, match: { params: { id } } } = this.props
    requestHandler(network.news.fetchSingleNews)({ id, token }).then(news => {
      this.stateSetNews(news)
    })
  }
  render() {
    const {
      auth: { token },
      likeNews,
      match: { params: { id } },
      user,
    } = this.props
    const { liking, news } = this.state

    return (
      <section
        ref={el => el && simpleScrollbar.initEl(el)}
        className="relative lg:h-full overflow-y-scroll"
      >
        {!!news ? (
          <div className="flex justify-center lg:py-8">
            <div className="lg:w-2/3">
              <div className="relative">
                <img src={news.image} alt="" className="lg:w-full" />
                <div className="flex absolute pin-b pin-l lg:w-full lg:px-8 lg:py-4">
                  <button
                    onClick={() => {
                      this.stateSetLiking(true)
                      likeNews(
                        {
                          id: news.id,
                          liker: user.id,
                        },
                        token
                      )
                        .then(response => {
                          const oldLikes = !!news.likes ? news.likes : []
                          const updatedNews = {
                            ...news,
                            likes: [response, ...oldLikes],
                          }
                          this.stateSetNews(updatedNews)
                          // toast.success('News liked')
                        })
                        .catch(() => {})
                        .then(() => {
                          this.stateSetLiking(false)
                        })
                    }}
                    className="inline-block flex flex-wrap justify-center items-center rounded-full mr-4 cursor-pointer"
                  >
                    {!!news.likes && (
                      <span className="mr-1">{news.likes.length}</span>
                    )}
                    {!!news.likes && news.likes.includes(user.id) ? (
                      <i className="ion-android-favorite" />
                    ) : (
                      <i className="ion-android-favorite-outline" />
                    )}
                    {liking && '...'}
                  </button>
                  <Link
                    to={`https://twitter.com/share?url=${
                      window.location.href
                    }&text=${encodeURIComponent(news.title)}`}
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
              <h2 className="mt-8 text-4xl bold">{news.title}</h2>
              <div className="mt-8 text-grey-darker">
                {news.body
                  .split('\n')
                  .map(paragraph => <p className="mt-4">{paragraph}</p>)}
              </div>
              <div className="mt-8 p-4 lg:flex lg:justify-center lg:py-8 lg:px-12 bg-white lg:lt-shadow">
                <div className="lg:w-4/5 relative">
                  <span className="absolute h-full pin-t pin-l ml-2 border-r-2 border-yellow-light border-dashed" />
                  <div className="mb-2 relative">
                    <span className="lg:text-2xl text-blue-lighter">
                      <i className="ion-chatbubbles" />
                    </span>
                    <span className="ml-1 text-sm text-grey-dark font-normal">
                      {news.comments.length}
                    </span>
                  </div>
                  <div className="pl-8">
                    <CommentForm
                      ownerId={user.id}
                      news={news}
                      newsId={news.id}
                      token={token}
                      setNews={this.stateSetNews}
                    />
                  </div>
                  <ul className="list-reset my-8 relative">
                    {/* {news.comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                  ))} */}
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

              {/* <p className="mt-8">{news.body}</p> */}
            </div>
          </div>
        ) : (
          <div className="h-full w-full bg-white flex justify-center py-6">
            <Circle text="Retrieving News details. Please wait." />
          </div>
        )}
      </section>
    )
  }
}

const mapStateToProps = ({ auth, user }) => ({
  auth,
  user,
})

const mapDispatchToProps = dispatch => ({
  likeNews: (data, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      const response = await requestHandler(network.news.likeNews)({
        params: data,
        token,
      })
      // dispatch(likedNews(response))
      return Promise.resolve(response)
    }),
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default glueTo(NewsItem)
