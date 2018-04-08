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
const callback = (
  getUserDetails,
  history,
  stateIncrementRegistrationStage,
  { companyName, id, membershipId, token }
) => {
  const emailSubmitPopupContent = document.createElement('div')
  emailSubmitPopupContent.setAttribute(
    'class',
    'text-sm text-grey-darker text-left'
  )
  emailSubmitPopupContent.innerHTML = `\nCongratulations ${companyName} you are now a member of Test AirBevy organization. Your Membership ID is ${membershipId}`

  requestHandler(network.user.updateUserDetails)({
    id,
    params: { // for demo
      regState: 8,
      approved: true,
      verified: true,
      membershipDue: "paid",
      membershipFee: "paid",
      membershipStatus: "active",
      referred1: true,
      referred2: true,
      registrationFee: "paid",
      dueDate: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()+1}` 
    },
    //params: { regState: 8 },
    token,
  })
    .then(() => getUserDetails(id, token))

    .then(() => {
      stateIncrementRegistrationStage()
      return swal({
        content: emailSubmitPopupContent,
        title: 'Registered',
        icon: 'success',
        button: {
          text: 'ok',
        },
      })
    })
    .then(() => history.push('/app/timeline'))
}

// Data

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
      getUserDetails,
      user: { companyName, email, id, membershipId },
      stateIncrementRegistrationStage,
    } = this.props
    const { plan } = this.state
    const metadata = {
      custom_fields: [
        {
          display_name: 'Payment For',

          variable_name: 'membership',

          value: 'membership',
        },
        {
          display_name: 'Membership ID',

          variable_name: 'membership_id',

          value: id,
        },
      ],
    }
    return plan ? (
      <div className={`${registrationStage > 7 ? 'opacity-50' : ''} mr-8`}>
        <div className="registration-payment-shadow lg:w-64 lg:h-64 mb-8 p-8 flex flex-col justify-between items-center bg-white border border-pink border-solid">
          <h4 className="hind uppercase text-xs font-normal text-grey-darker">
            Membership fee
          </h4>

          <div className="">
            <b className="text-4xl py-4 font-bold text-pink-dark">
              N{prettifyMoney(plan.fee)}
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
            cost of your membership plan
          </div> */}
        </div>
        {registrationStage < 8 && (
          <PaystackButton
            text="Pay"
            class="flex justify-center button-fixed-width-small-radius w-32 py-3 shadow-lg text-base text-center rounded-sm bg-blue-lighter text-white hind"
            callback={() =>
              callback(
                getUserDetails,
                history,
                stateIncrementRegistrationStage,
                {
                  companyName,
                  id,
                  membershipId,
                  token,
                }
              )
            }
            close={close}
            reference={new Date().valueOf() + ''}
            email={email}
            amount={plan.fee * kobo}
            paystackkey="pk_test_29cf8e5e061acc51789cea04daaf4ca60acc6b80"
            metadata={metadata}
            // plan={}
          />
        )}
      </div>
    ) : (
      <div className="flex justify-center py-6">
        <Circle text="Retrieving membership plan details. Please wait" />
      </div>
    )
  }
}

export default withRouter(MemberShipPayment)
