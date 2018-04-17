import React from 'react'

const Friend = ({ friend: { companyName, companyPhone, email, membershipPlan, profileImage } }) => {
  return (
    <li className="px-8 py-6 pb-4 border-b border-grey-lighter">
      <figure className="">
        <div className="w-8 mr-4 inline-block">
        {profileImage ? (
            <img src={profileImage} alt="" className="relative" />
          ) : (
            <img src="/static/images/033-boy.svg" alt="" className="" />
          )}
        </div>
        <figcaption className="text-sm inline-block">
          <h6 className="text-sm">{companyName}</h6>
          <p className="flex">
            <i className="inline-block w-2 h-2 rounded-full bg-yellow-dark" />
            <span className="ml-3 text-grey-dark text-xxs">{membershipPlan} Memeber</span>
          </p>
          <p className="flex flex-wrap mt-4">
            <span className=" pr-6 justify-center">
              <i className="ion-ios-email text-grey text-base" />
              <span className="ml-3 text-xs">{email}</span>
            </span>
            <span className=" justify-center ">
              <i className="ion-ios-telephone text-grey text-base" />
              <span className="ml-3 text-xs">{companyPhone}</span>
            </span>
          </p>
        </figcaption>
      </figure>
      {/* <div className="mt-4 text-sm">
        <button
          onClick={() => {
            acceptFriendRequest(request.id, params, token)
          }}
          className="mr-2 px-2 py-1 bg-blue-lightest border border-grey-lighter"
        >
          Accept
        </button>
        <button
          onClick={() => {
            cancelFriendRequest(request.id, params, token)
          }}
          className="mr-2 px-2 py-1 bg-blue-lightest border border-grey-lighter"
        >
          Reject
        </button>
      </div> */}
    </li>
  )
}

export default Friend
