import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Tab,
  Grid,
  Image,
  Form,
  Label,
  Card,
  Icon,
  Modal,
  Button,
  List,
  Segment,
  Dimmer,
  Loader,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { update } from '../actions/auth'
import axios from 'axios'
import avatar from '../images/image (4).png'
import { ToastContainer, toast } from 'react-toastify'
import SearchFriend from '../components/SearchBar'
import api from '../api'

let mappedActivity
let myFriends
let totalFriends
let onChange
let onSubmit
let getPayments
let donations

const spinner = (
  <Segment>
    <Dimmer active inverted>
      <Loader inverted>Please wait...</Loader>
    </Dimmer>
  </Segment>
)

class Profile extends Component {
  state = {
    data: {
      profileImage: this.props.user.profileImage,
      companyName: this.props.user.companyName,
      companyAddress: this.props.user.companyAddress,
      email: this.props.user.email,
    },
    requests: [],
  }
  state_setRequests = requests =>
    this.setState(state => ({
      ...state,
      requests,
    }))
  handleChange = e => {
    this.setState({
      data: {
        [e.target.name]: e.target.value,
      },
    })
  }
  handleProfileImageChange = e => {
    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      })
    }

    reader.readAsDataURL(file)
  }
  handleSubmit = e => {
    const form = new FormData()
    const data = this.state.file
    const { user: { token, id } } = this.props

    form.append('file', data)

    // console.log(form)
    return axios
      .post(`https://acciapi.ml/api/v1/user/upload`, form, {
        headers: {
          'Content-Type': 'application/form-data',
          Accept: 'application/form-data',
          authorization: token,
        },
      })
      .then(({ data: { bannerUrl } }) =>
        this.props.update(
          {
            ...this.state.data,
            profileImage: bannerUrl,
            token,
          },
          id
        )
      )
      .then(() => {
        toast('Profile updated.')
      })
      .catch(err => {
        toast('Please try again, an error occurred.')
      })
  }
  componentDidMount() {
    const { user: { token, id } } = this.props
    let requests = []
    api.social
      .getFriendRequests(id, token)
      .then(({ data }) => {
        requests = data
        return Promise.all(
          data.map(request =>
            api.user.getUserData({
              id: request.requester,
              token,
            })
          )
        )
      })
      .then(requesters =>
        this.state_setRequests(
          requesters.map(({ data }, i) => ({
            ...requests[i],
            user: data,
          }))
        )
      )
      .catch(res => {
        console.error('get friend requests', res)
      })
  }
  acceptFriendRequest = ({ requestee, requester }) => {
    const { user: { token } } = this.props
    api.social
      .acceptFriendRequest(
        {
          requestee,
          requester,
        },
        token
      )
      .then(() => {
        toast('Connection request successfully accepted')
        const requests = this.state.requests.filter(
          request =>
            requestee !== request.requestee && requester !== request.requester
        )
        this.state_setRequests(requests)
      })
      .catch(() => {
        toast('An error occurred. Please, try again.')
      })
  }
  rejectFriendRequest = ({ requestee, requester }) => {
    const { user: { token } } = this.props
    api.social
      .rejectFriendRequest(
        {
          requestee,
          requester,
        },
        token
      )
      .then(() => {
        toast('Connection request rejected')
        const requests = this.state.requests.filter(
          request =>
            requestee !== request.requestee && requester !== request.requester
        )
        this.state_setRequests(requests)
      })
      .catch(() => {
        toast('An error occurred. Please, try again.')
      })
  }
  render() {
    const { props } = this
    const { requests } = this.state

    onChange = props.onChange
    onSubmit = props.onSubmit
    props.loading
      ? (mappedActivity = spinner)
      : (mappedActivity = props.activities.posts.map(activity => (
          <Tab.Pane attached={false} key={activity.createdAt}>
            <Card.Group className="TimeLine">
              <Card style={{ width: '100%' }}>
                {(getPayments = props.getTransactionHistory)}
                <Card.Content>
                  <Image floated="left" size="mini" circular src={avatar} />
                  <Card.Header>{activity.company}</Card.Header>
                  <Card.Meta>
                    {new Date(activity.createdAt).toDateString()}
                  </Card.Meta>
                  <Card.Description>{activity.postText}</Card.Description>
                  <Card.Description>
                    <img
                      src={activity.postImage}
                      alt=""
                      style={{ width: '100%', marginTop: 10 }}
                    />
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  {/* <div className="ui three buttons">
                    <Button size="mini">
                      <Icon name="like" />
                    </Button>
                    <Button icon="comment" size="mini" />
                  </div> */}
                </Card.Content>
              </Card>
            </Card.Group>
          </Tab.Pane>
        )))

    totalFriends = props.friends.friends.length
    myFriends = props.friends.friends.map(friend => (
      <Tab.Pane attached={false}>
        {console.log(friend)}
        <Card fluid>
          <Card.Content>
            <List horizontal>
              {
                <List.Item key="{p.memberId}">
                  <Image circular size="tiny" src={avatar} />
                  <List.Content>
                    <List.Header>
                      <Link to={`/profile/`}>"l"</Link>
                    </List.Header>
                    <p>{friend.email}</p>
                    <a
                      href={`mailto:${friend.email}`}
                      style={{
                        padding: '0.5rem 2rem',
                        borderRadius: '3px',
                        backgroundColor: '#cd90b9',
                        color: '#fff',
                      }}
                    >
                      Send message
                    </a>
                  </List.Content>
                </List.Item>
              }
            </List>
          </Card.Content>
        </Card>
      </Tab.Pane>
    ))

    donations = props.donations.donations.map(donation => (
      <Tab.Pane attached={false}>
        <Card fluid>
          <Card.Content>
            <List horizontal>
              {
                <List.Item key="{p.memberId}">
                  <Image
                    circular
                    size="tiny"
                    src="http://cdn.onlinewebfonts.com/svg/img_568656.png"
                  />
                  <List.Content>
                    <List.Header>
                      <Link to={`/profile/`}>"l"</Link>
                    </List.Header>
                    'None'
                    <Button size="tiny">Send message</Button>
                  </List.Content>
                </List.Item>
              }
            </List>
          </Card.Content>
        </Card>
      </Tab.Pane>
    ))

    const panes = [
      { menuItem: 'Activity', render: () => mappedActivity },
      {
        menuItem: 'Connections',
        render: () => [
          <Tab.Pane attached={false}>
            <Card fluid>
              <Card.Content>
                <Card.Header style={{ textAlign: 'center' }}>
                  {totalFriends} connections
                  <br />
                  <br />
                  <SearchFriend />
                </Card.Header>
              </Card.Content>
            </Card>
            <Card.Group itemsPerRow={3}>
              {requests.map(
                ({
                  requester,
                  requestee,
                  user: { companyName, companyBusiness, profileImage },
                }) => (
                  <Card color="grey">
                    <Card.Content>
                      <Image
                        floated="right"
                        size="mini"
                        src={profileImage || '/images/avatars/boy.svg'}
                      />
                      <Card.Header>{companyName}</Card.Header>
                      <Card.Meta>{companyBusiness}</Card.Meta>
                      <Card.Description>
                        {companyName} wants to add you to their connections{' '}
                        {/* <strong>best friends</strong> */}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className="ui two buttons">
                        <Button.Group>
                          <Button
                            onClick={() =>
                              this.rejectFriendRequest({ requestee, requester })
                            }
                          >
                            Reject
                          </Button>
                          <Button.Or />
                          <Button
                            positive
                            onClick={() =>
                              this.acceptFriendRequest({ requestee, requester })
                            }
                          >
                            Accept
                          </Button>
                        </Button.Group>
                      </div>
                    </Card.Content>
                  </Card>
                )
              )}
            </Card.Group>
          </Tab.Pane>,
          myFriends,
        ],
      },
      {
        menuItem: 'Transaction History',
        render: () => [
          <Tab.Pane attached={false}>
            <h1>Donations</h1>
          </Tab.Pane>,
          'None',
          <Tab.Pane attached={false}>
            <h1>Events</h1>
          </Tab.Pane>,
          'None',
          <Tab.Pane attached={false}>
            <h1>Trainings</h1>
          </Tab.Pane>,
          'None',
          <Tab.Pane attached={false}>
            <h1>Memberships</h1>
          </Tab.Pane>,
          'None',
        ],
      },
      {
        menuItem: 'Reports',
        render: () => (
          <Tab.Pane attached={false}>
            <Tab menu={{ pointing: true }} panes={reportCont} />
          </Tab.Pane>
        ),
      },
    ]
    // const memberships =
    // const events =
    // const trainings =

    return (
      <React.Fragment>
        <ToastContainer
          position="top-center"
          type="error"
          autoClose={50000}
          newestOnTop={false}
          hideProgressBar={false}
          closeOnClick={false}
        />
        <Grid>
          <Grid.Column>
            <Segment raised>
              <Label color="orange" ribbon="right">
                member id ({props.profile.membershipId})
              </Label>
              <Grid>
                <Grid.Row>
                  <Grid.Column width="3">
                    <Image
                      size="tiny"
                      circular
                      src={this.state.data.profileImage || avatar}
                    />
                  </Grid.Column>
                  <Grid.Column width="7">
                    <div style={{ marginBottom: 14 }}>
                      <h3 style={{ marginBottom: 0 }}>
                        {props.profile.companyName}
                      </h3>
                      <p style={{ fontSize: 12 }}>{props.profile.email}</p>
                    </div>
                    <Modal
                      trigger={<Button size="mini">Edit profile</Button>}
                      closeIcon
                      dimmer="blurring"
                    >
                      <Modal.Header>Edit profile</Modal.Header>
                      <Modal.Content image scrolling>
                        <Modal.Description>
                          <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                              <div style={{ position: 'relative' }}>
                                <Image
                                  wrapped
                                  size="medium"
                                  src={
                                    this.state.imagePreviewUrl
                                      ? this.state.imagePreviewUrl
                                      : this.state.data.profileImage
                                        ? this.state.data.profileImage
                                        : 'http://cdn.onlinewebfonts.com/svg/img_568656.png'
                                  }
                                />
                                <input
                                  name="profileImage"
                                  onChange={this.handleProfileImageChange}
                                  type="file"
                                  style={{
                                    position: 'absolute',
                                    top: '0',
                                    bottom: '0',
                                    left: '0',
                                    right: '0',
                                    cursor: 'pointer',
                                    opacity: 0,
                                  }}
                                />
                              </div>
                            </Form.Field>
                            <Form.Field>
                              <label>Company name</label>
                              <input
                                onChange={this.handleChange}
                                placeholder="company name"
                                name="companyName"
                                value={this.state.data.companyName}
                              />
                            </Form.Field>
                            <Form.Field>
                              <label>Company email</label>
                              <Form.Input
                                disabled
                                onChange={this.handleChange}
                                placeholder="company email"
                                name="email"
                                value={this.state.data.email}
                              />
                            </Form.Field>
                            <Form.Field>
                              <label>Company Address</label>
                              <input
                                onChange={this.handleChange}
                                placeholder="companyAddress"
                                name="address"
                                value={this.state.data.companyAddress}
                              />
                            </Form.Field>
                            <Button>
                              <Link to="/app">Submit</Link>
                            </Button>
                          </Form>
                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </React.Fragment>
    )
  }
}

