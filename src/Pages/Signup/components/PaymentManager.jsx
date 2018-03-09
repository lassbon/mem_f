import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import RegistrationPayment from './RegistrationPayment'
import AnnualDuePayment from './AnnualDuePayment'
import MembershipPayment from './MembershipPayment'

import { receivedUserDetails } from 'redux/action_creators'
import requestHandler from 'helpers/requestHandler'

const PaymentManager = ({
  auth,
  getUserDetails,
  history,
  registrationStage,
  stateIncrementRegistrationStage,
  user,
}) => (
  <>
    <div className="flex lg:flex-nowrap flex-wrap">
      <RegistrationPayment
        getUserDetails={getUserDetails}
        registrationStage={registrationStage}
        stateIncrementRegistrationStage={stateIncrementRegistrationStage}
        auth={auth}
        user={user}
      />
      {registrationStage === 5 &&
        (swal({
          text: `Please wait for the financial members to verify you.`,
          title: 'Paid',
          icon: 'success',
          button: 'ok',
          closeOnClickOutside: false,
        }).then(() => {
          history.push('/login')
          return null
        }),
        null)}
      {registrationStage > 5 ? (
        <AnnualDuePayment
          getUserDetails={getUserDetails}
          registrationStage={registrationStage}
          stateIncrementRegistrationStage={stateIncrementRegistrationStage}
          user={user}
          auth={auth}
        />
      ) : null}
      {registrationStage > 6 ? (
        <MembershipPayment
          getUserDetails={getUserDetails}
          registrationStage={registrationStage}
          stateIncrementRegistrationStage={stateIncrementRegistrationStage}
          user={user}
          auth={auth}
        />
      ) : null}
    </div>
  </>
)

const mapDispatchToProps = dispatch => ({
  getUserDetails: (id, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      const response = await requestHandler(network.user.getUserDetails)({
        id,
        token,
      })
      dispatch(receivedUserDetails(response))
      return Promise.resolve(response)
      // receivedUserDetails
    }),
})

const glueTo = connect(null, mapDispatchToProps)

export default withRouter(glueTo(PaymentManager))
