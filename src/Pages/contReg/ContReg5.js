import React from 'react'
import {
  Card,
  Image,
  Grid,
  Button,
  Dimmer,
  Loader,
  Segment,
  Icon
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PaystackComponent from '../../components/PaystackComponent'
import { connect } from 'react-redux'
import axios from 'axios'

const BASEURL = 'https://obscure-waters-44612.herokuapp.com/'
// const BASEURL = 'https://2968008f.ngrok.io/'

class ContReg5 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.changeToNew = this.changeToNew.bind(this)
  }

  changeToNew() {
    const { history, user: { id, token } } = this.props
    this.setState({
      loading: true,
    })
    axios
      .put(
        `${BASEURL}api/v1/user/${id}`,
        {
          regState: 5,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        this.setState({
          loading: false,
        })
        history.push({
          pathname: '/cont6',
          state: {
            id: id,
          },
        })
      })
  }

  render() {
    const { user: { id, token, email } } = this.props
    // const { location: { state }, history } = this.props
    // console.log(this.props)
    // if (state == null || state.id == null) {
    //   history.push('/signup')
    //   return null
    // }

    return (
      <React.Fragment>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Card style={{ padding: '20px' }}>
              <Image
                style={{ marginBottom: 20 }}
                verticalAlign="middle"
                src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
              />
              <h3>
                (A registration fee is required to cover the cost of the
                verification process)
              </h3>
              <Grid.Column>Registration Fee</Grid.Column>
              <Grid.Column>
                <strong>N25,000</strong>
              </Grid.Column>
              <PaystackComponent
                
                variablename="Verfication "
                amount={2500000}
                callback={this.changeToNew}
                email={email}
                metadata={{
                  custom_fields: [
                    {
                      display_name: 'Payment For',
                      variable_name: 'registration',
                      value: 'registration',
                    },
                    {
                      display_name: 'Membership ID',
                      variable_name: 'membership_id',
                      value: id,
                    },
                  ],
                }}
              />
              {this.state.loading && (
                <Segment>
                  <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                  </Dimmer>
                </Segment>
              )}
              {/* <Button
                className="btn"
                style={{ margin: '30px auto' }}
                to="/cont6"
                as={Link}
              >
                Proceed
              </Button> */}
            </Card>
          </Grid.Column>
        </Grid>
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
export default connect(({ user }) => ({ user }))(ContReg5)
