import React from 'react'
import { Message } from 'semantic-ui-react'
import axios from 'axios';

const BASEURL = 'https://obscure-waters-44612.herokuapp.com/'

class Confirm extends React.Component {
  
  componentDidMount() {
   this.sendDit()
  }

  sendDit(refereeId, id) {
    axios.post(
      `${BASEURL}api/v1/referrer`,
      {
        refereeId: this.props.match.params.user,
        id: this.props.match.params.id
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

export default Confirm