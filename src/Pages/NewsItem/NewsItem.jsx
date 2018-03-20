import React, { Component } from 'react'
import { connect } from 'react-redux'

import requestHandler from 'helpers/requestHandler'
import network from 'services/network'

class NewsItem extends Component {
  state = {
    news: null,
  }
  stateSetNews = news => {
    this.setState(state => ({ ...state, news }))
  }
  componentDidMount() {
    const { auth: { token }, user: { id } } = this.props
    requestHandler(network.news.fetchSingleNews)({ id, token })
  }
  render() {
    const { match: { params: { id } } } = this.props

    return <div className="lg:px-16 py-8">news</div>
  }
}

const mapStateToProps = ({ auth, user }) => ({
  auth,
  user,
})

const glueTo = connect(mapStateToProps, null)

export default glueTo(NewsItem)
