import React from "react";
import { Link } from 'react-router-dom';
import { Tab, Header, Grid, Image, Form, Label, Card, Icon, Modal, Button, List, Segment, Dimmer, Loader } from "semantic-ui-react";

let mappedActivity;
let myFriends;
let totalFriends;
let getPayments;
let donations;
let onChange;
let onSubmit;


const spinner = <Segment>
  <Dimmer active inverted>
    <Loader inverted>Please wait...</Loader>
  </Dimmer>
</Segment>

const Profile = (props) => {
  onChange = props.onChange
  onSubmit = props.onSubmit
  props.loading ? mappedActivity = spinner :
    mappedActivity = props.activities.posts.map(activity => (
      <Tab.Pane attached={false} key={activity.createdAt}>
        <Card.Group className="TimeLine">
          <Card style={{ width: "100%" }}>
            {getPayments = props.getTransactionHistory}
            <Card.Content>
              <Image
                floated="left"
                size="mini"
                circular
                src="https://cdn-images-1.medium.com/fit/c/100/100/1*sJE5hPC1KeMj1o4_bH2jXA.jpeg"
              />
              <Card.Header>{activity.company}</Card.Header>
              <Card.Meta>{new Date(activity.createdAt).toDateString()}</Card.Meta>
              <Card.Description>{activity.postText}</Card.Description>
              <Card.Description>
                <img
                  src="http://xinature.com/wp-content/uploads/2017/01/rivers-tree-night-mist-webs-river-blue-spider-creepy-wallpapers-download.jpg"
                  alt=""
                  style={{ width: "100%", marginTop: 10 }}
                />
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui three buttons">
                <Button size="mini">
                  <Icon name="like" />
                  {/* {activity.likes.length} */}
                </Button>
                <Button icon="comment" size="mini" />
                {/* <Button icon="share" size="mini" /> */}
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
      </Tab.Pane>
    ))

  totalFriends = props.friends.friends.length;
  myFriends = props.friends.friends.map(friend => (
    <Tab.Pane attached={false}>
      {console.log(friend)}
      <Card fluid>
        <Card.Content>
          <List horizontal>
            {
              <List.Item key="{p.memberId}">
                <Image circular size="tiny" src="https://i.imgur.com/vMOJDOk.jpg" />
                <List.Content>
                  <List.Header><Link to={`/profile/`}>"l"</Link></List.Header>
                  <p>{friend.email}</p>
                  <Button size='tiny'>Send message</Button>
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
                <Image circular size="tiny" src="https://i.imgur.com/vMOJDOk.jpg" />
                <List.Content>
                  <List.Header><Link to={`/profile/`}>"l"</Link></List.Header>
                  'None'
                  <Button size='tiny'>Send message</Button>
                </List.Content>
              </List.Item>
            }
          </List>
        </Card.Content>
      </Card>
    </Tab.Pane>
  ))
  // const memberships = 
  // const events = 
  // const trainings = 

  return <React.Fragment>
    <Grid>
      <Grid.Column>
        <Segment raised>
          <Label color='orange' ribbon='right'>
            member id ({props.profile.membershipId})
          </Label>
          <Grid>
            <Grid.Row>
              <Grid.Column width='3'>
                <Image
                  size="tiny"
                  circular
                  src="https://cdn-images-1.medium.com/fit/c/100/100/1*sJE5hPC1KeMj1o4_bH2jXA.jpeg"
                />
              </Grid.Column>
              <Grid.Column width='7'>
                <div>
                  <h3>{props.profile.companyName}</h3>
                  <p>{props.profile.email}</p>
                </div>
                <Modal trigger={<Button size="mini">Edit profile</Button>} closeIcon dimmer="blurring">
                  <Modal.Header>Edit profile</Modal.Header>
                  <Modal.Content image>
                    <Image wrapped size='medium' src='https://cdn-images-1.medium.com/fit/c/200/200/1*sJE5hPC1KeMj1o4_bH2jXA.jpeg' />
                    <Modal.Description>
                      <Form>
                        <Form.Field>
                          <label>Company name</label>
                          <input onChange={onChange} placeholder="company name" name="company" value={props.company} />
                        </Form.Field>
                        <Form.Field>
                          <label>Company email</label>
                          <input onChange={onChange} placeholder="company email" name="email" value={props.email} />
                        </Form.Field>
                        <Form.Field>
                          <label>Company Address</label>
                          <input onChange={onChange} placeholder="company address" name="address" value={props.address} />
                        </Form.Field>
                        <Form.Field>
                          <label>Password</label>
                          <input onChange={onChange} placeholder="Update password" type="password" name="password" value={props.password} />
                        </Form.Field>
                        <Button onClick={onSubmit}><Link to="/app">Submit</Link></Button>
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
}

const panes = [
  { menuItem: "Activity", render: () => mappedActivity },
  {
    menuItem: "Friends", render: () => ([<Tab.Pane attached={false}>
      <Card fluid>
        <Card.Content>
          <Card.Header style={{ textAlign: 'center' }}>
            {totalFriends} connections
    </Card.Header>
        </Card.Content>
      </Card>
    </Tab.Pane>, myFriends])
  },
  {
    menuItem: "Transaction History",
    render: () => ([
      <Tab.Pane attached={false}><h1>Donations</h1></Tab.Pane>, 'None',
      <Tab.Pane attached={false}><h1>Events</h1></Tab.Pane>, 'None',
      <Tab.Pane attached={false}><h1>Trainings</h1></Tab.Pane>, 'None',
      <Tab.Pane attached={false}><h1>Memberships</h1></Tab.Pane>, 'None',
    ]
    )
  },
  {
    menuItem: "Reports",
    render: () => <Tab.Pane attached={false}>
      <Tab menu={{ pointing: true }} panes={reportCont} />
    </Tab.Pane>
  }
];

const reportCont = [
  {
    menuItem: 'Membership Fees', render: () => <Tab.Pane attached={false}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={6} style={{ textAlign: 'center' }}>
            <h4 style={{ marginBottom: 0 }}>Total Payments</h4>
            <h2 style={{ marginTop: 5 }}>N250,000</h2>
          </Grid.Column>
          <Grid.Column width={6} style={{ textAlign: 'center' }}>
            <h4 style={{ marginBottom: 0 }}>Total Payments</h4>
            <h5 style={{ marginTop: 5 }}>N250,000</h5>
            <h4 style={{ marginBottom: 0 }}>Total Payments</h4>
            <h5 style={{ marginTop: 5 }}>N250,000</h5>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Tab.Pane>
  },
  {
    menuItem: 'Donations', render: () => [<Tab.Pane attached={false}>Donations</Tab.Pane>, <Grid>
      <Grid.Row>
        <Grid.Column width={6} style={{ textAlign: 'center' }}>
          None
      </Grid.Column>
      </Grid.Row>
    </Grid>]
  },
  {
    menuItem: 'Tranings', render: () => [<Tab.Pane attached={false}>Tranings</Tab.Pane>, <Grid>
      <Grid.Row>
        <Grid.Column width={6} style={{ textAlign: 'center' }}>
          None
      </Grid.Column>
      </Grid.Row>
    </Grid>]
  },
]

export default Profile;
