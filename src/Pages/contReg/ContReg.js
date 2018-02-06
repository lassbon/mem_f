import React, { Component } from 'react'
import { connect } from 'react-redux'
import { update } from '../../actions/auth'
import { Grid, Form, Button, Icon } from 'semantic-ui-react'

// import logo from '../../images/ACCIHD-LOGO.png'
import './cont.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Redirect, withRouter } from 'react-router-dom'
import { paths } from '../../data/registrationPages'

// import { contReg } from '../../actions/signupCont'

// function getSteps() {
//   return [
//     'Knowing You',
//     'Category',
//     'Details',
//     'Referrals',
//     'Reg Payment',
//     'Membership Payment',
//   ]
// }

// const BASEURL = 'http://localhost:1337/'
const BASEURL = 'https://obscure-waters-44612.herokuapp.com/'
// const BASEURL = 'https://2968008f.ngrok.io/'

// const sendDetails = (details, id) =>
//   axios.put(`${BASEURL}api/v1/user/${id}`, details, {
//     headers: {
//       'Content-Type': 'application/form-data',
//       Accept: 'application/form-data',
//     },
//   })

class ContReg extends Component {
  state = {
    annualReturn: null,
    employees: null,
    annualProfit: null,
    companyName: null,
    companyAddress: null,
    companyBusiness: null,
    companyPhone: null,
    loading: false,
  }

  handleChange = e => {
    console.log(this.state)
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = () => {
    // console.log(this.state)
    if (this.validate()) return
    this.setState({ loading: true })
    const { history, user: { id, token } } = this.props
    this.props
      .update({ regState: 1, token }, id)
      .then(() => update({ ...this.state, regState: 1, token }, id))
      .then(() => {
        this.setState({ loading: false })
        history.push({
          pathname: '/cont2',
        })
      })
      .catch(error => {
        //handle error
        console.log(error)
      })
    // this.setState({ loading: true })
  }

  validate = () => {
    // perform validation here
    console.log(Object.values(this.state))
    return Object.values(this.state).some(val => val === null)
  }

  render() {
    const { history, user, location: { pathname } } = this.props
    console.log(user)
    if (user.regState == null) return <Redirect to="/login" />
    const index = paths.indexOf(pathname)
    const regState = user.regState
    console.log('cont2', regState)
    if (regState < index) {
      return <Redirect to={paths[regState]} />
    }
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

    const AnualReturns = returns.map(annualReturn => (
      <div key={`${annualReturn} + ${annualReturn}`}>
        <Form.Field
          label={annualReturn}
          control="input"
          type="radio"
          name="annualReturn"
          value={annualReturn}
          checked={this.state.annualReturn === `${annualReturn}`}
          onChange={this.handleChange}
        />
        <br />
      </div>
    ))

    const annualProfit = returns.map(annualProfit => (
      <div key={`${annualProfit} + ${annualProfit}`}>
        <Form.Field
          label={annualProfit}
          control="input"
          type="radio"
          value={annualProfit}
          name="annualProfit"
          checked={this.state.annualProfit === `${annualProfit}`}
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
            // marginTop: '100px',
            marginBottom: 100,
          }}
        >
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
            <Form.Field style={{ width: '55%', margin: '10px auto' }}>
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
                {annualProfit}
              </Grid.Column>
            </Grid>
            <Button
              className="btn btn-reverse"
              content="Next"
              style={{ marginLeft: '40%', marginBottom: 30 }}
            />
          </Form>
        </div>
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
  connect(({ user }) => ({ user }), { update })(ContReg)
)
