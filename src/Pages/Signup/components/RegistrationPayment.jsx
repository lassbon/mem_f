import React from 'react'
import ButtonFixedWidthRadiusXS from 'components/buttons/ButtonFixedWidthRadiusXS'
import PaystackButton from 'react-paystack'

// Helpers

import network from 'services/network'
import requestHandler from 'helpers/requestHandler'

const callback = ({ params, token }, stateIncrementRegistrationStage) => {
  return requestHandler(network.general.alertReferee)({ params, token })
    .then(stateIncrementRegistrationStage)
    .catch(console.error)
}
const close = () => {}

// Data

const metadata = {}
const amount = 5000 * 100

// Component!!!

const RegistrationPayment = ({
  registrationStage,
  auth: { token },
  user: { email, id },
  stateIncrementRegistrationStage,
}) => {
  return (
    <div className={`${registrationStage > 4 ? 'opacity-50' : ''} mr-8`}>
      <div className="registration-payment-shadow lg:w-64 lg:h-64 mb-8 p-8 flex flex-col justify-between items-center bg-white border border-pink border-solid">
        <h4 className="hind uppercase text-xs font-normal text-grey-darker">
          Registration fee
        </h4>

        <div className="">
          <b className="text-4xl py-4 font-bold text-pink-dark">N5,000</b>
        </div>

        <p className="mb-8 font-semibold text-grey-darker">
          <span className="mt-4 text-grey font-normal">To cover</span>
          <br />
          cost of the verification process
        </p>
      </div>
      <PaystackButton
        disabled={registrationStage > 4 ? 'disabled' : 'false'}
        text={registrationStage > 4 ? 'Paid' : 'Pay'}
        class="flex justify-center button-fixed-width-small-radius w-32 py-3 shadow-lg text-base text-center rounded-sm bg-blue-lighter text-grey-darkest hind"
        callback={() =>
          callback(
            { params: { id, regState: 5 }, token },
            stateIncrementRegistrationStage
          )
        }
        close={close}
        reference={new Date().valueOf() + ''}
        email={email}
        amount={amount}
        paystackkey="pk_test_29cf8e5e061acc51789cea04daaf4ca60acc6b80"
        metadata={metadata}
      />
    </div>
  )
}

export default RegistrationPayment
