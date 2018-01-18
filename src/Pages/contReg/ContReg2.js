import React, { Component } from 'react'
import { Tab, Header, Message, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button'
import { withRouter } from 'react-router-dom'

const panes = [
  {
    menuItem: 'CATEGORY A - GOLD MEMBERS',
    render: () => (
      <Tab.Pane
        style={{
          textAlign: 'center',
        }}
      >
        <Image
          style={{ marginBottom: 20, marginLeft: '10%', marginTop: 30 }}
          verticalAlign="middle"
          src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
        />
        <Message
          color="orange"
          icon="checkmark"
          header="N350,000/N50,000"
          content="recomended"
        />
        <h3>BENEFITS</h3>
        <p>Can vote and be voted for</p>
        <p>
          Advocacy roles on company’s related issues with the government
          Priority
        </p>
        <p>
          provision during all chamber’s activities/services as the case may be
        </p>
        <p>
          20 per cent discount on space participation at Annual Abuja
          International
        </p>
        <p>
          Trade Fair Glass/ Crystal Membership certificate Freebies ( Scarf,
          Cufflinks, Tie Pins, Customised Chamber’s Shirt)
        </p>
        <p>
          Direct link to company’s website from the official chamber’s webpage.
        </p>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'CATEGORY B - SILVER MEMBERS',
    render: () => (
      <Tab.Pane
        style={{
          textAlign: 'center',
        }}
      >
        <Image
          style={{ marginBottom: 20, marginLeft: '10%', marginTop: 30 }}
          verticalAlign="middle"
          src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
        />
        <Message header="N350,000/N50,000" />
        <h3>BENEFITS</h3>
        <p>Can vote and be voted for</p>
        <p>
          Advocacy roles on company’s related issues with the government
          Priority
        </p>
        <p>
          provision during all chamber’s activities/services as the case may be
        </p>
        <p>
          20 per cent discount on space participation at Annual Abuja
          International
        </p>
        <p>
          Trade Fair Glass/ Crystal Membership certificate Freebies ( Scarf,
          Cufflinks, Tie Pins, Customised Chamber’s Shirt)
        </p>
        <p>
          Direct link to company’s website from the official chamber’s webpage.
        </p>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'CATEGORY C - BRONZE MEMBERS',
    render: () => (
      <Tab.Pane
        style={{
          textAlign: 'center',
        }}
      >
        <Image
          style={{ marginBottom: 20, marginLeft: '10%', marginTop: 30 }}
          verticalAlign="middle"
          src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
        />
        <Message header="N350,000/N50,000" color="yellow" />
        <h3>BENEFITS</h3>
        <p>Can vote and be voted for</p>
        <p>
          Advocacy roles on company’s related issues with the government
          Priority
        </p>
        <p>
          provision during all chamber’s activities/services as the case may be
        </p>
        <p>
          20 per cent discount on space participation at Annual Abuja
          International
        </p>
        <p>
          Trade Fair Glass/ Crystal Membership certificate Freebies ( Scarf,
          Cufflinks, Tie Pins, Customised Chamber’s Shirt)
        </p>
        <p>
          Direct link to company’s website from the official chamber’s webpage.
        </p>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'CATEGORY D - BRASS MEMBERS',
    render: () => (
      <Tab.Pane
        style={{
          textAlign: 'center',
        }}
      >
        <Image
          style={{ marginBottom: 20, marginLeft: '10%', marginTop: 30 }}
          verticalAlign="middle"
          src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
        />
        <Message header="N350,000/N50,000" color="brown" />
        <h3>BENEFITS</h3>
        <p>Can vote and be voted for</p>
        <p>
          Advocacy roles on company’s related issues with the government
          Priority
        </p>
        <p>
          provision during all chamber’s activities/services as the case may be
        </p>
        <p>
          20 per cent discount on space participation at Annual Abuja
          International
        </p>
        <p>
          Trade Fair Glass/ Crystal Membership certificate Freebies ( Scarf,
          Cufflinks, Tie Pins, Customised Chamber’s Shirt)
        </p>
        <p>
          Direct link to company’s website from the official chamber’s webpage.
        </p>
      </Tab.Pane>
    ),
  },
]

const ContReg2 = props => {
  const { location: { state }, history } = props
  console.log(this.props)
  if (state == null || state.id == null) {
    history.push('/signup')
    return null
  }

  return (
    <div
      style={{
        width: '70%',
        margin: '0 auto',
        border: '1px solid #C0C0C0',
        minHeight: '100%',
        verticalAlign: 'middle',
        marginTop: '100px',
        marginBottom: 100,
        textAlign: 'center',
        paddingBottom: 50,
      }}
    >
      <h2 style={{ margin: 60 }}>Select a membership category</h2>
      <Tab
        menu={{ fluid: true, vertical: true, tabular: 'right' }}
        panes={panes}
      />
      <Button
        as={Link}
        to="/cont"
        style={{ marginLeft: '10%', marginTop: 50, marginRight: 30 }}
      >
        Back
      </Button>
      <Button
        as={Link}
        to={{
          pathname: '/cont3',
          state: {
            id: state.id,
          },
        }}
        className="btn"
      >
        Next
      </Button>
    </div>
  )
}

export default withRouter(ContReg2)