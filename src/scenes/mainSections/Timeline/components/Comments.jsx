import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentForm from './CommentForm'
import Comment from './Comment'

class Comments extends Component {
  render() {
    const { comments, auth: { token, user: { id } }, postId } = this.props
    return (
      <div className="lg:pr-8 relative">
        <span className="absolute h-full pin-t pin-l ml-2 border-r-2 border-yellow-light border-dashed" />
        <div className="mb-2 relative">
          <span className="text-2xl text-blue-lighter">
            <i className="ion-chatbubbles" />
          </span>
          <span className="ml-1 text-sm text-grey-dark font-normal">
            {comments.length}
          </span>
        </div>
        <div className="pl-8">
          <CommentForm ownerId={id} postId={postId} token={token} />
        </div>
        <ul className="list-reset my-8 relative">
          {comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, user }) => ({
  auth,
})

const glueTo = connect(mapStateToProps, null)

export default glueTo(Comments)
