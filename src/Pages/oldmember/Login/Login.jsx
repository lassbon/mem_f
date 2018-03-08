//vendors
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik'
import { String } from 'valib'
import { ToastContainer, toast } from 'react-toastify'
import { decode, encode } from 'base-64'

// console.log(encode('ABUCCI/MEM/000056'))
//Components
import Form from './components/Form'
import ButtonFixedWidthRadiusXS from 'components/buttons/ButtonFixedWidthRadiusXS'
import InputError from 'form/InputError'

//helpers
import {
  receivedOldMemberLoginAuthDetails,
  receivedUserDetails,
} from 'redux/action_creators'
import requestHandler from 'helpers/requestHandler'

const registrationLength = 7
const goToSignupOrApp = (
  history,
  {
    approved,
    membershipDue,
    membershipFee,
    membershipStatus,
    regState,
    verified,
  }
) => {
  // console.log('old login regstate', regState)
  if (regState > registrationLength) return history.push('/app/timeline')
  return history.push('/oldmember/signup')
}

const minPasswordLength = 6

const formInitialValues = {
  membershipId: '',
  password: '',
}

const validationFunctions = {
  membershipId: id => !!id,
  password: password => String.length.gte(password, minPasswordLength),
}

const errorMessages = {
  membershipId: 'Please enter a valid email.',
  password: 'Please enter a password that is at least 6 characters.',
}

const toastOptions = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 3 * 60 * 60,
}

class Login extends Component {
  state = {
    attemptingLogin: false,
  }
  stateSetLoading = attemptingLogin =>
    this.setState(state => ({ ...state, attemptingLogin }))
  render() {
    const {
      attemptLogin,
      getUserDetails,
      match: { params: { memberId } },
    } = this.props
    const { attemptingLogin } = this.state
    const { stateSetLoading } = this
    return (
      <div className="lg:h-full lg:flex lg:justify-center lg:items-center">
        <ToastContainer {...toastOptions} />
        <section className="w-3/4">
          <Link
            to="/forgotpassword"
            className="inline-block align-middle lg:mb-12 py-2 px-4 text-pink-light bg-grey-lighter rounded-sm"
          >
            <i className="text-base mr-3 ion-arrow-left-c" />
            <span className="text-xs font-medium">Forgot password</span>
          </Link>
          <header className="mb-6">
            <h2 className="mb-1 hind text-3xl font-bold tracking-tight text-grey-darker">
              Login
            </h2>
            <p className="text-sm text-grey-dark">
              Please enter your membership Id and password
            </p>
          </header>
          <div className="lg:p-12 lg:lt-shadow ">
            <div className="lg:flex justify-between">
              <div className="lg:w-2/5 self-start">
                <Formik
                  initialValues={{
                    ...formInitialValues,
                    membershipId: decode(memberId),
                  }}
                  onSubmit={values => {
                    stateSetLoading(true)
                    const { history } = this.props
                    attemptLogin(values)
                      .then(() => {
                        const { auth: { user: { id }, token } } = this.props
                        return getUserDetails(id, token)
                      })
                      .then(data => {
                        const { history } = this.props
                        goToSignupOrApp(history, data.payload)
                        return Promise.resolve('')
                      })
                      .catch(error => {
                        toast.error(
                          error.message || 'An error occured. Please try again.'
                        )
                        console.error(error.message)
                        return Promise.resolve('')
                      })
                      .then(data => {
                        stateSetLoading(false)
                      })
                  }}
                  validate={obj =>
                    Object.keys(obj).reduce((acc, key) => {
                      const good = validationFunctions[key](obj[key])
                      return good ? acc : { ...acc, [key]: errorMessages[key] }
                    }, {})
                  }
                  render={({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                  }) => {
                    return (
                      <form action="" onSubmit={handleSubmit}>
                        <div className="pb-4">
                          <fieldset className="mb-6">
                            <label
                              htmlFor=""
                              className="mb-4 text-xs text-grey"
                            >
                              Membership ID
                            </label>
                            <input
                              disabled
                              name="membershipId"
                              type="membershipId"
                              placeholder="Membership Id"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.membershipId}
                              className="w-full p-4 py-3 roboto text-base tracking-wide border border-grey-light border-solid rounded-sm "
                            />
                            <InputError
                              touched={touched.membershipId}
                              error={errors.membershipId}
                            />
                          </fieldset>
                          <fieldset className="mb-6">
                            <label
                              htmlFor=""
                              className="mb-4 text-xs text-grey"
                            >
                              Password
                            </label>
                            <input
                              name="password"
                              type="password"
                              placeholder="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              className="w-full p-4 py-3 roboto text-base tracking-wide border border-grey-light border-solid rounded-sm "
                            />
                            <InputError
                              touched={touched.password}
                              error={errors.password}
                            />
                          </fieldset>
                        </div>
                        <ButtonFixedWidthRadiusXS
                          loading={attemptingLogin}
                          loadingText="Signing in. Please wait"
                        >
                          <span className="">Login</span>
                          <i className="ion-arrow-right-c ml-4" />
                        </ButtonFixedWidthRadiusXS>
                      </form>
                    )
                  }}
                />
              </div>
              <div className="lg:w-2/5">
                <img
                  src="/static/images/undraw_safe_bnk7.svg"
                  alt=""
                  className="lg:w-64"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })
const mapDispatchToProps = dispatch => ({
  attemptLogin: params =>
    dispatch(async (dispatch, getState, { network }) => {
      const response = await requestHandler(network.login.oldUserLogin)({
        params,
      })
      dispatch(receivedOldMemberLoginAuthDetails(response))
      return Promise.resolve(response)
    }),
  getUserDetails: (id, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      const response = await network.user.getUserDetails({ id, token })
      const [networkResponse, data] = await Promise.all([
        response,
        response.json(),
      ])
      if (!networkResponse.ok)
        throw new Error('An error occurred. Please try signing again.')
      return dispatch(receivedUserDetails(data))
    }),
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default withRouter(glueTo(Login))
