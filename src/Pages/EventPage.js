import React from "react";
import { connect } from 'react-redux'
import { Tab, Grid, Image, Label, Segment, Card, Icon, Button } from "semantic-ui-react";
import {fetchCompletedEvent, fetchCurrentEvent} from '../actions/events'

class Events extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentEvent: this.props.currentEventList || [],
      completedEvent: this.props.completedEventList || []
    }
  }

  componentDidMount() {
    this.props.fetchCurrentEvent(this.props.user.token)
      .then(() => {
        this.setState({
          currentEvent: this.props.currentEventList
        });
      });
    this.props.fetchCompletedEvent(this.props.user.token)
      .then(() => {
        this.setState({
          completedEvent: this.props.completedEventList
        });
      });
  }

  render() {
    const currentcount = this.state.currentEvent.length
    const completedcount = this.state.completedEvent.length
    const events = this.state.currentEvent.map(jobs => (
      <Tab.Pane attached={false} key={jobs.createdAt}>
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
              <Card.Meta>{new Date(jobs.createdAt).toDateString()}</Card.Meta>
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
    ))

    const completed = this.state.completedEvent.map(jobs => (
      <Tab.Pane attached={false} key={jobs.createdAt}>
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
              <Card.Meta>{new Date(jobs.createdAt).toDateString()}</Card.Meta>
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
    ))
    const panes = [
      {
        menuItem: currentcount + " Ongoing Events",
        render: () => events

      },
      {
        menuItem: completedcount + " Completed Events",
        render: () => completed
      }
    ];
   return (
      <React.Fragment>
        <Grid>
          <div className='bana'>
            EVENTS
      </div>
        </Grid>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </React.Fragment>
    );
  }

}


const mapStateToProps = state => ({
  currentEventList: state.events.currentevent,
  completedEventList: state.events.completedevent,
  user: state.user
});

export default connect(mapStateToProps, {
  fetchCurrentEvent, fetchCompletedEvent
})(Events);
