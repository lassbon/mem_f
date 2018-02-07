import React from 'react'
import { Message } from 'semantic-ui-react'
import Axios from 'axios';

class Confirm extends React.Component {
  componentDidMount() {

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