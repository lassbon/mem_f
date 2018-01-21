import React from 'react'
import { Grid, Segment, Form, Image, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { update } from '../../actions/auth'

class ContReg4 extends React.Component {
  state = {
    loading: false,
    data: {
      referrer1: null,
      referrer2: null,
    },
    // rep1 : {
    //   id : null,
    //   email : null
    // },
    // rep2 : {
    //   id : null,
    //   email : null
    // }
  }

  handleChange1 = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    })
  }

  // handleChange2 = (e) => {
  //   this.setState({
  //   rep2 : {...this.state.rep1, [e.target.name]: e.target.value}})
  // }

  submit = () => {
    // console.log(this.state)
    console.log(this.state)
    this.setState({ loading: true })
    const { history, user: { id, token } } = this.props
    this.props.update(
      { ...this.state.data, token, regState: 4 },
      history,
      '/cont5',
      id
    )
    // .catch(() => {
    //   //handle error
    //   return Promise.resolve('')
    // })
    // .then(() => {
    //   this.setState({ loading: true })
    // })
  }

  validate = () => {
    // perform validation here
  }

  render() {
    return (

    <React.Fragment>
      <Form
        style={{ width: '70%', margin: '0 auto', textAlign: 'center', height: '100%' }}
        loading={this.state.loading}
      >
        <Image
          style={{ marginBottom: 20, marginTop: 30 }}
          verticalAlign="middle"
          src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
        />
        <h2>Please fill member id and email of two financial members</h2>
        <Grid columns="equal">
          <Grid.Column>
            <Form.Field>
              <Form.Input
                type="email"
                placeholder="email"
                name="referrer1"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="text"
                placeholder="membership id"
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Grid.Column>
              <Form.Field>
                <Form.Input
                  type="email"
                  placeholder="email"
                  name="referrer2"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="text"
                  placeholder="membership id"
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Column>
        </Grid>
        <div style={{ marginTop: 30 }}>
          <Button to="/cont3" as={Link}>
            Back
          </Button>
          <Button className="btn" onClick={this.submit}>
            Next
          </Button>
        </div>
      </Form>
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

export default connect(({ user }) => ({ user }), { update })(ContReg4)
