import React from "react";
import { connect } from 'react-redux';
import { Tab, Grid, Image, Label, Segment, Card, Icon, Button, List, Modal, Form } from "semantic-ui-react";
import { getForum } from "../actions/forums";

const centerText = {
  textAlign: "center"
}

class Discussions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topicInfo: '',
    };
  }


  componentDidMount() {
    this.props.getForum(this.props.match.params.name).then(() => {
      this.setState({
        topicInfo: this.props.topicDetails,
      });
    });
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { topicInfo } = this.state
    return (
      <Card.Group>
        <Card style={{ width: "100%" }}>
          <Card.Content>
            <Card.Header>{topicInfo.title}</Card.Header>
            <Card.Meta>{new Date(topicInfo.createdAt).toDateString()}</Card.Meta>
            <Card.Description>{topicInfo.content}</Card.Description>
            <Card.Content extra className="time">

              {/* <Button size="mini"
                style={{ marginLeft: '70%', marginTop: 10 }}
                onClick={() => {
                  this.likePost(post.id, i)
                }}>
                <Icon color='red' name="like" />
                Likes {post.likes ? post.likes.length : 0}
              </Button> */}

              <Button size="mini">
                <Icon name="like" color="red" />
                0 Likes
              </Button>
              <Button size="mini">comments</Button>
              {/* <Comments post={post.id} comments={post.comments} /> */}
            </Card.Content>
          </Card.Content>
        </Card>
      </Card.Group>
    )
  }
}


const mapStateToProps = state => ({
  topicDetails: state.forums.topic,
});

export default connect(mapStateToProps, {
  getForum
})(Discussions);
