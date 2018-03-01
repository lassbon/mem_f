import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ButtonFixedWidthRadiusXS from 'components/buttons/ButtonFixedWidthRadiusXS'
import PaystackButton from 'react-paystack'
import swal from 'sweetalert'

// Components

import Circle from 'loaders/Circle'

// Helpers

import network from 'services/network'
import requestHandler from 'helpers/requestHandler'
import prettifyMoney from 'helpers/prettifyMoney'

const close = () => {}
const callback = (history, stateIncrementRegistrationStage) => {
  stateIncrementRegistrationStage()
  return swal({
    text: `Thank you for completing the registration process. Click 'ok' to continue`,
    title: 'Welcome',
    icon: 'success',
    button: {
      text: 'ok',
    },
  }).then(() => history.push('/app/timeline'))
}

// Data

const metadata = {}
const kobo = 100

// Component!!!

class MemberShipPayment extends Component {
  state = {
    plan: null,
  }
  stateSetPlan = plan => this.setState(state => ({ ...state, plan }))
  componentDidMount() {
    const { user: { membershipPlan }, auth: { token } } = this.props
    requestHandler(network.general.fetchMembershipLevels)({ token })
      .then(plans =>
        Promise.resolve(
          plans.find(
            ({ name }) => name.toUpperCase() === membershipPlan.toUpperCase()
          )
        )
      )
      .then(this.stateSetPlan)
  }
  render() {
    const {
      history,
      registrationStage,
      auth: { token },
      user: { email, id },
      stateIncrementRegistrationStage,
    } = this.props
    const { plan } = this.state
    return plan ? (
      <div className={`${registrationStage > 6 ? 'opacity-50' : ''} mr-8`}>
        <div className="registration-payment-shadow lg:w-64 lg:h-64 mb-8 p-8 flex flex-col justify-between items-center bg-white border border-pink border-solid">
          <h4 className="hind uppercase text-xs font-normal text-grey-darker">
            Annual fee
          </h4>

          <div className="">
            <b className="text-4xl py-4 font-bold text-pink-dark">
              N{prettifyMoney(plan.fee)}
            </b>
          </div>

          <div className="mb-8 font-semibold text-grey-darker">
            <span className="mt-4 text-grey font-normal">To cover</span>
            <hr />
            cost of your membership plan
          </div>
        </div>
        <PaystackButton
          disabled={registrationStage > 6 ? 'disabled' : 'false'}
          text={registrationStage > 6 ? 'Paid' : 'Pay'}
          class="flex justify-center button-fixed-width-small-radius w-32 py-3 shadow-lg text-base text-center rounded-sm bg-blue-lighter text-grey-darkest hind"
          callback={() => callback(history, stateIncrementRegistrationStage)}
          close={close}
          reference={new Date().valueOf() + ''}
          email={email}
          amount={plan.fee * kobo}
          paystackkey="pk_test_29cf8e5e061acc51789cea04daaf4ca60acc6b80"
          metadata={metadata}
          // plan={}
        />
      </div>
    ) : (
      <div className="flex justify-center py-6">
        <Circle text="Retrieving membership plan details. Please wait" />
      </div>
    )
  }
}

export default withRouter(MemberShipPayment)
