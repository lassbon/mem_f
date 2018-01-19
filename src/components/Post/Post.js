import React from 'react'
import axios from 'axios'
import {
  Card,
  Grid,
  Image,
  Form,
  TextArea,
  Button,
  Input,
} from 'semantic-ui-react'

import api from '../../api'
import { connect } from 'react-redux'
import Timelines from '../TimeLine/Timeline'

import './Post.css'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'

class PostStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = { items: [], text: '', file: '', imagePreviewUrl: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const newItem = {
      postText: this.state.text,
      owner: this.props.currentUser.id,
      postImage: this.state.file,
      // id: Date.now()
    }

    api.timeline.makepost(newItem, this.props.currentUser.token).then(res => {
      console.log(res)
    })

    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: '',
    }))
  }
  handleImageChange(e) {
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      })
    }

    reader.readAsDataURL(file)
  }

  render() {
    let { imagePreviewUrl } = this.state
    let $imagePreview = null
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />
    } else {
      $imagePreview = <p className="file-return" />
    }
    return (
      <React.Fragment>
        <Card className="post">
          <Grid>
            <Grid.Column width={2}>
              <Image
                size="tiny"
                circular
                src="https://cdn-images-1.medium.com/fit/c/100/100/1*sJE5hPC1KeMj1o4_bH2jXA.jpeg"
              />
            </Grid.Column>
            <Grid.Column width={13}>
              <Form onSubmit={this.handleSubmit}>
                <TextArea
                  autoHeight
                  placeholder="update status..."
                  onChange={this.handleChange}
                  value={this.state.text}
                />

                <Grid.Column className="post-left">
                  <label className="fileContainer">
                    <Icon name="camera" />
                    <input
                      type="file"
                      id="input-file"
                      onChange={e => this.handleImageChange(e)}
                    />
                  </label>
                  <Button
                    content="Post"
                    style={{
                      background: '#34495E',
                      color: '#FFFFFF',
                      marginLeft: 5,
                    }}
                    size="mini"
                  />
                </Grid.Column>
                {$imagePreview}
              </Form>
            </Grid.Column>
          </Grid>
        </Card>
        <Timelines items={this.state.items} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { user } = state
  return {
    currentUser: user,
  }
}

export default connect(mapStateToProps)(PostStatus)
