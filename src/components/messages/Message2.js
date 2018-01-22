import React from 'react'
import { Message } from 'semantic-ui-react'

class CongratMessage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Message positive
          icon='checkmark'
          header='Congratulations!!! You are now a member of ACCI'
          content=' Your Membership ID is XXXXXX.Your certificate will be presented to you on XXXXXX'
        />
      </React.Fragment>
    )
  }
}

export default CongratMessage