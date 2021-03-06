import React, { Component } from 'react'
import ButtonFixedWidthRadiusXS from 'components/buttons/ButtonFixedWidthRadiusXS'
import PaystackButton from 'react-paystack'

// Components

import Circle from 'loaders/Circle'

// Helpers

import network from 'services/network'
import requestHandler from 'helpers/requestHandler'
import prettifyMoney from 'helpers/prettifyMoney'

const callback = (
  { id, params, token },
  stateIncrementRegistrationStage,
  getUserDetails
) => {
  return requestHandler(network.user.updateUserDetails)({
    id,
    params,
    token,
  })
    .then(() => Promise.resolve(getUserDetails(id, token)))
    .then(stateIncrementRegistrationStage)
    .catch(console.error)
}
const close = () => {}

// Data

const metadata = {}
const kobo = 100
// pk_test_29cf8e5e061acc51789cea04daaf4ca60acc6b80

// Component!!!

class AnnualDuePayment extends Component {
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
      registrationStage,
      auth: { token },
      getUserDetails,
      user: { email, id },
      stateIncrementRegistrationStage,
    } = this.props
    const { plan } = this.state

    return plan ? (
      (console.log(plan.paystack.data.plan_code),
      (
        <div className={`${registrationStage > 6 ? 'opacity-50' : ''} mr-8`}>
          <div className="registration-payment-shadow lg:w-64 lg:h-64 mb-8 p-8 flex flex-col justify-between items-center bg-white border border-pink border-solid">
            <h4 className="hind uppercase text-xs font-normal text-grey-darker">
              Annual fee
            </h4>

            <div className="">
              <b className="text-4xl py-4 font-bold text-pink-dark">
                N{prettifyMoney(plan.due)}
              </b>
            </div>
            <div className="">
              <img
                src="/static/images/credit-card-1.png"
                alt=""
                className="w-32"
              />
            </div>

            {/* <div className="mb-8 font-semibold text-grey-darker">
              <span className="mt-4 text-grey font-normal">To cover</span>
              <hr />
              cost your annual membership fee
            </div> */}
          </div>
          {registrationStage < 7 && (
            <PaystackButton
              text="Pay"
              class="flex justify-center button-fixed-width-small-radius w-32 py-3 shadow-lg text-base text-center rounded-sm bg-blue-lighter text-white hind"
              callback={() =>
                callback(
                  { id, params: { regState: 7 }, token },
                  stateIncrementRegistrationStage,
                  getUserDetails
                )
              }
              close={close}
              reference={new Date().valueOf() + ''}
              email={email}
              amount={plan.due * kobo}
              paystackkey="pk_test_29cf8e5e061acc51789cea04daaf4ca60acc6b80"
              plan={plan.paystack.data.plan_code}
              metadata={metadata}
              // plan={}
            />
          )}
        </div>
      ))
    ) : (
      <div className="flex justify-center py-6">
        <Circle text="Retrieving membership plan details. Please wait" />
      </div>
    )
  }
}

export default AnnualDuePayment
