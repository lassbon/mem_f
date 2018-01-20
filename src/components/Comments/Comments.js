import React, { Component } from 'react'
import { Button, Divider, Image, Transition, Comment, Icon, Form, Label } from 'semantic-ui-react'

export default class Comments extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state

    return (
      <React.Fragment>
        <Button as='div' labelPosition='right'>
          
          <Button
            basic color='blue'
            content={visible ? 'Hide' : 'Show'} onClick={this.toggleVisibility}
            size="mini"
          >
            <Icon name='comment' />
            comment
          </Button>
          <Label as='a' basic color='blue' pointing='left'>2,048</Label>
        </Button>
        <Divider hidden />
        <Transition visible={visible} animation='slide down' duration={500}>
          <Comment.Group>
            <Comment>
              <Comment.Avatar src='http://www.kinyu-z.net/data/wallpapers/39/836521.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>Matt</Comment.Author>
                <Comment.Metadata>
                  <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>How artistic!</Comment.Text>
              </Comment.Content>
            </Comment>
            <Comment>
              <Comment.Avatar src='https://data.whicdn.com/images/249133921/original.gif' />
              <Comment.Content>
                <Comment.Author as='a'>Someone</Comment.Author>
                <Comment.Metadata>
                  <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>How artistic!</Comment.Text>
              </Comment.Content>
            </Comment>
            <Form reply>
              <Form.TextArea autoHeight rows={2} placeholder='leave a comment...' />
              <Button content='Add Reply' size='tiny' labelPosition='left' icon='edit' primary />
            </Form>
          </Comment.Group>
        </Transition>
      </React.Fragment>
    )
  }
}
