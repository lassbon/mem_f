import React from "react";
import { Button, Message} from 'semantic-ui-react';

import Post from '../../components/Post/Post'
import Feed from '../../components/Feed/Feed'
import Timeline from '../../components/TimeLine/Timeline'

// get api
import api from '../../api'

// connect with the store
import {connect} from 'react-redux'

class Home extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      feeds:null
    };
  }

  componenetWillMount(){
    // load the feeds of the user
    const {user} = this.props
    api.timeline.feeds(user.id).then(res=>{
      console.log(res)
    })
  }

  render(){
    return (
      <React.Fragment>
        <Post />
        <Timeline></Timeline>
      </React.Fragment>
    )
  }
}

const MapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(MapStateToProps)(Home)