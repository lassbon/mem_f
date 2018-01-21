import React, { Component } from 'react'
import { Button, Segment, Dimmer, Loader,  Divider, Image, Transition, Comment, Icon, Form, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'
import axios from 'axios'
import setAuthorizationHeader from '../../actions/setAuthorizationHeader'

const BASEURL = 'https://obscure-waters-44612.herokuapp.com/'

class Comments extends Component {
  constructor() {
    super()
    this.state = { comments: [], visible: false, loading : false  }
  }

  state_setComments = comments => {
    this.setState(state => ({ ...state, comments }))
  }
  getComments = () => {
    const { user: { token, id } } = this.props
    // console.log(this.props)
    // console.log(token, id)
    // setAuthorizationHeader(token)
    axios(`${BASEURL}api/v1/social/comment`, {
      headers: {
        authorization: token,
      },
    }).then(response => {
      // console.log('response', response)
      this.state_setComments(response.data)
    })
  }
  replyComment = event => {
    const { user: { token, id } } = this.props
    let data = event.target.querySelector('textarea').value
    this.setState({
      loading : !this.state.loading
    })
    axios.post(`${BASEURL}api/v1/social/comment`, {data : data}, {
      headers: {
        authorization: token,
      },
    }).then(response => {
      // console.log('response', response)
      this.state_setComments(response.data)
      this.setState({
        loading : !this.state.loading
      })
    })
  }

  componentDidMount() {
    this.getComments()
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible, comments } = this.state

    return (
      <React.Fragment>
        <Button as='div' labelPosition='right'>
          
          <Button
            basic color='blue'
            content={visible ? 'Hide' : 'Show'} onClick={this.toggleVisibility}
            size="mini"
          >
            <Icon name='comment' />
            comment
          </Button>
          <Label as='a' basic color='blue' pointing='left'>{comments.length}</Label>
        </Button>
        <Divider hidden />
        <Transition visible={visible} animation='slide down' duration={500}>
          <Comment.Group>
          {comments.length ? (
            comments
              .map((com, i) => (
                
                  <React.Fragment>
                  <Comment>
                    <Comment.Content>
                      <Comment.Author as='a'>{com.owner}</Comment.Author>
                      <Comment.Text>{com.comment}</Comment.Text>
                    </Comment.Content>
                  </Comment>
                  </React.Fragment>
                
              ))
              .reverse()
          ) : false}
          <Form reply onSubmit={this.replyComment} loading={this.state.loading}>
            <Form.TextArea autoHeight rows={2} placeholder='leave a comment...' />
            <Button content='Add Comment' size='tiny' labelPosition='left' icon='edit' primary />
          </Form>
          </Comment.Group>
        </Transition>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user,
})

export default connect(mapStateToProps, null)(Comments)