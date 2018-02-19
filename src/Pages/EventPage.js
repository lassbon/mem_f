import React from 'react'
import { connect } from 'react-redux'
import {
  Tab,
  Grid,
  Card,
  Button,
  Icon,
  Modal,
  Header,
  Input,
  Image,
  Form,
  Label,
  TextArea,
} from 'semantic-ui-react'
import { fetchCompletedEvent, fetchCurrentEvent } from '../actions/events'
import { Link } from 'react-router-dom'
import api from '../api'
import { toast } from 'react-toastify'

class Events extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        title: '',
        description: '',
        banner: '',
        date: '',
        venue: '',
        fee: '',
      },
      image: {
        file: '',
        imagePreviewUrl: '',
      },
      open: false,
      loading: false,
      currentEvent: this.props.currentEventList || [],
      completedEvent: this.props.completedEventList || [],
    }
  }

  state_setLoading = loading => this.setState(state => ({ ...state, loading }))

  close = () => {
    this.setState(state => ({ ...state, open: false }))
  }

  open = () => {
    this.setState(state => ({ ...state, open: true }))
  }

  handleOnChange = (e, { value, name }) => {
    this.setState(state => ({
      ...state,
      data: { ...state.data, [name.toLowerCase()]: value },
    }))
  }

  handleOnSubmit = (e, obj) => {
    const { user: { token } } = this.props
    const form = new FormData()
    form.append('file', this.state.image.file)

    if (this.validFields()) {
      this.state_setLoading(true)
      api.file
        .upload(form, token)
        .then(({ data: { bannerUrl } }) => {
          return api.events.create(
            {
              ...this.state.data,
              banner: bannerUrl,
            },
            token
          )
        })
        .then(({ data: { status } }) => {
          if (status === 200)
            toast(`${this.state.data.title} event created successfully`)
        })
        .catch(() => {
          toast(`An unexpected error occurred. Please try again.`)
        })
    }
  }

  validFields = () => {
    const { data } = this.state
    const dataArr = Object.keys(data).map(key => ({
      value: data[key],
      key: key,
    }))
    console.log(dataArr)
    return dataArr.every(field => field.value !== '')
  }

  handleEventImageChange = e => {
    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState(state => ({
        ...state,
        data: {
          ...state.data,
          banner: file,
        },
      }))
      this.setState(state => ({
        ...state,
        image: {
          file: file,
          imagePreviewUrl: reader.result,
        },
      }))
    }

    reader.readAsDataURL(file)
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
    const { open } = this.state
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
          <div className="bana">
            <h2>EVENTS</h2>
            <Modal
              style={{ display: 'none' }}
              dimmer="blurring"
              open={open}
              onClose={this.close}
              trigger={
                <Button
                  style={{ display: 'none' }}
                  onClick={this.open}
                  color="blue"
                  icon="plus"
                >
                  New Event
                </Button>
              }
            >
              <Modal.Header>New Event</Modal.Header>
              <Modal.Content image>
                <Image
                  wrapped
                  size="medium"
                  src={
                    this.state.image.imagePreviewUrl ||
                    'https://react.semantic-ui.com/assets/images/avatar/large/rachel.png'
                  }
                />
                <Modal.Description>
                  <Form loading={this.state.loading}>
                    <Form.Input
                      onChange={this.handleEventImageChange}
                      name="banner"
                      label="Event banner"
                      type="file"
                      required
                    />
                    <Form.Input
                      onChange={this.handleOnChange}
                      name="title"
                      label="Title"
                      type="text"
                      required
                    />
                    <Form.Input
                      onChange={this.handleOnChange}
                      name="date"
                      label="Date"
                      type="date"
                      required
                    />
                    <Form.Input
                      onChange={this.handleOnChange}
                      name="venue"
                      label="Venue"
                      type="text"
                      required
                    />

                    <Form.Field>
                      <label>Fee</label>
                      <Input
                        onChange={this.handleOnChange}
                        label={{ basic: true, content: 'N' }}
                        labelPosition="left"
                        type="number"
                        name="fee"
                        placeholder="0"
                      />
                    </Form.Field>
                    <div>
                      <span>Description</span>
                      <TextArea
                        name="description"
                        onChange={this.handleOnChange}
                        placeholder="Description"
                        required
                      />
                    </div>
                    {/* <Form.Input label="Title" type="text" /> */}
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color="black" onClick={this.close}>
                  Cancel
                </Button>
                <Button
                  positive
                  icon="checkmark"
                  labelPosition="right"
                  content="Submit"
                  onClick={this.handleOnSubmit}
                />
              </Modal.Actions>
            </Modal>
          </div>
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
