// Vendors
import React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { String } from 'valib'
import InputError from 'components/form/InputError'
import { ToastContainer, toast } from 'react-toastify'
import swal from 'sweetalert'
// Components

import EmailPasswordForm from 'EmailPasswordForm'
import MembershipCategory from 'MembershipCategory'
import CompanyDetailsForm from 'CompanyDetailsForm'
import CompanyRepresentativesForm from 'CompanyRepresentativesForm'
import FinancialMembersForm from 'FinancialMembersForm'

// Helpers

import network from 'services/network'
import requestHandler from 'helpers/requestHandler'
import { notEmptyOrNumber, validatePhoneNumer } from 'helpers/validation'
import {
  receivedLoginAuthDetails,
  receivedUserDetails,
} from 'redux/action_creators'

const makeBool = val => !!val

// Data

const minPasswordLength = 6
const toastOptions = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 3 * 60 * 60,
}

const emailSubmitPopupContent = document.createElement('div')
emailSubmitPopupContent.setAttribute(
  'class',
  'text-sm text-grey-darker text-left'
)
emailSubmitPopupContent.innerHTML = `\nYou have been successfully registered. \n\n Please complete the registration steps that follow to become an approved member of ACCI. <div className='mt-3 text-xs text-grey'> You can stop the process at anytime. Login anytime to continue.</div>`

// Email and Password Form stuff

const emailPasswordFormInitialValues = {
  email: '',
  password: '',
  confirmPassword: '',
}

const emailPasswordValidationFunctions = {
  email: String.isEmailLike,
  password: password => String.length.gte(password, minPasswordLength),
  confirmPassword: (confirmPassword, { password }) =>
    confirmPassword === password,
}

const emailPasswordErrorMessages = {
  email: 'Please enter a valid email.',
  password: 'Please enter a password that is at least 6 characters.',
  confirmPassword: 'Passwords must match',
}

const emailPasswordSubmitCallback = responseData => {
  return swal({
    content: emailSubmitPopupContent,
    title: 'Registered',
    icon: 'success',
    button: {
      text: 'ok',
    },
  })
}

// Company details form stuff

const CompanyDetailsFormInitialValues = {
  companyName: '',
  companyAddress: '',
  companyPhone: '',
  companyBusiness: '',
  employees: '',
  annualReturn: '',
  annualProfit: '',
  regState: 1,
}

const companyDetailsValidationFunctions = {
  companyName: notEmptyOrNumber,
  companyAddress: notEmptyOrNumber,
  companyPhone: validatePhoneNumer,
  companyBusiness: makeBool,
  employees: makeBool,
  annualReturn: makeBool,
  annualProfit: makeBool,
}

const companyDetailsErrorMessages = {
  companyName: 'Please enter a valid company name',
  companyAddress: 'Please enter a valid physical address',
  companyPhone: 'Please enter a valid 11 digit phone number',
  companyBusiness: 'Please select a trade group',
  employees: 'Please select employee size',
  annualReturn: 'Please select an annual return range',
  annualProfit: 'Please select an annual profit range',
}

const companyDetailsSubmit = (params, { id, token }) => {
  return requestHandler(network.user.updateUserDetails)({ id, params, token })
}

const companyDetailsSubmitCallback = companyDetailsResponse =>
  toast.success('Details')

// Membership category stuff

const membershipCategoryFormInitialValues = {
  membershipPlan: '',
  regState: 2,
}

const membershipCategoryValidationFunctions = {
  membershipPlan: notEmptyOrNumber,
}

const membershipCategoryErrorMessages = {
  membershipPlan: 'Please select a category',
}

const membershipCategorySubmit = (params, { id, token }) => {
  return requestHandler(network.user.updateUserDetails)({ id, params, token })
}

const membershipCategorySubmitCallback = () => {}

// Company representatives form stuff

const companyRepresentativesFormInitialValues = {
  representativeName1: '',
  representativeEmail1: '',
  representativePhone1: '',
  representativePassport: '',
  representativeCV: '',
  CAC: '',
  regState: 3,
}

const companyRepresentativesFormValidationFunctions = {
  representativeName1: notEmptyOrNumber,
  representativeEmail1: String.isEmailLike,
  representativePhone1: validatePhoneNumer,
  representativePassport: makeBool,
  representativeCV: makeBool,
  CAC: makeBool,
}

const companyRepresentativesErrorMessages = {
  representativeName1: 'Please enter a full name',
  representativeEmail1: 'Please enter a valid email address',
  representativePhone1: 'Please enter a valid 11 digit phone number',
  representativePassport: `Please upload the representative's passport photograph`,
  representativeCV: `Please upload the representative's curriculum vitae`,
  CAC: `Please upload you companys CAC`,
}

const companyRepresentativesSubmit = (data, { id, token }) => {
  const params = {
    representativeName1: data.representativeName1,
    representativeEmail1: data.representativeEmail1,
    representativePhone1: data.representativePhone1,
    regState: data.regState,
  }
  return requestHandler(network.user.updateUserDetails)({ id, params, token })
}

// Financial members form stuff

const financialMembersFormInitialValues = {
  financialMemberId1: '',
  financialMemberEmail1: '',
  financialMemberId2: '',
  financialMemberEmail2: '',
  regState: 4,
}

const financialMembersFormValidationFunctions = {
  financialMemberId1: notEmptyOrNumber,
  financialMemberEmail1: String.isEmailLike,
  financialMemberId2: notEmptyOrNumber,
  financialMemberEmail2: String.isEmailLike,
}

