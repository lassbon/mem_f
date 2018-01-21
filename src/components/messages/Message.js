import React from 'react'
import { Message, Icon } from 'semantic-ui-react'
import RegLayout from '../RegLayout'

class RegMessage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <RegLayout>
          <div
            style={{
              minHeight: '70vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: '#D5C67A',
                color: '#fff',
                padding: '4rem',
                width: '50%',
                fontSize: '18px',
                lineHeight: '32px',
              }}
              className="encode-font"
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '3rem',
                    height: '3rem',
                    marginBottom: '1rem',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderRadius: '50%',
                  }}
                >
                  <Icon name="mail" size="large" />
                </div>
              </div>
              Please hold on while we verify you. A message with a link to
              proceed with registration will be sent to you.
            </div>
          </div>
        </RegLayout>
        {/* <Message
          positive
          icon="chat"
          header="Thank You Coelho Industries! "
          content="Please hold on while we verify you. A message with a link to proceed with registration will be sent to you."
        /> */}
      </React.Fragment>
    )
  }
}

export default RegMessage
