import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  Tab,
  Grid,
  Image,
  Label,
  Segment,
  Card,
  Icon,
  Button,
  List,
} from 'semantic-ui-react'

//api/v1/forum/post

const BASEURL = 'https://obscure-waters-44612.herokuapp.com/'

const centerText = {
  textAlign: 'center',
}

const items = [
  {
    header:
      'Abuja Chamber of Commerce and Industry (ACCI) Presents Certificate of Platinum Membership to Dangote Group on Her Special Day, 29th September, 2017',
    description: '120 replies',
    meta: 'By Chukwu Nonso, 17/10/2017',
  },
  {
    header: 'Project Report - May',
    description: '120 replies',
    meta: 'By Chukwu Nonso, 17/10/2017',
  },
  {
    header: 'Project Report - June',
    description: '120 replies',
    meta: 'By Chukwu Nonso, 17/10/2017',
  },
]

class Discussions extends Component {
  componentDidMount() {
    const { user: { token } } = this.props

    axios(`${BASEURL}api/v1/forum/post`, {
      headers: {
        authorization: token,
      },
    }).then(response => {
      console.log('discussion get', response)
    })
  }
  render() {
    return (
      <React.Fragment>
        <Grid>
          <div className="bana library">DISCUSSIONS</div>
          <div className="sub-bana">(50) Total Discussions</div>
        </Grid>
        <Button
          style={{ marginTop: 30, marginLeft: '18vw' }}
          basic
          color="green"
          size="tiny"
        >
          <Icon name="add circle" />start a conversation
        </Button>
        <Card.Group items={items} />
      </React.Fragment>
    )
  }
}

export default connect(({ user }) => ({ user }), null)(Discussions)