const reportCont = [
  {
    menuItem: 'Membership Fees',
    render: () => (
      <Tab.Pane attached={false}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6} style={{ textAlign: 'center' }}>
              <h4 style={{ marginBottom: 0 }}>Total Payments</h4>
              <h2 style={{ marginTop: 5, color: '#707070' }}>N250,000</h2>
            </Grid.Column>
            <Grid.Column width={6} style={{ marginLeft: '20%' }}>
              <h4 style={{ marginBottom: 0 }}>Total Payments</h4>
              <h5 style={{ marginTop: 5 }}>N250,000</h5>
              <h4 style={{ marginBottom: 0 }}>Total Payments</h4>
              <h5 style={{ marginTop: 5 }}>N250,000</h5>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Donations',
    render: () => [
      <Tab.Pane attached={false}>Donations</Tab.Pane>,
      <Grid>
        <Grid.Row>
          <Grid.Column width={6} style={{ textAlign: 'center' }}>
            None
          </Grid.Column>
        </Grid.Row>
      </Grid>,
    ],
  },
  {
    menuItem: 'Tranings',
    render: () => [
      <Tab.Pane attached={false}>Tranings</Tab.Pane>,
      <Grid>
        <Grid.Row>
          <Grid.Column width={6} style={{ textAlign: 'center' }}>
            None
          </Grid.Column>
        </Grid.Row>
      </Grid>,
    ],
  },
]

export default connect(({ user }) => ({ user }), { update })(Profile)
