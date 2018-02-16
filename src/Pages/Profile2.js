import React, { Component } from 'react'
import {
  Tab,
  Grid,
  Image,
  Label,
  Segment,
  Card,
  Icon,
  Button,
  Dimmer,
  Loader,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import api from '../api'
import { ToastContainer, toast } from 'react-toastify'

const panes = [
  {
    menuItem: 'Activity',
    render: () => (
      <Tab.Pane attached={false}>
        <Card.Group className="TimeLine">
          <Card style={{ width: '100%' }}>
            <Card.Content>
              <Image
                floated="left"
                size="mini"
                circular
                src="https://cdn-images-1.medium.com/fit/c/100/100/1*sJE5hPC1KeMj1o4_bH2jXA.jpeg"
              />
              <Card.Header>Chuks Festus</Card.Header>
              <Card.Meta>on Oct 10, 2017 4:21 PM</Card.Meta>
              <Card.Description>some text</Card.Description>
              <Card.Description>
                <img
                  src="http://xinature.com/wp-content/uploads/2017/01/rivers-tree-night-mist-webs-river-blue-spider-creepy-wallpapers-download.jpg"
                  alt=""
                  style={{ width: '100%', marginTop: 10 }}
                />
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui three buttons">
                <Button size="mini">
                  <Icon name="like" />
                  20
                </Button>
                <Button icon="comment" size="mini" />
                <Button icon="share" size="mini" />
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
      </Tab.Pane>
    ),
  },
  {
    menuItem: '(20) Mutual Friends',
    render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
  },
]

class Profile2 extends Component {
  state = {
    user: null,
    loading: false,
  }
  componentDidMount() {
    const { match: { params: { id } }, user: { token } } = this.props
    api.user
      .getUserData({ id, token })
      .then(({ data: user }) => this.setState(state => ({ ...state, user })))
  }
  render() {
    console.log(this.state.user)
    const { user, loading } = this.state
    const { user: { id: loggedInUserId, token } } = this.props
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
            {user === null ? (
              <Segment>
                <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
                </Dimmer>
              </Segment>
            ) : (
              <Segment raised>
                <Label color="orange" ribbon="right">
                  member id ({user.membershipId})
                </Label>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width="3">
                      <Image
                        size="small"
                        circular
                        src={`${user.profileImage ||
                          'http://cdn.onlinewebfonts.com/svg/img_568656.png'}`}
                      />
                    </Grid.Column>
                    <Grid.Column width="7">
                      <div>
                        <h3>{user.companyName}</h3>
                        <p>{user.email}</p>
                        <p>{user.companyPhone}</p>
                        <p>{user.companyAddress}</p>
                        {/* <p>Managing Director of Chukso Enterprises</p> */}
                      </div>
                      {loading ? (
                        <Segment>
                          <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                          </Dimmer>
                        </Segment>
                      ) : (
                        <Button
                          size="mini"
                          style={{
                            marginTop: 20,
                            background: 'var(--main-gold)',
                            color: 'var(--white)',
                          }}
                          onClick={() => {
                            this.setState(state => ({
                              ...state,
                              loading: true,
                            }))
                            api.social
                              .makeFriendRequest(
                                {
                                  requester: loggedInUserId,
                                  requestee: user.id,
                                },
                                token
                              )
                              .then(res => {
                                toast('Connection request sent successfuly.')
                                this.setState(state => ({
                                  ...state,
                                  loading: false,
                                }))
                              })
                              .catch(err => {
                                toast(
                                  'Please try again. An unexpected error occured'
                                )
                                this.setState(state => ({
                                  ...state,
                                  loading: false,
                                }))
                              })
                          }}
                        >
                          Add Connection
                        </Button>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            )}
          </Grid.Column>
        </Grid>
        {/* <Tab menu={{ secondary: true, pointing: true }} panes={panes} /> */}
      </React.Fragment>
    )
  }
}

export default connect(({ user }) => ({ user }))(Profile2)
