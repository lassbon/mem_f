import React from 'react'
import { connect } from 'react-redux'
import PaystackButton from 'react-paystack'

const callback = () => {
  swal({
    text: 'Event paid for successfully.',
    title: 'Paid',
    icon: 'success',
    button: {
      text: 'ok',
    },
  })
}

const close = () => { }

const Payment = ({ user }) => {

  
  return <div className="flex flex-wrap lg:px-16 py-8">
    <div className="lg:w-1/2 pr-6 mb-6">
      <div className="lg:lt-shadow bg-white rounded p-px">
        <div className="flex p-4 bg-pink rounded text-xs text-white capitalize">
          <span className="flex-grow">Type</span>
          <span className="w-1/4">Fee</span>
          <span className="w-1/4">Actions</span>
        </div>
        <div className="p-4 flex items-center text-grey-darker border-b border-grey-lighter">
          <figure className="flex-grow flex items-center">
            {/* <div className="h-24 w-16 rounded bg-teal-dark" /> */}
            <figcaption className=" text-sm">
              <p className="text-grey-darkest">{user.membershipPlan} Membership subscription</p>
              <p>02/03/2018</p>
            </figcaption>
          </figure>
          <div className="w-1/4">N500,000</div>
          <div className="w-1/4 text-pink">
          <PaystackButton
                  text='Book'
                  class="flex justify-center button-fixed-width-small-radius w-32 py-3 shadow-lg text-base text-center rounded-sm bg-blue-lighter text-white hind"
                  callback={() =>
                    callback(
                      { params: { id: user.id, regState: 5 }, token: user.token },
                      // stateIncrementRegistrationStage,
                      // getUserDetails
                    )
                  }
                  close={close}
                  reference={new Date().valueOf() + ''}
                  email={user.email}
                  amount={event.fee * 100}
                  paystackkey="pk_test_3f720e9be8c5fe77ca5035fa439794538e42ab63"
                  metadata={metadata}
                />
          </div>
        </div>
        <div className="flex justify-end p-4">
          <p className="w-1/4">
            <span className="mb-2 text-grey-dark text-xs">Total</span>
            <br />
            <span>N500,000</span>
          </p>
        </div>
      </div>
    </div>
    <div className="lg:w-1/2 pr-6 mb-6">
      <div className="lg:lt-shadow bg-white rounded p-px">
        <div className="flex p-4 bg-purple-light rounded text-xs text-white capitalize">
          <span className="flex-grow">Type</span>
          <span className="w-1/4">Fee</span>
        </div>
        <div className="p-4 flex items-center text-grey-darker border-b border-grey-lighter">
          <figure className="flex-grow flex items-center">
            {/* <div className="h-24 w-16 rounded bg-teal-dark" /> */}
            <figcaption className=" text-sm">
              <p className="text-grey-darkest">Registration payment</p>
              <p>02/03/2018</p>
            </figcaption>
          </figure>
          <div className="w-1/4">N5,000</div>
        </div>
        <div className="flex justify-end p-4">
          <p className="w-1/4">
            <span className="mb-2 text-grey-dark text-xs">Total</span>
            <br />
            <span>N5,000</span>
          </p>
        </div>
      </div>
    </div>
    <div className="lg:w-1/2 pr-6 mb-6">
      <div className="lg:lt-shadow bg-white rounded p-px">
        <div className="flex p-4 bg-teal rounded text-xs text-white capitalize">
          <span className="flex-grow">Type</span>
          <span className="w-1/4">Fee</span>
        </div>
        <div className="p-4 flex items-center text-grey-darker border-b border-grey-lighter">
          <figure className="flex-grow flex items-center">
            {/* <div className="h-24 w-16 rounded bg-teal-dark" /> */}
            <figcaption className=" text-sm">
              <p className="text-grey-darkest">Annual due</p>
              <p>02/03/2018</p>
            </figcaption>
          </figure>
          <div className="w-1/4">N50,000</div>
        </div>
        <div className="flex justify-end p-4">
          <p className="w-1/4">
            <span className="mb-2 text-grey-dark text-xs">Total</span>
            <br />
            <span>N50,000</span>
          </p>
        </div>
      </div>
    </div>
  </div>
}

const mapStateToProps = ({ user }) => ({
  user,
})

const glueTo = connect(mapStateToProps, null)

export default glueTo(Payment)
