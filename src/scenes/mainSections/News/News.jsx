import React from 'react'
import { connect } from 'react-redux'
import simpleScrollbar from 'fixed/simpleScrollbar'

import { receivedAllNews } from 'redux/action_creators'
import requestHandler from 'helpers/requestHandler'

import Circle from 'loaders/Circle'
import NewsItem from 'NewsItem'

const News = ({ auth: { token }, fetchAllNews, news }) => {
  if (!news)
    return (
      fetchAllNews(token),
      (
        <div className="flex justify-center py-6">
          <Circle text="Retrieving news. Please wait" />
        </div>
      )
    )
  return (
    <div
      ref={el => el && simpleScrollbar.initEl(el)}
      className="lg:h-full lg:w-full"
    >
      <ul className="list-reset flex flex-wrap lg:h-full lg:overflow-y-scroll lg:px-16 py-8 bg-grey-lighter">
        {news.map(data => <NewsItem key={data.id} news={data} />)}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ auth, news }) => ({
  auth,
  news,
})

const mapDispatchToProps = dispatch => ({
  fetchAllNews: token =>
    dispatch(async (dispatch, getState, { network }) => {
      const posts = await requestHandler(network.news.fetchALlNews)({
        token,
      })
      return Promise.resolve(dispatch(receivedAllNews(posts)))
    }),
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default glueTo(News)
