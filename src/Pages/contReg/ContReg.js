import React, { Component } from 'react'
import { connect } from 'react-redux'
import { update } from '../../actions/auth'
import {
  Container,
  Grid,
  Image,
  Segment,
  Form,
  Button,
  Icon
} from 'semantic-ui-react'

import logo from '../../images/ACCIHD-LOGO.png'
import './cont.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { contReg } from '../../actions/signupCont'

function getSteps() {
  return [
    'Knowing You',
    'Category',
    'Details',
    'Referrals',
    'Reg Payment',
    'Membership Payment',
  ]
}

// const BASEURL = 'http://localhost:1337/'
const BASEURL = 'https://obscure-waters-44612.herokuapp.com/'
// const BASEURL = 'https://2968008f.ngrok.io/'

const sendDetails = (details, id) =>
  axios.put(`${BASEURL}api/v1/user/${id}`, details, {
    headers: {
      'Content-Type': 'application/form-data',
      Accept: 'application/form-data',
    },
  })

class ContReg extends Component {
  state = {
    aReturn: null,
    employees: null,
    profits: null,
    companyName: null,
    companyAddress: null,
    companyBusiness: null,
    companyPhone: null,
    loading: false,
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = () => {
    // console.log(this.state)
    this.setState({ loading: true })
    const { history, user: { id, token } } = this.props
    this.props
      .update({ ...this.state, regState: 1, token }, history, '/cont2', id)
      .catch(() => {
        //handle error
        return Promise.resolve('')
      })
      .then(() => {
        this.setState({ loading: true })
      })
    this.setState({ loading: true })
  }

  validate = () => {
    // perform validation here
  }

  render() {
    // const { location: { state }, history } = this.props
    // console.log(this.props)
    // if (state == null || state.id == null) {
    //   history.push('/signup')
    //   return null
    // }
    const employies = [
      '1 - 10',
      '11 - 20',
      '21 - 40',
      '41 - 80',
      '81 - 100',
      '100 and above',
    ]

    const returns = [
      'N100,000 - N500,000',
      'N501,000 - N1,000,000',
      'N1,000,001 - N3,000,000',
      'N3,000,001 - N5,000,000',
      'N5,000,001 - N10,000,000',
      'N100,000,001 and above',
    ]

    const NumOfEmployees = employies.map(num => (
      <div key={`${num} + ${num}`}>
        <Form.Field
          label={num}
          control="input"
          type="radio"
          name="employees"
          value={num}
          checked={this.state.employees === `${num}`}
          onChange={this.handleChange}
        />
        <br />
      </div>
    ))

    const AnualReturns = returns.map(aReturn => (
      <div key={`${aReturn} + ${aReturn}`}>
        <Form.Field
          label={aReturn}
          control="input"
          type="radio"
          name="aReturn"
          value={aReturn}
          checked={this.state.aReturn === `${aReturn}`}
          onChange={this.handleChange}
        />
        <br />
      </div>
    ))

    const AnualProfits = returns.map(aProfit => (
      <div key={`${aProfit} + ${aProfit}`}>
        <Form.Field
          label={aProfit}
          control="input"
          type="radio"
          value={aProfit}
          name="profits"
          checked={this.state.profits === `${aProfit}`}
          onChange={this.handleChange}
        />
        <br />
      </div>
    ))

    return (
      <React.Fragment>
      <div
        style={{
          width: '70%',
          margin: '0 auto',
          border: '1px solid #C0C0C0',
          minHeight: '100%',
          verticalAlign: 'middle',
          marginTop: '100px',
          marginBottom: 100,
        }}
      >
        <Image
          style={{ marginBottom: 20, marginLeft: '36%', marginTop: 30 }}
          verticalAlign="middle"
          src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
        />
        <Form
          style={{ marginTop: 30 }}
          onSubmit={this.onSubmit}
          loading={this.state.loading}
        >
          <Form.Field style={{ width: '55%', margin: '10px auto' }}>
            <input
              placeholder="Company's Name"
              name="companyName"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field style={{ width: '55%', margin: '10px auto' }}>
            <input
              placeholder="Address"
              name="companyAddress"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field style={{ width: '55%', margin: '10px auto' }}>
            <input
              placeholder="Phone Number"
              name="companyPhone"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field
            style={{ width: '55%', margin: '10px auto', marginBottom: 50 }}
          >
            <input
              placeholder="Nature of buisness"
              name="companyBusiness"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Grid style={{ width: '90%', margin: '0 auto' }}>
            <Grid.Column width={5}>
              <h3 style={{ color: '#656768' }}>Number of Employees</h3>
              {NumOfEmployees}
            </Grid.Column>
            <Grid.Column width={6}>
              <h3 style={{ color: '#656768' }}>Annual Return</h3>
              {AnualReturns}
            </Grid.Column>
            <Grid.Column width={5}>
              <h3 style={{ color: '#656768' }}>Annual Profits</h3>
              {AnualProfits}
            </Grid.Column>
          </Grid>
          <Button
            className="btn btn-reverse"
            content="Next"
            style={{ marginLeft: '40%', marginBottom: 30 }}
          />
        </Form>
      </div>
      <Grid style={{ background: "#34495E", textAlign: "center" }}>
        <Grid.Column width="5">
          <h2 style={{ color: '#D5C67A', fontSize: '50px' }}>3215</h2>
          <h3 style={{ color: 'white', marginTop: 5 }}>Registered Members</h3>
        </Grid.Column>
        <Grid.Column width="6" verticalAlign='middle'>
          <Icon name="facebook square" size='big' style={{ color: 'white' }} />
          <Icon name="linkedin" size='big' style={{ color: 'white' }} />
          <Icon name="twitter" size='big' style={{ color: 'white' }} />
        </Grid.Column>
        <Grid.Column width="5">
          <h3 style={{ color: 'white' }}>Links</h3>
          <Link to='#' style={{ marginRight: 10 }}>ACCI website</Link>
          <Link to='#' style={{ marginRight: 10 }}>Membership Directory</Link>
          <Link to='#' style={{ marginRight: 10 }}>ACCI Events</Link>
          <Link to='#' style={{ marginRight: 10 }}>Shop on ACCI</Link>
        </Grid.Column>
      </Grid>
      <footer style={{ verticalAlign: 'middle', background: 'white', color: '#656768', textAlign: 'center', padding: '10px', fontWeight: 'bold' }}>
        Copyright © 2017 Abuja Chamber of Commerce & Industry
        </footer>
      </React.Fragment>
    )
  }
}

export default withRouter(
  connect(({ user }) => ({ user }), { update })(ContReg)
)
