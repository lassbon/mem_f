import React from 'react'
import { Link } from 'react-router-dom'
import RegLayout from '../../components/RegLayout';
import { Container, Header, Form, Grid, Button, Icon } from 'semantic-ui-react'

class OldMembers extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    fetch('https://randomuser.me/api/?results=50&nat=us,dk,fr,gb')
      .then(res => res.json())
      .then(parsedJSON => parsedJSON.results.map(user => (
        {
          companyName: `${user.login.username}`,
          email: `${user.email}`,
          membershipId: `${user.id.value}`,
          membershipPlan: `gold`,
          companyPhone: `${user.phone}`
        }
      )))
      .then(data => this.setState({ data }))
      .catch(error => console.error('pasered failed'))
  }

  onSubmit = () => {
    // console.log(this.state)
    this.setState({ loading: true })
    const { history, user: { id, token } } = this.props
    this.props
      .update({ ...this.state, token }, history, '/old2', id)
      .catch(() => {
        //handle error
        return Promise.resolve('')
      })
      .then(() => {
        this.setState({ loading: true })
      })
    this.setState({ loading: true })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            width: '70%',
            margin: '0 auto',
            border: '1px solid #C0C0C0',
            // minHeight: '100%',
            verticalAlign: 'middle',
            // marginTop: '100px',
            marginBottom: 100,
          }}
        >
          <Form
            style={{ marginTop: 30 }}
            onSubmit={this.onSubmit}
          // loading={this.state.loading}
          >
            <Form.Field style={{ width: '55%', margin: '10px auto' }}>
              <input
                placeholder="Company's Name"
                name="companyName"
                disabled
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field style={{ width: '55%', margin: '10px auto' }}>
              <input
                placeholder="Membership Id"
                name="membershipId"
                disabled
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field style={{ width: '55%', margin: '10px auto' }}>
              <input
                placeholder="Membership Type"
                name="membershipPlan"
                disabled
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field
              style={{ width: '55%', margin: '10px auto' }}
            >
              <input
                placeholder="Email"
                type="email"
                disabled
                name="email"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field
              style={{ width: '55%', margin: '10px auto', marginBottom: 50 }}
            >
              <input
                type='text'
                placeholder="Phone number"
                name="companyPhone"
                onChange={this.handleChange}
              />
            </Form.Field>

            <Button
              className="btn btn-reverse"
              content="Next"
              style={{ marginLeft: '40%', marginBottom: 30 }}
            />
          </Form>
        </div>

        {/*========================================== footer======================== */}

        <Grid style={{ background: '#34495E', textAlign: 'center' }}>
          <Grid.Column width="5">
            <h2 style={{ color: '#D5C67A', fontSize: '50px' }}>3215</h2>
            <h3 style={{ color: 'white', marginTop: 5 }}>Registered Members</h3>
          </Grid.Column>
          <Grid.Column width="6" verticalAlign="middle">
            <Icon
              name="facebook square"
              size="big"
              style={{ color: 'white' }}
            />
            <Icon name="linkedin" size="big" style={{ color: 'white' }} />
            <Icon name="twitter" size="big" style={{ color: 'white' }} />
          </Grid.Column>
          <Grid.Column width="5">
            <h3 style={{ color: 'white' }}>Links</h3>
            <Link to="#" style={{ marginRight: 10 }}>
              ACCI website
            </Link>
            <Link to="#" style={{ marginRight: 10 }}>
              Membership Directory
            </Link>
            <Link to="#" style={{ marginRight: 10 }}>
              ACCI Events
            </Link>
            <Link to="#" style={{ marginRight: 10 }}>
              Shop on ACCI
            </Link>
          </Grid.Column>
        </Grid>
        <footer
          style={{
            verticalAlign: 'middle',
            background: 'white',
            color: '#656768',
            textAlign: 'center',
            padding: '10px',
            fontWeight: 'bold',
          }}
        >
          Copyright © 2017 Abuja Chamber of Commerce & Industry
        </footer>
      </React.Fragment>
    )
  }
}
export default OldMembers