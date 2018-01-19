import React from "react";
import { Tab, Grid, Image, Label, Segment, Card, Icon, Button } from "semantic-ui-react";

const panes = [
  {
    menuItem: "(5) Ongoing Events",
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
            <Card.Description>Following the Chamber's, last meeting at the Chamber’s secretariat on the 11th of October. Members decide to make charity donations 10 selected orphanages in Wuse, Asokoro and Kuje</Card.Description>
            <Card.Description>
              <img
                src="https://i.imgur.com/vMOJDOk.jpg"
                alt=""
                style={{ width: "100%", marginTop: 10 }}
              />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui three buttons">
              
              <Button icon="share" size="mini" />
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    </Tab.Pane>
  },
  {
    menuItem: "(25) Completed Events",
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
            <Card.Description>Following the Chamber's, last meeting at the Chamber’s secretariat on the 11th of October. Members decide to make charity donations 10 selected orphanages in Wuse, Asokoro and Kuje</Card.Description>
            <Card.Description>
              <img
                src="https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Cute-Puppy-Wallpaper-PIC-WPD0012481.jpg"
                alt=""
                style={{ width: "100%", marginTop: 10 }}
              />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui three buttons">
              
              <Button icon="share" size="mini" />
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    </Tab.Pane>
  }
];

const Events = () => (
  <React.Fragment>
    <Grid>
      <div className='bana'>
        EVENTS
      </div>
    </Grid>
    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
  </React.Fragment>
);

export default Events;
