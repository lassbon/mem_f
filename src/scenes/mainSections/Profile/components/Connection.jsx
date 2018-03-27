import React from 'react'
import { ToastContainer, toast } from 'react-toastify'

const toastOptions = {
  position: toast.POSITION.BOTTOM_CENTER,
  autoClose: 3 * 60 * 60,
}

const Connection = ({
  acceptFriendRequest,
  cancelFriendRequest,
  request,
  requester: { companyName, companyPhone, email },
  token,
}) => {
  const params = {
    requester: request.requester,
    requestee: request.requestee,
  }

  return (
    <li className="px-8 py-6 pb-4 border-b border-grey-lighter">
      <ToastContainer {...toastOptions} />
      <figure className="flex">
        <div className="w-8 mr-4">
          <img src="/static/images/011-woman-5.svg" alt="" className="" />
        </div>
        <figcaption className="text-sm">
          <h6 className="text-sm">{companyName}</h6>
          <p className="">
            <i className="inline-block w-2 h-2 rounded-full bg-yellow-dark" />
            <span className="ml-3 text-grey-dark text-xxs">Gold Memeber</span>
          </p>
          <p className="flex flex-wrap mt-4">
            <span className="flex justify-center">
              <i className="ion-ios-email text-grey text-base" />
              <span className="ml-3 text-xs">{email}</span>
            </span>
            <span className="flex justify-center">
              <i className="ion-ios-telephone text-grey text-base" />
              <span className="ml-3 text-xs">{companyPhone}</span>
            </span>
          </p>
        </figcaption>
      </figure>
      <div className="mt-4 text-sm">
        <button
          onClick={() => {
            acceptFriendRequest(request.id, params, token)
              .then(() => {
                toast.success('Request accepted')
              })
              .catch(error => {
                toast.error(
                  error.message || 'An error occured. Please try again.'
                )
              })
          }}
          className="mr-2 px-2 py-1 bg-purple-lightest border border-grey-lighter"
        >
          Accept
        </button>
        <button
          onClick={() => {
            cancelFriendRequest(request.id, params, token)
              .then(() => {
                toast.success('Request rejected')
              })
              .catch(error => {
                toast.error(
                  error.message || 'An error occured. Please try again.'
                )
              })
          }}
          className="mr-2 px-2 py-1 bg-purple-lightest border border-grey-lighter"
        >
          Reject
        </button>
      </div>
    </li>
  )
}

export default Connection
