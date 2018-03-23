import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Components

import UserActivities from './UserActivities'
import ProfileEdit from 'ProfileEdit'

const UserProfile = ({
  editing,
  stateSetEdit,
  user: {
    companyName,
    companyAddress,
    companyPhone,
    email,
    membershipId,
    profileImage,
  },
}) => (
  <div className="bg-yellow-lightest">
    {editing && <ProfileEdit stateSetEdit={stateSetEdit} />}
    <section className="lg:py-6 lg:px-12 py-8 px-6 bg-pink-lightest">
      <figure className="lg:inline-block pb-6 border-b border-grey-light">
        <div className="">
          <div className="w-24 mb-4  mr-4 bg-red-lighter rounded border-8 border-solid border-white overflow-hidden relative">
            <div className="w-full h-full absolute pin-t pin-l -mt-8 bg-yellow-light rounded-full" />
            {!!profileImage ? (
              <img src={profileImage} alt="" className="relative" />
            ) : (
              <img
                src="/static/images/033-boy.svg"
                alt=""
                className="relative"
              />
            )}
          </div>
          <div className="pb-4 text-grey-dark">
            <span onClick={() => stateSetEdit(true)} className="pointer">
              <i className="ion-edit mr-1" />
              Edit profile
            </span>
            <span className="block mt-4 text-xs">
              <Link
                to="/forgotpassword"
                className="p-1 px-2 bg-pink-dark text-white rounded-sm"
              >
                Change password
              </Link>
            </span>
          </div>
        </div>

        <figcaption className="text-grey-dark">
          <em className="block mb-2 font-semibold font-normal roman text-base text-grey-darker">
            {companyName}
          </em>
          <address className="text-xs roman">{companyAddress}</address>
        </figcaption>
      </figure>
      <div className="py-2 text-sm text-grey-darker">
        <div className="mt-6">
          <h6 className="mb-1 text-xs font-semibold hind text-grey">
            Membership Id
          </h6>
          <p>{membershipId}</p>
        </div>
        <div className="mt-6">
          <h6 className="mb-1 text-xs font-semibold hind text-grey">Email</h6>
          <p>{email}</p>
        </div>
        <div className="mt-6">
          <h6 className="mb-1 text-xs font-semibold hind text-grey">Phone</h6>
          <p>{companyPhone}</p>
        </div>
      </div>
    </section>
    <section className="py-6 px-6 lg:px-12">
      <UserActivities />
    </section>
  </div>
)

export default UserProfile
