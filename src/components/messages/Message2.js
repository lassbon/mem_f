import React from 'react'
import { Link } from 'react-router-dom'
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
        <h1 className="black_color"><Link to="/app">Continue to Site</Link></h1>
      </React.Fragment>
    )
  }
}

export default CongratMessage