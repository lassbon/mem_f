import React from 'react'
import {Message} from 'semantic-ui-react'

class RegMessage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Message positive
          icon='chat'
          header='Thank You Coelho Industries! '
          content='Please hold on while we verify you. A message with a link to proceed with registration will be sent to you.'
        />
      </React.Fragment>
    )
  }
}

export default RegMessage