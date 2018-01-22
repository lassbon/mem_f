import React from 'react'
import { Link } from 'react-router-dom'
import { Message, Icon } from 'semantic-ui-react'

class CongratMessage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Message style={{width: 600, background: 'var(--main-gold)', color: 'white', margin: '0 auto', textAlign: 'center'}}>
          <Icon style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }} name="checkmark" size='big' />
          <Message.Header>
            Congratulations!!! You are now a member of ACCI.
          </Message.Header>
          <p>
            Your Membership ID is 132465789.Your certificate will be presented to you on XXXXXX
          </p>
          <Link className='btn' style={{border: '1px soild white'}} to="/app">Continue to Site</Link>
        </Message>
        
      </React.Fragment>
    )
  }
}

export default CongratMessage