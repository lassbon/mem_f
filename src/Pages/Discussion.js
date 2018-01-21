import React from "react";
import { connect } from 'react-redux';
import { Tab, Grid, Image, Label, Segment, Card, Icon, Button, List, Modal, Form } from "semantic-ui-react";
import { Link, Redirect } from 'react-router-dom'
import { newForumTopic, getAllForums } from "../actions/forums";

const centerText = {
  textAlign: "center"
}

class Discussions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      title: '',
      creator: this.props.userId,
      topic: '1 for now',
      forumTopics: this.props.allForumTopics || []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props
      .getAllForums()
      .then((res) => this.setState({
        forumTopics: this.props.allForumTopics
      }))
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props
      .newForumTopic(this.state)
      .then((res) => console.log('kdnkdnkvdbnkjdd', res))
  }

  state = { open: false }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, size, header, content, forumTopics } = this.state
    const { match } = this.props
    return (
      <React.Fragment>
        <Grid>
          <div className='bana library'>
            DISCUSSIONS
      </div>
          <div className='sub-bana'>
            {forumTopics.length} Total Discussions
      </div>

        </Grid>
        <Button
          style={{ marginTop: 30, marginLeft: '18vw' }}
          basic color='green'
          size='tiny'
          onClick={this.show('mini')}>
          <Icon name='add circle' />start a conversation
        </Button>
        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Start conversation</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.onSubmit}>
              <Form.Field>
                <Form.Input name='title' onChange={this.onChange}></Form.Input>
              </Form.Field>
              <Form.Field>
                <Form.TextArea name='content' onChange={this.onChange}></Form.TextArea>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.onSubmit}>Submit</Button>
          </Modal.Actions>
        </Modal>
        {forumTopics.map(topics => (
          <Link to={`${match.path}/${topics.id}`} key={topics.id}>
            <Card.Group>
              <Card style={{ width: "100%" }}>
                <Card.Content>
                  <Card.Header>{topics.title}</Card.Header>
                  <Card.Meta>{new Date(topics.createdAt).toDateString()}</Card.Meta>
                  <Card.Description>{topics.content}</Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Link>
        ))}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    allForumTopics: state.forums.allTopics,
  }
}

export default connect(mapStateToProps, { newForumTopic, getAllForums })(Discussions)