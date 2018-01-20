import React from 'react'
import { Grid, Segment, Form, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { update } from '../../actions/auth'
import { connect } from 'react-redux'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

// const BASEURL = 'https://obscure-waters-44612.herokuapp.com/'
const BASEURL = 'https://2968008f.ngrok.io/'

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
      companyRepCVUrl1: null,
      companyRepName2: null,
      companyRepPhone2: null,
      companyRepEmail2: null,
      companyRepPassportUrl2: null,
      companyRepCVUrl2: null,
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
    this.setState({ loading: true })
    const { history, user: { id, token } } = this.props
    this.props.update(
      { ...this.state.data, token, regState: 3 },
      history,
      '/cont4',
      id
    )

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
  }

  render() {
    return (
      <Form style={{ width: '70%', margin: '0 auto', textAlign: 'center' }}>
        <Image
          style={{ marginBottom: 20, marginTop: 30 }}
          verticalAlign="middle"
          src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
        />
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
    )
  }
}

export default connect(({ user }) => ({ user }), { update })(ContReg3)
