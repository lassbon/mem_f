import React from "react";
import { Tab, Grid, Image, Label, Segment, Card, Icon, Button } from "semantic-ui-react";



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
    menuItem: "(20) Mutual Friends",
    render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
  }
];

const Profile2 = () => (
  <React.Fragment>
    <Grid>
      <Grid.Column>
        <Segment raised>
          <Label color='orange' ribbon='right'>member id (132465789)</Label>
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
                  <p>chukwunonso@gmail.com</p>
                  <p>080123456789</p>
                  <p>Managing Director of Chukso Enterprises</p>
                </div>
                <Button size="mini" style={{marginTop: 20, background: 'var(--main-gold)', color:'var(--white)'}}>Add friend</Button>
                <span style={{marginLeft: 20, color: '#D4AF37'}}>20 Mutual Friends</span>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid.Column>

    </Grid>
    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
  </React.Fragment>
);

export default Profile2;
