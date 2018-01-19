import React from "react";
import { Link } from 'react-router-dom';
import { Tab, Grid, Image, Label, Segment, Card, Icon, Button, List } from "semantic-ui-react";

// import FriendsApi from '../utils/api';

const panes = [
  {
    menuItem: "Activity",
    render: () => <Tab.Pane attached={false}>
      <Card.Group className="TimeLine">
            <Card style={{ width: "100%" }}>
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
                    style={{ width: "100%", marginTop: 10 }}
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
  },
  {
    menuItem: "Friends",
    render: () => <Tab.Pane attached={false}>
      <Card fluid>
        <Card.Content>
          <Card.Header style={{textAlign: 'center'}}>
            (20) friends
          </Card.Header>
        </Card.Content>
        <Card.Content>
          {/* <List horizontal>
            { 
              // FriendsApi.all().map(p => (
                <List.Item key="{p.memberId}">
                <Image circular size="tiny" src="https://i.imgur.com/vMOJDOk.jpg" />
                  <List.Content>
                    <List.Header><Link to={`/profile/`}>"l"</Link></List.Header>
                    <p> mutual friends</p>
                    <Button size='tiny'>Send message</Button>
                  </List.Content>
                </List.Item>
              // ))
            }
          </List> */}
        </Card.Content>
      </Card>
    </Tab.Pane>
  },
  {
    menuItem: "Transaction History",
    render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
  },
  {
    menuItem: "Reports",
    render: () => <Tab.Pane attached={false}>
      
        <Tab menu={{ pointing: true }} panes={reportCont} />
      
    </Tab.Pane>
  }
];

const reportCont = [
  { menuItem: 'Membership Fees', render: () => <Tab.Pane attached={false}>
    <Grid>
      <Grid.Row>
        <Grid.Column width={6} style={{textAlign: 'center'}}>
          <h4 style={{marginBottom: 0}}>Total Payments</h4>
          <h2 style={{marginTop: 5}}>N250,000</h2>
        </Grid.Column>
        <Grid.Column width={6} style={{textAlign: 'center'}}>
          <h4 style={{marginBottom: 0}}>Total Payments</h4>
          <h5 style={{marginTop: 5}}>N250,000</h5>
          <h4 style={{marginBottom: 0}}>Total Payments</h4>
          <h5 style={{marginTop: 5}}>N250,000</h5>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Tab.Pane> },
  { menuItem: 'Donations', render: () => <Tab.Pane attached={false}>Donations</Tab.Pane> },
  { menuItem: 'Tranings', render: () => <Tab.Pane attached={false}>Tranings</Tab.Pane> },
]

const Profile = (props) => (
  <React.Fragment>
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
                  <h3>Chukwu Nonso</h3>
                  <p>{props.profile.email}</p>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid.Column>

    </Grid>
    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
  </React.Fragment>
);

export default Profile;
