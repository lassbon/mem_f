// Vendors
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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

// Company details form stuff

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

// Company representatives form stuff

const companyRepresentativesFormInitialValues = {
  companyRepName1: '',
  companyRepEmail1: '',
  companyRepPhone1: '',
  companyRepPassportUrl1: '',
  companyRepCVUrl: '',
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
  regState: 8,
}

const companyRepresentativesFormValidationFunctions = {
  companyRepName1: notEmptyOrNumber,
  companyRepEmail1: String.isEmailLike,
  companyRepPhone1: validatePhoneNumer,
  companyRepPassportUrl1: makeBool,
  companyRepCVUrl: makeBool,
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
  companyRepCVUrl: `Please upload the representative's curriculum vitae`,
  companyCOIUrl: `Please upload you companys CAC`,
  companyRepName2: null,
  companyRepPhone2: null,
  companyRepEmail2: null,
  companyRepPassportUrl2: null,
  companyRepCVUrl2: null,
}

const companyRepresentativesSubmit = (data, { id, token }) => {
  const params = {
    ...data,
    companyRepPassportUrl1: data.companyRepPassportUrl1File,
    companyRepCVUrl: data.companyRepCVUrlFile,
    companyCOIUrl: data.companyCOIUrlFile,
    companyRepPassportUrl2: data.companyRepPassportUrl2File,
    companyRepCVUrl2: data.companyRepCVUrl2File,
  }
  // const params = data
  return requestHandler(network.user.updateUserDetails)({ id, params, token })
}

// Registration process

const registrationFormValidationFunctions = [
  companyDetailsValidationFunctions,
  companyRepresentativesFormValidationFunctions,
]

const registrationFormsErrorMessages = [
  companyDetailsErrorMessages,
  companyRepresentativesErrorMessages,
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
    user: { companyName, companyAddress, companyPhone, companyBusiness },
  } = props
  const CompanyDetailsFormInitialValues = {
    companyName,
    companyAddress,
    companyPhone,
    companyBusiness,
    regState: 1,
  }
  const registrationFormsInitialValues = [
    CompanyDetailsFormInitialValues,
    companyRepresentativesFormInitialValues,
  ]
  const registrationForms = [CompanyDetailsForm, CompanyRepresentativesForm]

  const CurrentForm = registrationForms[registrationStage]
  const currenrFormInitialValues =
    registrationFormsInitialValues[registrationStage]
  const validationFunctions =
    registrationFormValidationFunctions[registrationStage]
  const errorMessages = registrationFormsErrorMessages[registrationStage]

  const registrationFormsSubmitFuntions = [
    params => {
      const { user: { id }, token } = auth
      return companyDetailsSubmit(params, { id, token }).then(() => {
        return getUserDetails(id, token)
      })
    },
    params => {
      const { user: { id }, token } = auth
      return companyRepresentativesSubmit(params, { id, token }).then(() => {
        return getUserDetails(id, token)
      })
    },
  ]
  const registrationSubmitCallbacks = [() => {}, () => {}, () => {}, () => {}]

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
              // console.error('custom', err)
              toast.error(err.message)
            })
            .then(() => {
              const { history, user: { regState } } = this.props

              if (Number(regState) === 8) history.push('/login')

              stateSetLoading(false)
              console.log()
            })
        }}
        validate={nameToValues => (
          console.log(nameToValues),
          validateInputs(nameToValues, validationFunctions, errorMessages)
        )}
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

export default withRouter(glueTo(FormManager))
