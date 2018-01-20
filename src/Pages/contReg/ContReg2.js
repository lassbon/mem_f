import React, { Component } from 'react'
import {
  Tab,
  Header,
  Message,
  Image,
  Dimmer,
  Loader,
  Segment,
  Divider,
  Card,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

// const BASEURL = 'https://obscure-waters-44612.herokuapp.com/'
const BASEURL = 'https://2968008f.ngrok.io/'

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
          textAlign: 'left',
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

const state = { activeIndex: 0 }

class ContReg2 extends Component {
  state = {
    plans: [],
  }
  componentDidMount() {
    const { user } = this.props
    axios(`${BASEURL}api/v1/levels/`, {
      headers: {
        authorization: user.token,
      },
    }).then(response => {
      console.log(response)
      const plans = response.data.map(
        ({ description, fee, name, paystack: { data: { plan_code } } }) => ({
          render: () => (
            <Card
              fluid
              raised={true}
              header="Option 1"
              style={{ padding: '4rem' }}
            >
              <Header as="h1" style={{ textTransform: 'capitalize' }}>
                {description.replace('<br>', '')}
              </Header>
              <Divider />
              {/* <Header as="h3">{fee}</Header> */}
              <Message header={fee} />
              <h3>BENEFITS</h3>
              <p>Can vote and be voted for</p>
              <p>
                Advocacy roles on company’s related issues with the government
                Priority
              </p>
              <p>
                provision during all chamber’s activities/services as the case
                may be
              </p>
              <p>
                20 per cent discount on space participation at Annual Abuja
                International
              </p>
              <p>
                Trade Fair Glass/ Crystal Membership certificate Freebies (
                Scarf, Cufflinks, Tie Pins, Customised Chamber’s Shirt)
              </p>
              <p>
                Direct link to company’s website from the official chamber’s
                webpage.
              </p>
            </Card>
          ),
          menuItem: name,
          plan_code,
          description,
          fee,
          name,
        })
      )
      this.setState(prevState => ({ ...prevState, plans }))
      // console.log(plans)
    })

    // this.setState()
  }
  render() {
    const { history, user } = this.props
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
          textAlign: 'left',
          paddingBottom: 50,
        }}
      >
        <h2 style={{ margin: 60, textAlign: 'center' }}>
          Select a membership category
        </h2>
        {this.state.plans.length ? (
          <Tab
            menu={{ fluid: true, vertical: true, tabular: 'right' }}
            panes={this.state.plans}
            onTabChange={(change, { activeIndex }) => {
              state.activeIndex = activeIndex
              console.log(state)
            }}
          />
        ) : (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </Segment>
        )}
        {/* <Button
          as={Link}
          to="/cont"
          style={{ marginLeft: '10%', marginTop: 50, marginRight: 30 }}
        >
          Back
        </Button> */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <Button
            // as={Link}
            // to={{
            //   pathname: '/cont3',
            //   state: {
            //     id: 'state.id',
            //   },
            // }}
            onClick={() => {
              axios
                .put(
                  `${BASEURL}api/v1/user/${user.id}`,
                  {
                    membershipPlan: this.state.plans[state.activeIndex]
                      .plan_code,
                    //   fee: this.state.plans[state.activeIndex].fee,
                    //   name: this.state.plans[state.activeIndex].name,
                    //   description: this.state.plans[state.activeIndex]
                    //     .description,
                    // },
                    regState: 2,
                  },
                  {
                    headers: {
                      authorization: user.token,
                      'Content-Type': 'application/form-data',
                      Accept: 'application/form-data',
                    },
                  }
                )
                .then(() => {
                  history.push({
                    pathname: '/cont3',
                    state: {
                      id: 'state.id',
                    },
                  })
                })
                .catch(console.log)
            }}
            className="btn"
          >
            Next
          </Button>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(({ user }) => ({ user }))(ContReg2))
