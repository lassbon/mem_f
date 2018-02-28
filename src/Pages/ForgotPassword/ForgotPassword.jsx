import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import { String } from 'valib'
import swal from 'sweetalert'

//Components
import ButtonFixedWidthRadiusXS from 'components/buttons/ButtonFixedWidthRadiusXS'
import InputError from 'form/InputError'

// Helpers
import network from 'services/network'
import requestHandler from 'helpers/requestHandler'

// Data

const formInitialValues = {
  email: '',
}

class ForgotPassword extends Component {
  state = {
    submitingEmail: false,
  }
  stateSetSubmitingEmail = submitingEmail =>
    this.setState(state => ({ ...state, submitingEmail }))
  render() {
    const { submitingEmail } = this.state
    const { stateSetSubmitingEmail } = this
    return (
      <div className="lg:h-full lg:flex lg:justify-center lg:items-center">
        <section className="w-3/4">
          <Link
            to="/signup"
            className="inline-block align-middle lg:mb-12 py-2 px-4 text-white bg-pink-light rounded-sm"
          >
            <i className="text-base ion-arrow-left-c" />
            <span className="ml-3 text-xs font-medium">Register</span>
          </Link>
          <Link
            to="/login"
            className="inline-block align-middle lg:mb-12 lg:ml-4 py-2 px-4 text-pink-light bg-grey-lighter rounded-sm"
          >
            <span className="text-xs font-medium">Login</span>
            <i className="text-base ml-3 ion-arrow-right-c" />
          </Link>
          <header className="mb-6">
            <h2 className="mb-1 hind text-3xl font-bold tracking-tight text-grey-darker">
              {/* Login  */}
            </h2>
            <p className="text-sm text-grey-dark">Please enter your email</p>
          </header>
          <div className="lg:p-12 lg:lt-shadow ">
            <div className="lg:flex ">
              <div className="lg:w-2/5">
                <Formik
                  initialValues={formInitialValues}
                  onSubmit={params => {
                    stateSetSubmitingEmail(true)
                    requestHandler(network.user.resetPassword)({ params })
                      .then(() =>
                        swal({
                          text: `A reset password link has been sent to your mail.`,
                          title: 'Sent',
                          icon: 'success',
                          button: false,
                          closeOnClickOutside: false,
                        })
                      )
                      .catch()
                      .then(() => stateSetSubmitingEmail(false))
                  }}
                  validate={value => {
                    const errors = {}
                    if (!String.isEmailLike(value.email)) {
                      errors.email = 'Please enter a valid email.'
                    }
                    return errors
                  }}
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
                              E-mail
                            </label>
                            <input
                              name="email"
                              type="email"
                              placeholder="Email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              className="w-full p-4 py-3 roboto text-base tracking-wide border border-grey-light border-solid rounded-sm "
                            />
                            <InputError
                              touched={touched.email}
                              error={errors.email}
                            />
                          </fieldset>
                        </div>
                        <ButtonFixedWidthRadiusXS
                          loading={submitingEmail}
                          loadingText="Signing in. Please wait"
                        >
                          <span className="">Submit</span>
                          <i className="ion-arrow-right-c ml-4" />
                        </ButtonFixedWidthRadiusXS>
                      </form>
                    )
                  }}
                />
              </div>
              <div className="flex justify-center lg:w-3/5">
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

export default ForgotPassword
