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
  companyName: '',
  companyAddress: '',
  companyPhone: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const emailPasswordValidationFunctions = {
  companyName: notEmptyOrNumber,
  companyPhone: validatePhoneNumer,
  email: String.isEmailLike,
  password: password => String.length.gte(password, minPasswordLength),
  confirmPassword: (confirmPassword, { password }) =>
    confirmPassword === password,
}

const emailPasswordErrorMessages = {
  companyName: 'Please enter your name',
  companyPhone: 'Please enter a valid 11 digit phone number',
  email: 'Please enter a valid email.',
  password: 'Please enter a password that is at least 6 characters.',
  confirmPassword: 'Passwords must match',
}

const emailPasswordSubmitCallback = responseData => {
  // return swal({
  //   content: emailSubmitPopupContent,
  //   title: 'Registered',
  //   icon: 'success',
  //   button: {
  //     text: 'ok',
  //   },
  // })
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
  regState: 1, // company details is disabled so ignore regstate
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
  regState: 1, // regstate set to 1 as company details is disabled, change to 2 or stage number if any stages are added before it
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
  companyRepName1: '',
  companyRepEmail1: '',
  companyRepPhone1: '',
  companyRepPassportUrl1: '',
  companyRepCVUrl1: '',
  companyCOIUrl: '',

  companyRepPassportUrl1File: '',
  companyRepCVUrlFile: '',
  companyCOIUrlFile: '',

  companyRepName2: '',
  companyRepPhone2: '',
  companyRepEmail2: '',
  companyRepPassportUrl2: '',
  companyRepCVUrl2: '',

  companyRepPassportUrl2File: '',
  companyRepCVUrl2File: '',
  regState: 2,
}

const companyRepresentativesFormValidationFunctions = {
  companyRepName1: notEmptyOrNumber,
  companyRepEmail1: String.isEmailLike,
  companyRepPhone1: validatePhoneNumer,
  companyRepPassportUrl1: makeBool,
  companyRepCVUrl1: makeBool,
  companyCOIUrl: makeBool,
  companyRepName2: null,
  companyRepPhone2: null,
  companyRepEmail2: null,
  companyRepPassportUrl2: null,
  companyRepCVUrl2: null,
}

const companyRepresentativesErrorMessages = {
  companyRepName1: 'Please enter a full name',
  companyRepEmail1: 'Please enter a valid email address',
  companyRepPhone1: 'Please enter a valid 11 digit phone number',
  companyRepPassportUrl1: `Please upload the representative's passport photograph`,
  companyRepCVUrl1: `Please upload the representative's curriculum vitae`,
  companyCOIUrl: `Please upload you companys CAC`,
  companyRepName2: null,
  companyRepPhone2: null,
  companyRepEmail2: null,
  companyRepPassportUrl2: null,
  companyRepCVUrl2: null,
}

const companyRepresentativesSubmit = (data, { id, token }) => {
  const params = {
    companyRepName1: data.companyRepName1,
    companyRepEmail1: data.companyRepEmail1,
    companyRepPhone1: data.companyRepPhone1,
    companyRepName2: data.companyRepName2,
    companyRepPhone2: data.companyRepPhone2,
    companyRepEmail2: data.companyRepEmail2,
    regState: data.regState,
  }

  const fileParams = {
    companyRepPassportUrl1: data.companyRepPassportUrl1File,
    companyRepCVUrl1: data.companyRepCVUrlFile,
    companyCOIUrl: data.companyCOIUrlFile,
    companyRepPassportUrl2: data.companyRepPassportUrl2File,
    companyRepCVUrl2: data.companyRepCVUrl2File,
  }

  return Promise.all(
    Object.keys(fileParams).map(key => {
      if (!fileParams[key]) return Promise.resolve('')
      return requestHandler(network.user.updateUserDetails)({
        id,
        params: {
          [key]: fileParams[key],
        },
        token,
      })
    })
  ).then(() =>
    requestHandler(network.user.updateUserDetails)({ id, params, token })
  )
  // const params = data
}

// Financial members form stuff

const financialMembersFormInitialValues = {
  financialMemberId1: '',
  referee1: '',
  financialMemberId2: '',
  referee2: '',
  regState: 3,
}

const financialMembersFormValidationFunctions = {
  financialMemberId1: notEmptyOrNumber,
  referee1: String.isEmailLike,
  financialMemberId2: notEmptyOrNumber,
  referee2: String.isEmailLike,
}

const financialMembersErrorMessages = {
  financialMemberId1: `Please enter a financial member's ID`,
  referee1: 'Please enter a valid email address',
  financialMemberId2: `Please enter a financial member's ID`,
  referee2: 'Please enter a valid email address',
}

const financialMembersSubmit = (params, { token, id }) => {
  return Promise.all([
    requestHandler(network.general.validateReferee)({
      params: {
        email: params.referee1,
      },
      token,
    }),
    requestHandler(network.general.validateReferee)({
      params: {
        email: params.referee2,
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

// Registration process (Companydetails, companyrepresentative, financial members disabled)

const registrationForms = [
  EmailPasswordForm,
  //CompanyDetailsForm,
  MembershipCategory,
  //CompanyRepresentativesForm,
  //FinancialMembersForm,
]

const registrationFormsInitialValues = [
  emailPasswordFormInitialValues,
  //CompanyDetailsFormInitialValues,
  membershipCategoryFormInitialValues,
  //companyRepresentativesFormInitialValues,
  //financialMembersFormInitialValues,
]

const registrationFormValidationFunctions = [
  emailPasswordValidationFunctions,
  //companyDetailsValidationFunctions,
  membershipCategoryValidationFunctions,
  //companyRepresentativesFormValidationFunctions,
  //financialMembersFormValidationFunctions,
]

const registrationFormsErrorMessages = [
  emailPasswordErrorMessages,
  //companyDetailsErrorMessages,
  membershipCategoryErrorMessages,
  //companyRepresentativesErrorMessages,
  //financialMembersErrorMessages,
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
    // params => {
    //   const { user: { id }, token } = auth
    //   return companyDetailsSubmit(params, { id, token }).then(() => {
    //     return getUserDetails(id, token)
    //   })
    // },
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
    //() => {},
    () => {},
    //() => {},
    //() => {},
  ]

  return (
    <>
      <ToastContainer {...toastOptions} />
      <Formik
        key={registrationStage}
        initialValues={currenrFormInitialValues}
        onSubmit={values => {
          // console.log(values)
          console.log(registrationStage)
          stateSetLoading(true)
          registrationFormsSubmitFuntions[registrationStage](values)
            .then(() => Promise.resolve(stateIncrementRegistrationStage()))
            .then(registrationSubmitCallbacks[registrationStage])
            .catch(err => {
              // console.error('custom', err)
              toast.error(err.message)
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
        .then(() => requestHandler(network.login.login)({ params }))
        .then(loginResponseData => {
          dispatch(receivedLoginAuthDetails(loginResponseData)) // this because the next stage requires an API call, so update token in state
          return requestHandler(network.user.getUserDetails)({
            id: loginResponseData.user.id,
            token: loginResponseData.token,
          }).then(userResponseData => {
            dispatch(receivedUserDetails(userResponseData))
            dispatch(receivedLoginAuthDetails(loginResponseData))
            return Promise.resolve(loginResponseData)
          })
        })
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
