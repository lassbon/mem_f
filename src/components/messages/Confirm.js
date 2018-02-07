import React from 'react'
import { Message } from 'semantic-ui-react'

class Confirm extends React.Component {
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