import React from 'react'
import { Message } from 'semantic-ui-react'

class NotifyMessage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Message positive
          icon='checkmark'
          header="we'll get back to you as soon as your referrers confirm"
        />
      </React.Fragment>
    )
  }
}

export default NotifyMessage