const financialMembersErrorMessages = {
  financialMemberId1: `Please enter a financial member's ID`,
  financialMemberEmail1: 'Please enter a valid email address',
  financialMemberId2: `Please enter a financial member's ID`,
  financialMemberEmail2: 'Please enter a valid email address',
}

const financialMembersSubmit = (params, { token, id }) => {
  return Promise.all([
    requestHandler(network.general.validateReferee)({
      params: {
        email: params.financialMemberEmail1,
      },
      token,
    }),
    requestHandler(network.general.validateReferee)({
      params: {
        email: params.financialMemberEmail2,
      },
      token,
    }),
  ])
    .then(arr => {
      const error = arr.some(({ status }) => status === 'error')
      if (error) {
        throw new Error(error)
        return
      }
      return Promise.resolve(arr)
    })
    .then(() => {
      return requestHandler(network.user.updateUserDetails)({
        id,
        params,
        token,
      })
    })
}

// Registration process

const registrationForms = [
  EmailPasswordForm,
  CompanyDetailsForm,
  MembershipCategory,
  CompanyRepresentativesForm,
  FinancialMembersForm,
]

const registrationFormsInitialValues = [
  emailPasswordFormInitialValues,
  CompanyDetailsFormInitialValues,
  membershipCategoryFormInitialValues,
  companyRepresentativesFormInitialValues,
  financialMembersFormInitialValues,
]

const registrationFormValidationFunctions = [
  emailPasswordValidationFunctions,
  companyDetailsValidationFunctions,
  membershipCategoryValidationFunctions,
  companyRepresentativesFormValidationFunctions,
  financialMembersFormValidationFunctions,
]

const registrationFormsErrorMessages = [
  emailPasswordErrorMessages,
  companyDetailsErrorMessages,
  membershipCategoryErrorMessages,
  companyRepresentativesErrorMessages,
  financialMembersErrorMessages,
]

// Registration helper functions

const validateInputs = (nameToValues, validationFunctions, errorMessages) =>
  Object.keys(nameToValues).reduce((acc, key) => {
    const validator = validationFunctions[key]
    if (typeof validator !== 'function') return acc
    const value = nameToValues[key]
    const good = validator(value, nameToValues)
    return good ? acc : { ...acc, [key]: errorMessages[key] }
  }, {})

// COMPONENT!!!

const FormManager = props => {
  const {
    loading,
    loadingText,
    registrationStage,
    register,
    stateSetLoading,
    stateIncrementRegistrationStage,
    emailPasswordSubmit,
    auth,
    getUserDetails,
  } = props
  const CurrentForm = registrationForms[registrationStage]
  const currenrFormInitialValues =
    registrationFormsInitialValues[registrationStage]
  const validationFunctions =
    registrationFormValidationFunctions[registrationStage]
  const errorMessages = registrationFormsErrorMessages[registrationStage]
  const registrationFormsSubmitFuntions = [
    emailPasswordSubmit,
    params => {
      const { user: { id }, token } = auth
      return companyDetailsSubmit(params, { id, token }).then(() => {
        return getUserDetails(id, token)
      })
    },
    params => {
      const { user: { id }, token } = auth
      return membershipCategorySubmit(params, { id, token }).then(() => {
        return getUserDetails(id, token)
      })
    },
    params => {
      const { user: { id }, token } = auth
      return companyRepresentativesSubmit(params, { id, token }).then(() => {
        return getUserDetails(id, token)
      })
    },
    params => {
      const { user: { id }, token } = auth
      return financialMembersSubmit(params, { id, token }).then(() => {
        return getUserDetails(id, token)
      })
    },
    financialMembersSubmit,
  ]
  const registrationSubmitCallbacks = [
    emailPasswordSubmitCallback,
    () => {},
    () => {},
    () => {},
    () => {},
  ]

  return (
    <>
      <ToastContainer {...toastOptions} />
      <Formik
        key={registrationStage}
        initialValues={currenrFormInitialValues}
        onSubmit={values => {
          console.log(values)
          console.log(registrationStage)
          stateSetLoading(true)
          registrationFormsSubmitFuntions[registrationStage](values)
            .then(() => Promise.resolve(stateIncrementRegistrationStage()))
            .then(registrationSubmitCallbacks[registrationStage])
            .catch(err => {
              console.error('custom', err)
              // toast.error(err.message)
            })
            .then(() => {
              stateSetLoading(false)
            })
        }}
        validate={nameToValues =>
          validateInputs(nameToValues, validationFunctions, errorMessages)
        }
        render={props => (
          <CurrentForm {...props} loading={loading} loadingText={loadingText} />
        )}
      />
    </>
  )
}

const mapStateToProps = ({ auth, user }) => ({
  auth,
  user,
})

const mapDispatchToProps = dispatch => ({
  emailPasswordSubmit: params =>
    dispatch((dispatch, getState, { network }) =>
      requestHandler(network.user.registerUser)({ params })
        .then(() => requestHandler(network.login)({ params }))
        .then(loginResponseData =>
          dispatch(receivedLoginAuthDetails(loginResponseData))
        )
    ),
  getUserDetails: (id, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      const response = await requestHandler(network.user.getUserDetails)({
        id,
        token,
      })
      return dispatch(receivedUserDetails(response))
      // receivedUserDetails
    }),
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default glueTo(FormManager)
