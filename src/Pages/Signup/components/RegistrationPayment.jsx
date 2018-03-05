import React from 'react'
import { connect } from 'react-redux'
import ButtonFixedWidthRadiusXS from 'components/buttons/ButtonFixedWidthRadiusXS'
import PaystackButton from 'react-paystack'

// Helpers

import network from 'services/network'
import requestHandler from 'helpers/requestHandler'

const callback = (
  { params, token },
  stateIncrementRegistrationStage,
  getUserDetails
) => {
  return requestHandler(network.general.alertReferee)({ params, token })
    .then(() => Promise.resolve(stateIncrementRegistrationStage()))
    .then(() =>
      requestHandler(network.user.updateUserDetails)({
        id: params.id,
        params: { regState: 5 },
        token,
      }).then(() => getUserDetails(params.id, token))
    )
    .catch(console.error)
}
const close = () => {}

// Data

const amount = 5000 * 100

// Component!!!

const RegistrationPayment = ({
  registrationStage,
  auth: { token },
  getUserDetails,
  user: { email, id },
  stateIncrementRegistrationStage,
}) => {
  const metadata = {
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
  }
  return (
    <div className={`${registrationStage > 4 ? 'opacity-50' : ''} mr-8`}>
      <div className="registration-payment-shadow lg:w-64 lg:h-64 mb-8 p-8 flex flex-col justify-between items-center bg-white border border-pink border-solid">
        <h4 className="hind uppercase text-xs font-normal text-grey-darker">
          Registration fee
        </h4>

        <div className="">
          <b className="text-4xl py-4 font-bold text-pink-dark">N5,000</b>
        </div>

        {/* <p className="mb-8 font-semibold text-grey-darker">
          <span className="mt-4 text-grey font-normal">To cover</span>
          <br />
          cost of the verification process
        </p> */}
      </div>
      {registrationStage < 5 && <PaystackButton
        text='Pay'
        class="flex justify-center button-fixed-width-small-radius w-32 py-3 shadow-lg text-base text-center rounded-sm bg-blue-lighter text-white hind"
        callback={() =>
          callback(
            { params: { id, regState: 5 }, token },
            stateIncrementRegistrationStage,
            getUserDetails
          )
        }
        close={close}
        reference={new Date().valueOf() + ''}
        email={email}
        amount={amount}
        paystackkey="pk_test_3f720e9be8c5fe77ca5035fa439794538e42ab63"
        metadata={metadata}
      />}
    </div>
  )
}

export default RegistrationPayment
