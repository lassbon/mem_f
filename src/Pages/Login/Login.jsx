import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import { String } from 'valib'
import Form from './components/Form'

const minPasswordLength = 6

const formInitialValues = {
  email: 'sample@email.com',
  password: '',
}

const validationFunctions = {
  email: String.isEmailLike,
  password: password => String.length.gte(password, minPasswordLength),
}

const errorMessages = {
  email: 'Please enter a valid email.',
  password: 'Please enter a password that is at least 6 characters.',
}

const validate = obj => {
  console.log(obj)
}

class Login extends Component {
  state = {}
  render() {
    return (
      <div className="lg:h-full lg:flex lg:justify-center lg:items-center">
        <section className="w-3/4">
          <Link
            to="/signup"
            className="inline-block lg:mb-12 py-2 px-4 text-pink-light bg-grey-lighter rounded-sm"
          >
            <i className="text-base ion-arrow-left-c" />
            <span className="ml-3 text-xs font-medium">Register</span>
          </Link>
          <header className="mb-6">
            <h2 className="mb-1 hind text-3xl font-bold tracking-tight text-grey-darker">
              Login into your dashboard
            </h2>
            <p className="text-sm text-grey-dark">
              Please enter your email and password
            </p>
          </header>
          <div className="lg:p-12 lg:lt-shadow ">
            <div>
              <div className="lg:w-2/5">
                <Formik
                  initialValues={formInitialValues}
                  onSubmit={(values, actions) => {
                    console.log('submit', values, actions)
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

                        <button className="w-32 py-3 shadow-lg text-base text-center rounded-sm bg-blue-lighter text-grey-darkest hind">
                          <span className="">Login</span>
                          <i className="ion-ios-arrow-thin-right ml-4" />
                        </button>
                      </form>
                    )
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const InputError = ({ touched, error }) =>
  touched && error ? (
    <div className="py-1">
      <span className="px-2 text-xs leading-loose whitespace-no-wrap bg-red text-white">
        {error}
      </span>
    </div>
  ) : null

export default Login
