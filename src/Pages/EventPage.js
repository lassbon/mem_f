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
    const extra= (
      <div className="ui three buttons">
        <Button size="mini">
          <Icon name="like" />
          20
        </Button>
        <Button icon="comment" size="mini" />
        <Button icon="share" size="mini" />
      </div>
    )
    const currentcount = this.state.currentEvent.length
    const completedcount = this.state.completedEvent.length
    const events = this.state.currentEvent.map((jobs, i, arr) => {
      const even = !!(i % 2)
      return even ? <Tab.Pane attached={false}>
        <Card.Group className="TimeLine">
          <Card
            image={jobs.banner}
            header={jobs.title}
            meta={jobs.date}
            description={jobs.description}
            extra={extra}
          />
          <Card
            image={arr[i - 1].banner}
            header={arr[i - 1].title}
            meta={arr[i - 1].date}
            description={arr[i - 1].description}
            extra={extra}
          />
        </Card.Group>
      </Tab.Pane> : null

    })

    const completed = this.state.completedEvent.map((jobs, i, arr) => {
      const even = !!(i % 2)
      return even ? <Tab.Pane attached={false}>
        <Card.Group className="TimeLine">
          <Card
            image={jobs.banner}
            header={jobs.title}
            meta={jobs.date}
            description={jobs.description}
            extra={extra}
          />
          <Card
            image={arr[i -1].banner}
            header={arr[i -1].title}
            meta={arr[i -1].date}
            description={arr[i -1].description}
            extra={extra}
          />
        </Card.Group>       
      </Tab.Pane> : null
    
    })
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
