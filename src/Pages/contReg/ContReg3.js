import React from 'react'
import { Grid, Segment, Form, Image, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { update } from '../../actions/auth'
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect, withRouter } from 'react-router-dom'
import { paths } from '../../data/registrationPages'

const BASEURL = 'https://obscure-waters-44612.herokuapp.com/'
// const BASEURL = 'https://2968008f.ngrok.io/'

const sendDetails = (details, id) =>
  axios.put(`${BASEURL}api/v1/user/${id}`, details, {
    headers: {
      'Content-Type': 'application/form-data',
      Accept: 'application/form-data',
    },
  })

class ContReg3 extends React.Component {
  state = {
    loading: false,
    data: {
      companyRepName1: null,
      companyRepPhone1: null,
      companyRepEmail1: null,
      companyRepPassportUrl1: null,
      companyRepName2: null,
      companyRepPhone2: null,
      companyRepEmail2: null,
      companyRepPassportUrl2: null,
      companyRepCVUrl2: null,
      companyCOIUrl: null,
    },
  }

  // handleChange1 = e => {
  //   this.setState({
  //     rep1: { ...this.state.rep1, [e.target.name]: e.target.value },
  //   })
  // }
  handleChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    })
  }

  submit = () => {
    console.log(this.state)
    if (this.validate()) return

    this.setState({ loading: true })
    const { history, user: { id, token } } = this.props
    this.props
      .update({ ...this.state.data, token, regState: 3 }, id)
      .then(() => {
        this.setState({ loading: false })
        history.push({
          pathname: '/cont4',
        })
      })

    // .catch(() => {
    //   //handle error
    //   return Promise.resolve('')
    // })
    // .then(() => {
    //   this.setState({ loading: true })
    // })

    // setTimeout(function() {
    //   window.location = '/cont4'
    // }, 3000)
  }

  validate = () => {
    // perform validation here
    console.log(Object.values(this.state.data))
    return Object.values(this.state.data).some(val => val === null)
  }

  render() {
    const { user, location: { pathname } } = this.props
    if (user.regState == null) return <Redirect to="/login" />
    const index = paths.indexOf(pathname)
    const regState = user.regState
    console.log('cont3', regState)
    if (regState < index) {
      return <Redirect to={paths[regState]} />
    }
    return (
      <React.Fragment>
        <Form
          style={{
            width: '70%',
            margin: '0 auto',
            textAlign: 'center',
            marginBottom: 50,
          }}
          loading={this.state.loading}
        >
          <h2>Company Representatives</h2>
          <Grid columns="equal">
            <Grid.Column>
              <Form.Field loading={this.state.loading}>
                <Form.Input
                  placeholder="Name"
                  name="companyRepName1"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="email"
                  placeholder="email"
                  name="companyRepEmail1"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  placeholder="Phone number"
                  name="companyRepPhone1"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>
                  Upload Passport Photographs of the Company Representative(s)
                </label>
                <Form.Input
                  type="file"
                  name="companyRepPassportUrl1"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>
                  Upload curriculum Vitae of Company Representative(s)
                </label>
                <Form.Input
                  type="file"
                  name="companyRepCVurl"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field loading={this.state.loading}>
                <Form.Input
                  placeholder="Name"
                  name="companyRepName2"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="email"
                  placeholder="email"
                  name="companyRepEmail2"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  placeholder="Phone number"
                  name="companyRepPhone2"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>
                  Upload Passport Photographs of the Company Representative(s)
                </label>
                <Form.Input
                  type="file"
                  name="companyRepPassportUrl2"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>
                  Upload curriculum Vitae of Company Representative(s)
                </label>
                <Form.Input
                  type="file"
                  name="companyCOIUrl"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Grid.Column>
          </Grid>
          <Grid centered columns={2}>
            <Grid.Column>
              <Form.Field>
                <label style={{ textAlign: 'center' }}>
                  Upload CAC document
                </label>
                <Form.Input
                  type="file"
                  name="companyRepCVUrl2"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Grid.Column>
          </Grid>
          <div style={{ marginTop: 30 }}>
            <Button to="/cont2" as={Link}>
              Back
            </Button>
            <Button className="btn" onClick={this.submit}>
              Next
            </Button>
          </div>
        </Form>
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

export default withRouter(
  connect(({ user }) => ({ user }), { update })(ContReg3)
)
