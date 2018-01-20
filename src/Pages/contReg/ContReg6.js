import React from 'react'
import { Segment, Image, Grid, Button, Dimmer, Loader } from 'semantic-ui-react'
import PaystackComponent from '../../components/PaystackComponent'
import { userLoggedIn } from '../../actions/auth'
import axios from 'axios'
import { connect } from 'react-redux'

// const BASEURL = 'https://obscure-waters-44612.herokuapp.com/'
const BASEURL = 'https://2968008f.ngrok.io/'

class ContReg6 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      plan: null,
    }
    this.changeToNew = this.changeToNew.bind(this)
  }

  changeToNew() {
    const { history, user: { id, token }, userLoggedIn } = this.props
    // let token = axios.defaults.headers.common.authorization
    this.setState({
      loading: true,
    })
    axios
      .put(
        `${BASEURL}api/v1/user/${id}`,
        {
          regState: 6,
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
        localStorage.acciJWT = token
        history.push({
          pathname: '/app',
        })
      })
    // userLoggedIn({ token })
  }
  componentDidMount() {
    const { user } = this.props

    axios(`${BASEURL}api/v1/user/${user.id}`, {
      headers: {
        authorization: user.token,
      },
    })
      .then(({ data }) => {
        return Promise.all([
          data,
          axios(`${BASEURL}api/v1/levels/`, {
            headers: {
              authorization: user.token,
            },
          }),
        ])
      })
      .then(results => {
        const { membershipPlan } = results[0]
        const plans = results[1].data

        const plan = plans.find(p => {
          return p.paystack.data.plan_code
        })
        console.log(plan)
        this.setState(prevState => ({
          ...prevState,
          user: results[0],
          plan,
        }))
      })
    // axios(`${BASEURL}api/v1/levels/`, {
    //   headers: {
    //     authorization: user.token,
    //   },
    // }).then(response => {
    //   console.log(response)
    //   const plans = response.data.map(
    //     ({ description, fee, name, paystack: { data: { plan_code } } }) => ()
    //   )
    //   this.setState(prevState => ({ ...prevState, plans }))
    //   // console.log(plans)
    // })
  }

  render() {
    const { user: { id, token, email } } = this.props
    // console.log(membershipPlan)
    const { plan, user } = this.state
    plan &&
      console.log(plan.fee, plan.paystack.data.plan_code, plan.name, user.email)
    // const str = "{"
    // console.log((membershipPlan.replace(/(\\)/, ''))
    // const plan = JSON.parse)
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
            <Segment>
              <Image
                style={{ marginBottom: 20 }}
                verticalAlign="middle"
                src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
              />
              <h3
                style={{ background: '#2ECC71', color: 'white', padding: 10 }}
              >
                Your verification was successful!
              </h3>
              {(typeof plan === 'object' && plan != null) ||
              this.state.loading ? (
                <React.Fragment>
                  <h4>
                    Almost done! Make Payment for {plan.name} Membership Fee
                  </h4>
                  <Grid columns="equal">
                    <Grid.Column>
                      <h4>Membership Fee</h4>
                    </Grid.Column>
                    <Grid.Column>
                      <h4>N{plan.fee}</h4>
                    </Grid.Column>
                  </Grid>
                  <Grid columns="equal">
                    <Grid.Column>
                      <h4>Total</h4>
                    </Grid.Column>
                    <Grid.Column>
                      <h4>N{plan.fee}</h4>
                    </Grid.Column>
                  </Grid>
                  <PaystackComponent
                    variablename="Verfication "
                    email={user.email}
                    amount={`${plan.fee}00`}
                    plan={plan.paystack.data.plan_code}
                    callback={this.changeToNew}
                  />
                </React.Fragment>
              ) : (
                <Segment>
                  <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                  </Dimmer>
                </Segment>
              )}
            </Segment>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

export default connect(({ user }) => ({ user }), { userLoggedIn })(ContReg6)
