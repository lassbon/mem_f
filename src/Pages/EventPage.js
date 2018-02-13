import React from 'react'
import { connect } from 'react-redux'
import { Tab, Grid, Card } from 'semantic-ui-react'
import { fetchCompletedEvent, fetchCurrentEvent } from '../actions/events'
import { Link } from 'react-router-dom'

class Events extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentEvent: this.props.currentEventList || [],
      completedEvent: this.props.completedEventList || [],
    }
  }

  componentDidMount() {
    this.props.fetchCurrentEvent(this.props.user.token).then(() => {
      this.setState({
        currentEvent: this.props.currentEventList,
      })
    })
    this.props.fetchCompletedEvent(this.props.user.token).then(() => {
      this.setState({
        completedEvent: this.props.completedEventList,
      })
    })
  }

  render() {
    // const extra = (
    //   <div className="ui three buttons">
    //     <Button size="mini">
    //       <Icon name="like" />
    //       20
    //     </Button>
    //     <Button icon="comment" size="mini" />
    //     <Button icon="share" size="mini" />
    //   </div>
    // )
    const currentcount = this.state.currentEvent.length
    const completedcount = this.state.completedEvent.length
    const currentEventCards = this.state.currentEvent.reduce((co, ev, i) => {
      co[Math.floor(i / 2)] = co[Math.floor(i / 2)] || []
      co[Math.floor(i / 2)].push(
        <Link to={`events/${ev.id}`} style={{ display: 'block' }}>
          <Card
            image={ev.banner}
            header={ev.title}
            meta={ev.date}
            description={ev.description}
          />
        </Link>
      )
      return co
    }, [])

    const completedEventCards = this.state.completedEvent.reduce(
      (co, ev, i) => {
        co[Math.floor(i / 2)] = co[Math.floor(i / 2)] || []
        co[Math.floor(i / 2)].push(
          <Link to={`events/${ev.id}`}>
            <Card
              image={ev.banner}
              header={ev.title}
              meta={ev.date}
              description={ev.description}
            />
          </Link>
        )
        return co
      },
      []
    )

    const events = currentEventCards.map(ev => (
      // <Tab.Pane attached={false}>
      <Card.Group className="TimeLine">{ev}</Card.Group>
      // {/* </Tab.Pane> */}
    ))

    const completed = completedEventCards.map(ev => (
      <Tab.Pane attached={false}>
        <Card.Group className="TimeLine">{ev}</Card.Group>
      </Tab.Pane>
    ))
    // const events = this.state.currentEvent.map((jobs, i, arr) => {
    //   const even = !!(i % 2)
    //   return even ? (
    //     <Tab.Pane attached={false}>
    //       <Card.Group className="TimeLine">
    //         <Card
    //           image={jobs.banner}
    //           header={jobs.title}
    //           meta={jobs.date}
    //           description={jobs.description}
    //           extra={extra}
    //         />
    //         <Card
    //           image={arr[i - 1].banner}
    //           header={arr[i - 1].title}
    //           meta={arr[i - 1].date}
    //           description={arr[i - 1].description}
    //           extra={extra}
    //         />
    //       </Card.Group>
    //     </Tab.Pane>
    //   ) : null
    // })

    // const completed = this.state.completedEvent.map((jobs, i, arr) => {
    //   const even = !!(i % 2)
    //   return even ? (
    //     <Tab.Pane attached={false}>
    //       <Card.Group className="TimeLine">
    //         <Card
    //           image={jobs.banner}
    //           header={jobs.title}
    //           meta={jobs.date}
    //           description={jobs.description}
    //           extra={extra}
    //         />
    //         <Card
    //           image={arr[i - 1].banner}
    //           header={arr[i - 1].title}
    //           meta={arr[i - 1].date}
    //           description={arr[i - 1].description}
    //           extra={extra}
    //         />
    //       </Card.Group>
    //     </Tab.Pane>
    //   ) : null
    // })
    const panes = [
      {
        menuItem: currentcount + ' Ongoing Events',
        render: () => events,
      },
      {
        menuItem: completedcount + ' Completed Events',
        render: () => completed,
      },
    ]
    return (
      <React.Fragment>
        <Grid>
          <div className="bana">EVENTS</div>
        </Grid>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  currentEventList: state.events.currentevent,
  completedEventList: state.events.completedevent,
  user: state.user,
})

export default connect(mapStateToProps, {
  fetchCurrentEvent,
  fetchCompletedEvent,
})(Events)
