import React from 'react'
import { Message } from 'semantic-ui-react'
import axios from 'axios';

const BASEURL = 'https://obscure-waters-44612.herokuapp.com/'

class Reject extends React.Component {
  
  componentDidMount() {
   this.sendDit()
  }

  sendDit(refereeId, id) {
    axios.delete(
      `${BASEURL}api/v1/referrer/:id/:refereeId`,
      {
        refereeId: this.props.match.params.id,
        id: this.props.match.params.user
      },
    )
  }
  render() {
    return (
      <React.Fragment>
        <Message positive
          icon='checkmark'
          header="Confirmed!!"
        />
      </React.Fragment>
    )
  }
}

export default Reject