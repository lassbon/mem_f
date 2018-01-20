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
      <Tab.Pane attached={false}>
        <Card.Group className="TimeLine">
          <Card style={{ width: "100%", textAlign: 'center' }}>
            <Image
                  size="big"
                  src={jobs.banner}
                />
            <Card.Content>
              <Card.Description>{jobs.date}</Card.Description><br />
              <Card.Description>
                <h3>{jobs.title}</h3>
              </Card.Description><br />
              <Card.Description>{jobs.description}</Card.Description><br />
              <Card.Description>{jobs.venue}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui three buttons">
                <Button size="mini">
                  <Icon name="like" />
                  {currentcount}
                </Button>
                <Button icon="comment" size="mini" />
                <Button icon="share" size="mini" />
              </div>
            </Card.Content>
          </Card>
        </Card.Group>          
      </Tab.Pane>
    ))

    const completed = this.state.completedEvent.map(jobs => (
      <Tab.Pane attached={false}>
        <Card.Group className="TimeLine">
          <Card style={{ width: "100%", textAlign: 'center' }}>
            <Image
              size="big"
              src={jobs.banner}
            />
            <Card.Content>
              <Card.Description>{jobs.date}</Card.Description><br />
              <Card.Description>
                <h3>{jobs.title}</h3>
              </Card.Description><br />
              <Card.Description>{jobs.description}</Card.Description><br />
              <Card.Description>{jobs.venue}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui three buttons">
                <Button size="mini">
                  <Icon name="like" />
                  {currentcount}
                </Button>
                <Button icon="comment" size="mini" />
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
