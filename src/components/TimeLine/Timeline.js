import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Button, Card, Image, Icon } from 'semantic-ui-react'
import { getPostData } from '../../utils/membership-api'
import setAuthorizationHeader from '../../actions/setAuthorizationHeader'
// import user from '../../reducer/user'
import './Timeline.css'

const BASEURL = 'https://obscure-waters-44612.herokuapp.com/'

function generateLikeCount() {
  return Math.floor(Math.random() * 50 + 15)
}
const postList = [
  {
    id: 1,
    username: 'Lemuel Okoli ',
    time: 'on Oct 10, 2017 4:21 PM',
    userphoto:
      'https://pbs.twimg.com/profile_images/852318233038385152/pU9gpAg7.jpg',
    discription: 'Me myself and i',
    image:
      'https://www.findworka.com/assets/frontend/uploads/users/photo_U0iZpvdLUz.jpg',
    likes: generateLikeCount(),
  },
  {
    id: 2,
    username: 'Chuks Festus ',
    time: 'on Oct 20, 2017 4:21 PM',
    userphoto:
      'https://cdn-images-1.medium.com/fit/c/200/200/1*sJE5hPC1KeMj1o4_bH2jXA.jpeg',
    discription: `In Nigeria girls dont say "come lets cuddle"
   they say  " stay there and be pressing your phone i will soon be going home ooo"
   isn't that extraordinary?...😂😂`,
    likes: generateLikeCount(),
  },
  {
    id: 3,
    username: 'James Bond ',
    time: 'on Oct 20, 2017 4:21 PM',
    userphoto:
      'https://yt3.ggpht.com/-nD6hoDA1aAU/AAAAAAAAAAI/AAAAAAAAAAA/Rrpr8O9gPlU/s288-c-k-no-mo-rj-c0xffffff/photo.jpg',
    discription: '"If I hear pim, I will add another wife."',
    image: 'https://pbs.twimg.com/media/DSP0VYTW0AAkwyR.jpg:large',
    likes: generateLikeCount(),
  },
]

class Timelines extends React.Component {
  constructor() {
    super()
    this.state = { posts: [] }
  }
  state_setPosts = posts => {
    this.setState(state => ({ ...state, posts }))
  }
  getPosts() {
    const { user: { token, id } } = this.props
    // console.log(this.props)
    console.log(token, id)
    // setAuthorizationHeader(token)
    axios(`${BASEURL}api/v1/social/post/`, {
      headers: {
        authorization: token,
      },
    }).then(response => {
      console.log('response', response)
      this.state_setPosts(response.data)
    })
  }

  likePost = postId => {
    const { user: { token, id } } = this.props
    axios.post(
      `${BASEURL}api/v1/social/post/like`,
      {
        id: postId,
        liker: id,
      },
      {
        headers: {
          authorization: token,
          'Content-Type': 'application/form-data',
          Accept: 'application/form-data',
        },
      }
    )
  }

  componentDidMount() {
    this.getPosts()
    // console.log(this.posts)
  }

  render() {
    const { posts } = this.state
    return (
      <React.Fragment>
        <Card.Group className="TimeLine">
          {posts.map((post, id) => (
            <Card style={{ width: '100%' }} key={id}>
              <Card.Content>
                <Image
                  floated="left"
                  size="mini"
                  circular
                  src={post.username}
                />
                <Card.Header>Chuks Festus</Card.Header>
                <Card.Meta>on {post.createdAt}</Card.Meta>
                <Card.Description>{post.postText}</Card.Description>
                <Card.Description>
                  <img
                    src={post.postImage}
                    alt=""
                    style={{ width: '100%', marginTop: 10 }}
                  />
                </Card.Description>
              </Card.Content>
              <Card.Content extra className="time">
                <div className="ui three buttons">
                  <Button
                    onClick={() => {
                      this.likePost(post.id)
                    }}
                    size="mini"
                  >
                    <Icon name="like" />
                    {post.likes.length}
                  </Button>
                  {/* <Button icon="comment" size="mini" /> */}
                  {/* <Button icon="share" size="mini" /> */}
                </div>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user,
})

export default connect(mapStateToProps, null)(Timelines)
