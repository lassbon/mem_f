import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Icon, TextArea } from 'semantic-ui-react'
import { getEvents } from '../actions/events'
import api from '../api'

class EventDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topicInfo: '',
      data: {
        comment: '',
      },
    }
  }

  componentDidMount() {
    // console.log("props", this.props)
    this.props.getEvents(this.props.match.params.id).then(data => {
      console.log('data', this.props.topicDetails)
      this.setState({
        topicInfo: this.props.topicDetails.events,
      })
    })
    console.log(api.events)
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  likeEvent = () => {
    const { id } = this.state.topicInfo
    const { id: liker, token } = this.props.user
    api.events
      .like(
        {
          liker,
          id,
        },
        token
      )
      .then(res => console.log('event like', res))
      .catch(res => console.error('event error', res))
  }

  handleCommentTextAreaOnChange = (e, { value: comment }) => {
    console.log(comment)
    this.setState(state => ({ ...state, data: { ...state.data, comment } }))
  }

  makeComment = () => {
    const { id: owner, token } = this.props.user
    const { data: { comment }, topicInfo: { id } } = this.state
    api.events
      .makeComment({ comment: comment, owner, event: id }, token)
      .then(res => console.log('make comment', res))
      .catch(err => console.error('make comment', err))
  }

  render() {
    const { topicInfo } = this.state
    console.log('topciInfo', topicInfo)
    return (
      topicInfo && (
        <div
          style={{
            // width: '50%',
            // border: '1px solid #aaa',
            backgroundColor: '#fff',
            boxShadow: '2px 2px 15px rgba(0,0,0,0.1)',
            padding: '2rem',
          }}
        >
          <div
            style={{
              display: 'flex',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '60%',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                }}
              >
                <h3
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'rgba(0,0,0,0.74)',
                    color: '#fff',
                  }}
                >
                  {topicInfo.title}
                </h3>
              </div>
              <figure
                style={{
                  margin: '0px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '210px',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    style={{
                      height: 'auto',
                      width: '100%',
                    }}
                    src={topicInfo.banner}
                    alt=""
                  />
                </div>
                <figcaption
                  style={{
                    padding: '1rem',
                  }}
                >
                  <p>{topicInfo.description}</p>
                  <Button onClick={this.likeEvent} size="mini">
                    <Icon color="red" name="like" /> likes{' '}
                    {topicInfo.likes.length}
                  </Button>
                  <Button icon="comment" size="mini">
                    Comments 0
                  </Button>
                </figcaption>
                <TextArea
                  onChange={this.handleCommentTextAreaOnChange}
                  placeholder="Comment"
                  style={{ width: '100%', padding: '1rem' }}
                />
                <Button onClick={this.makeComment} positive>
                  Make comment
                </Button>
              </figure>
            </div>

            <div
              style={{
                paddingLeft: '2rem',
                width: '40%',
              }}
            >
              <div>
                <h4
                  style={{
                    backgroundColor: '#e6e6e6',
                    color: '#444',
                    // marginBottom: '1rem',
                    padding: '0.45rem 1rem',
                  }}
                >
                  Details
                </h4>
              </div>
              <div
                style={{
                  backgroundColor: '#f8f8f8',
                  // boxShadow: '1px 1px 8px rgba(0,0,0,0.1)',
                  padding: '0.75rem 1rem 0.25rem',
                }}
              >
                <div
                  style={{
                    borderBottom: '1px solid #e6e6e6',
                    marginBottom: '0.75rem',
                    paddingBottom: '0.75rem',
                  }}
                >
                  <h5
                    style={{
                      fontWeight: 900,
                      margin: '0px',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Start:
                  </h5>
                  <p
                    style={{
                      color: '#656565',
                    }}
                  >
                    {' '}
                    on {new Date(topicInfo.date).toDateString()}
                  </p>
                </div>
                <div
                  style={{
                    borderBottom: '1px solid #e6e6e6',
                    marginBottom: '0.75rem',
                    paddingBottom: '0.75rem',
                  }}
                >
                  <h5
                    style={{
                      fontWeight: 900,
                      margin: '0px',
                      marginBottom: '0.5rem',
                    }}
                  >
                    End:
                  </h5>
                  <p
                    style={{
                      color: '#656565',
                    }}
                  >
                    {' '}
                    on {new Date(topicInfo.date).toDateString()}
                    {/* {topicInfo.date} */}
                  </p>
                </div>
                <div
                  style={{
                    borderBottom: '1px solid #e6e6e6',
                    marginBottom: '0.75rem',
                    paddingBottom: '0.75rem',
                  }}
                >
                  <h5
                    style={{
                      fontWeight: 900,
                      margin: '0px',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Venue:
                  </h5>
                  <p
                    style={{
                      color: '#656565',
                    }}
                  >
                    {' '}
                    {topicInfo.venue}
                  </p>
                </div>
                <div
                  style={{
                    borderBottom: '1px solid #e6e6e6',
                    marginBottom: '0.75rem',
                    paddingBottom: '0.75rem',
                  }}
                >
                  <h5
                    style={{
                      fontWeight: 900,
                      margin: '0px',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Organizer:
                  </h5>
                  <p
                    style={{
                      color: '#656565',
                    }}
                  >
                    {' '}
                    Abuja Chamber of commerce and Industry
                  </p>
                </div>
                <div
                  style={{
                    borderBottom: '1px solid #e6e6e6',
                    marginBottom: '0.75rem',
                    paddingBottom: '0.75rem',
                  }}
                >
                  <h5
                    style={{
                      fontWeight: 900,
                      margin: '0px',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Cost:
                  </h5>
                  <p>{topicInfo.fee}</p>
                </div>
                {/* <div>
                <a
                  style={{
                    backgroundColor: "#9c1b4f",
                    borderRadius: "5px",
                    color: "#fff",
                    display: "block",
                    marginBottom: "0.5rem",
                    padding: "0.5rem 1rem",
                    textAlign: "center"
                  }}
                >
                  Register
                </a>
                <a
                  style={{
                    backgroundColor: "#d5c67a",
                    borderRadius: "5px",
                    color: "#fff",
                    display: "block",
                    marginBottom: "0.5rem",
                    padding: "0.5rem 1rem",
                    textAlign: "center"
                  }}
                >
                  Book on hold
                </a>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      )
    )
  }
}

const mapStateToProps = state => ({
  topicDetails: state.events,
  user: state.user,
})

export default connect(mapStateToProps, {
  getEvents,
})(EventDetails)
