import React from 'react'
import swal from 'sweetalert'

import Circle from 'loaders/Circle'
import network from 'services/network'
import requestHandler from 'helpers/requestHandler'

const RefereeConfirm = ({ match: { params: { user, id } } }) => {
  requestHandler(network.general.confirmUser)({
    params: {
      refereeId: user,
      id,
    },
  })
    .then(() =>
      swal({
        text: `User has been successfully. Thank you.`,
        title: 'Confirmed',
        icon: 'success',
        button: false,
        closeOnClickOutside: false,
      })
    )
    .catch(() =>
      swal({
        text: `An error occured. Please click the link in your email again.`,
        title: 'Error',
        icon: 'error',
        button: 'ok',
        closeOnClickOutside: false,
      })
    )
  return (
    <div className="h-screen flex justify-center items-center py-6">
      <Circle text="Confirming" />
    </div>
  )
}

export default RefereeConfirm
