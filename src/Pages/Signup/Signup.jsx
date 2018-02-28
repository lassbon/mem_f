import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import FormManager from 'FormManager'

import RegistrationPayment from 'RegistrationPayment'
import AnnualDuePayment from 'AnnualDuePayment'
import MembershipPayment from 'MembershipPayment'

import './styles.css'

// Data

const noOfForms = 4
const registrationStageTitles = [
  'Company details',
  'Membership category',
  'Company rep',
  'Referrals',
  'Registration fee',
  'Annual fee',
  'Membership fee',
]
const loadingText = 'Checking and submitting your details, please wait.'

// Templates

const PresentStageProgressBar = props => (
  <li
    {...props}
    className="progress-stage lg:w-1/7 h-8 flex justify-center items-center lg:bg-purple-dark relative cursor-pointer"
  >
    <i className="ion-load-a" />
    <span className="progress-stage-arrow h-8 w-8 lg:absolute lg:pin-r lg:bg-purple-dark rounded" />
  </li>
)

const CompletedStageProgressBar = props => (
  <li
    {...props}
    className="progress-stage lg:w-1/7 h-8 flex justify-center items-center lg:bg-purple-dark relative cursor-pointer"
  >
    <i className="ion-checkmark-round" />
    <span className="progress-stage-arrow h-8 w-8 lg:absolute lg:pin-r lg:bg-purple-dark rounded" />
  </li>
)

const FutureStageProgressBar = props => (
  <li
    {...props}
    className="progress-stage lg:w-1/7 h-8 flex justify-center items-center lg:bg-pink-lighter border-r border-pink-lighter border-solid text-pink-light relative cursor-pointer"
  >
    <i className="ion-record dot-font-size" />
    {/* <span className="progress-stage-arrow h-8 w-8 lg:absolute lg:pin-r lg:bg-pink rounded" /> */}
  </li>
)

// Registration helper functions

const populateProgressBar = (registrationStage, onClick) =>
  registrationStageTitles.map((title, index, arr) => {
    const style = { zIndex: arr.length - index }

    return registrationStage > index ? (
      <CompletedStageProgressBar
        key={index}
        style={style}
        onClick={onClick}
        data-index={index}
      />
    ) : registrationStage === index ? (
      <PresentStageProgressBar
        key={index}
        style={style}
        onClick={onClick}
        data-index={index}
      />
    ) : (
      <FutureStageProgressBar
        key={index}
        style={style}
        onClick={onClick}
        data-index={index}
      />
    )
  })

const canRenderFormManager = registrationStage => registrationStage < noOfForms
// COMPONENT!!!

class Signup extends Component {
  state = {
    registrationStage: this.props.user.regState || -1,
    loading: false,
  }
  stateIncrementRegistrationStage = () =>
    this.setState(state => ({
      ...state,
      registrationStage: state.registrationStage + 1,
    }))
  stateSetRegistrationStage = registrationStage =>
    typeof registrationStage === 'number' &&
    !Number.isNaN(registrationStage) &&
    this.setState(state => ({
      ...state,
      registrationStage,
    }))
  stateSetLoading = loading => this.setState(state => ({ ...state, loading }))

  handleProgressBarClick = ({ currentTarget: { dataset: { index } } }) => {
    if (true) return
    this.stateSetRegistrationStage(Number(index))
  }
  render() {
    const { registrationStage, loading } = this.state
    const {
      handleProgressBarClick,
      stateIncrementRegistrationStage,
      stateSetLoading,
    } = this
    const { auth, user } = this.props
    console.log('registrationStage', registrationStage)
    return (
      <div className="lg:h-screen lg:flex lg:justify-center lg:items-center">
        <section className="w-3/4">
          <Link
            to="/login"
            className="inline-block lg:mb-12 py-2 px-4 text-pink-light bg-grey-lighter rounded-sm"
          >
            <i className="text-base ion-arrow-left-c" />
            <span className="ml-3 text-xs font-medium">Login</span>
          </Link>
          <header className="mb-8">
            <h2 className="mb-1 hind text-3xl font-bold tracking-tight text-grey-darker">
              Signup
            </h2>
            {/* <p className="text-sm text-grey-dark">
              Please enter your email and password
            </p> */}
          </header>
          <ul className="list-reset flex text-xxs text-grey hind uppercase">
            {registrationStageTitles.map((title, index) => (
              <li
                key={title}
                className={`lg:w-1/7 text-center ${
                  registrationStage === index
                    ? 'text-sm font-semibold text-purple-dark'
                    : ''
                }`}
              >
                {title}
              </li>
            ))}
          </ul>
          <ul className="list-reset lg:flex lg:bg-pink-lighter lg:text-white rounded-sm overflow-hidden">
            {populateProgressBar(registrationStage, handleProgressBarClick)}
          </ul>
          <div className="signup-box lg:p-12 lg:lt-shadow lg:bg-white relative">
            <div>
              <div className=" lg:w-full">
                {canRenderFormManager(registrationStage) && (
                  <FormManager
                    registrationStage={registrationStage + 1}
                    loading={loading}
                    loadingText={loadingText}
                    stateIncrementRegistrationStage={
                      stateIncrementRegistrationStage
                    }
                    stateSetLoading={stateSetLoading}
                  />
                )}
                {registrationStage > 3 ? (
                  <div className="flex">
                    <RegistrationPayment
                      registrationStage={registrationStage}
                      stateIncrementRegistrationStage={
                        stateIncrementRegistrationStage
                      }
                      auth={auth}
                      user={user}
                    />
                    {registrationStage > 4 ? (
                      <AnnualDuePayment
                        registrationStage={registrationStage}
                        stateIncrementRegistrationStage={
                          stateIncrementRegistrationStage
                        }
                        user={user}
                        auth={auth}
                      />
                    ) : null}
                    {registrationStage > 5 ? (
                      <MembershipPayment
                        registrationStage={registrationStage}
                        stateIncrementRegistrationStage={
                          stateIncrementRegistrationStage
                        }
                        user={user}
                        auth={auth}
                      />
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  componentDidMount() {}
}

const mapStateToProps = ({ user, auth }) => ({
  auth,
  user,
})

const glueTo = connect(mapStateToProps, null)

export default glueTo(Signup)
