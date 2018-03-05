import React, { Component } from 'react'
import { connect } from 'react-redux'
import ButtonFixedWidthRadiusXS from 'components/buttons/ButtonFixedWidthRadiusXS'

import network from 'services/network'
import requestHandler from 'helpers/requestHandler'


class Payment extends Component {
  state = {
    loading: false
  }
  stateSetLoading = loading => this.setState(state => ({...state, loading}))
  unsubscribe = (params, token) => {
    this.stateSetLoading(true)
    return requestHandler(network.payment.unsubscribeDue)({ params, token}).then(() => Promise.resolve(this.stateSetLoading(false))).catch((error) => console.error(error))
  }
  render() {
    const { auth, user } = this.props
    const { loading } = this.state
    console.log(user)
    return <div className="flex flex-wrap lg:px-16 py-8">
      <div className="lg:w-1/2 pr-6 mb-6">
        <div className="lg:lt-shadow bg-white rounded p-px">
          <div className="flex p-4 bg-pink rounded text-xs text-white capitalize">
            <span className="flex-grow">Type</span>
            <span className="w-1/4">Fee</span>
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
            <span className="w-1/3">Actions</span>

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
            <div className="w-1/3 ">
              <ButtonFixedWidthRadiusXS onClick={() => this.unsubscribe({ id: user.id}, auth.token)} loading={loading} loadingText='Unsubscribing. Please wait...'>
                <span className="">Unsubscribe</span>
                <i className="ion-ios-arrow-thin-right ml-4" />
              </ButtonFixedWidthRadiusXS>
            </div>
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
}

const mapStateToProps = ({ auth, user }) => ({
  auth,
  user,
})

const glueTo = connect(mapStateToProps, null)

export default glueTo(Payment)
