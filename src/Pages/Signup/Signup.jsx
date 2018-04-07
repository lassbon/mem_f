import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'
import simpleScrollbar from 'fixed/simpleScrollbar'
import { ToastContainer, toast } from 'react-toastify'
import swal from 'sweetalert'

import FormManager from 'FormManager'
import PaymentManager from 'PaymentManager'

import './styles.css'

import { logOut } from 'redux/action_creators'
// Data

const noOfForms = 1
const registrationStageTitles = [
  //'Company details',
  'Membership category',
  //'Company rep',
  //'Referrals',
  //'Registration fee',
  //'Annual fee',
  'Membership fee',
]
const loadingText = 'Checking and submitting your details, please wait.'

// Templates

const PresentStageProgressBar = props => (
  <li
    {...props}
    className="progress-stage lg:w-1/7 w-full h-8 flex justify-center items-center bg-purple-dark relative cursor-pointer"
  >
    <i className="rotate-loader ion-load-a" />
    <span className="progress-stage-arrow h-8 w-8 absolute pin-r bg-purple-dark rounded" />
  </li>
)

const CompletedStageProgressBar = props => (
  <li
    {...props}
    className="progress-stage lg:w-1/7 w-full h-8 flex justify-center items-center bg-purple-dark relative cursor-pointer"
  >
    <i className="ion-checkmark-round" />
    <span className="progress-stage-arrow h-8 w-8 absolute pin-r bg-purple-dark rounded" />
  </li>
)

const FutureStageProgressBar = props => (
  <li
    {...props}
    className="progress-stage lg:w-1/7 w-full h-8 flex justify-center items-center bg-pink-lighter border-r border-pink-lighter border-solid text-pink-light relative cursor-pointer"
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
        // onClick={onClick}
        data-index={index}
      />
    ) : registrationStage === index ? (
      <PresentStageProgressBar
        key={index}
        style={style}
        // onClick={onClick}
        data-index={index}
      />
    ) : (
      <FutureStageProgressBar
        key={index}
        style={style}
        // onClick={onClick}
        data-index={index}
      />
    )
  })

const canRenderFormManager = registrationStage => registrationStage < noOfForms
// COMPONENT!!!

class Signup extends Component {
  state = {
    registrationStage: !Number.isNaN(Number(this.props.user.regState))
      ? this.props.user.regState
      : -1,
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
    this.stateSetRegistrationStage(Number(index))
  }
  componentWillUnmount() {
    const { logOut } = this.props
    logOut()
  }
  render() {
    const { loading } = this.state
    const {
      handleProgressBarClick,
      stateIncrementRegistrationStage,
      stateSetLoading,
    } = this
    const { auth, user, history } = this.props
    const { regState } = user
    const registrationStage = !Number.isNaN(Number(this.props.user.regState))
      ? Number(regState)
      : -1
    // if (regState > 8) {

    // }

    return (
      <>
        <div className="lg:absolute w-full pin-r pin-t lg:mt-8 lg:flex justify-center">
          <div className="p-4 lg:w-3/4 lg:flex justify-end">
            <img
              src="/static/images/logo.png"
              alt=""
              className="w-32 lg:w-64"
            />
          </div>
        </div>
        <div
          ref={el => el && simpleScrollbar.initEl(el)}
          className="mt-6 lg:h-screen"
        >
          <div className="signup-inner-container lg:flex lg:flex-col lg:justify-center lg:items-center lg:overflow-y-scroll">
            <section className="px-6 lg:w-3/4">
              <Link
                to="/login"
                className="inline-block lg:mb-12 py-2 px-4 text-pink-light bg-grey-lighter rounded-sm"
              >
                <i className="text-base ion-arrow-left-c" />
                <span className="ml-3 text-xs font-medium">Login</span>
              </Link>
              <header className="mt-8 lg:mt-4 mb-8">
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
                        : 'hidden lg:inline'
                    }`}
                  >
                    {title}
                  </li>
                ))}
              </ul>
              <ul className="list-reset flex bg-pink-lighter text-white rounded-sm overflow-hidden">
                {populateProgressBar(registrationStage, handleProgressBarClick)}
              </ul>
              <div className="signup-box lg:p-12 lg:lt-shadow lg:bg-white relative">
                <div>
                  <div className="px-6 py-4 lg:p-0 lg:w-full">
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
                    {registrationStage >= 1 ? (
                      <PaymentManager
                        auth={auth}
                        registrationStage={registrationStage}
                        stateSetLoading={stateSetLoading}
                        stateIncrementRegistrationStage={
                          stateIncrementRegistrationStage
                        }
                        user={user}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
            <div className="text-center mt-8 pt-8 lg:pb-0 pb-6 text-xs text-grey">
              Designed by{' '}
              <a href="https://karixchange.com" className="text-red-light">
                karixchange
              </a>
            </div>
          </div>
        </div>
      </>
    )
  }

  componentDidMount() {}
}

const mapStateToProps = ({ user, auth }) => ({
  auth,
  user,
})

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
})
const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default withRouter(glueTo(Signup))
