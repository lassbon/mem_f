import React from 'react'
import { Formik } from 'formik'
import { String } from 'valib'
import InputError from 'components/form/InputError'

// Registration forms

import EmailPasswordForm from 'EmailPasswordForm'
import CompanyDetailsForm from 'CompanyDetailsForm'
import CompanyRepresentativesForm from 'CompanyRepresentativesForm'
import FinancialMembersForm from 'FinancialMembersForm'

const minPasswordLength = 6

// Email and Password Form stuff

const emailPasswordFormInitialValues = {
  email: 'sample@email.com',
  password: '',
  confirmPassword: '',
}

const emailPasswordValidationFunctions = {
  email: String.isEmailLike,
  password: password => String.length.gte(password, minPasswordLength),
  confirmPassword: password => String.length.gte(password, minPasswordLength),
}

const emailPasswordErrorMessages = {
  email: 'Please enter a valid email.',
  password: 'Please enter a password that is at least 6 characters.',
  confirmPassword: '',
}

// Company details form stuff

const CompanyDetailsFormInitialValues = {
  companyName: '',
  companyAddress: '',
  companyPhone: '',
  companyBusiness: '',
}

const companyDetailsValidationFunctions = {
  companyName: () => true,
  companyAddress: () => true,
  companyPhone: () => true,
  companyBusiness: () => true,
}

const companyDetailsErrorMessages = {
  companyName: '',
  companyAddress: '',
  companyPhone: '',
  companyBusiness: '',
}

// Company representatives form stuff

const companyRepresentativesFormInitialValues = {
  rep1Name: '',
  rep1Email: '',
  rep1PhoneNumber: '',
  rep1Passport: '',
  rep1CV: '',
  CAC: '',
}

const companyRepresentativesFormValidationFunctions = {
  rep1Name: null,
  rep1Email: null,
  rep1PhoneNumber: null,
  rep1Passport: null,
  rep1CV: null,
  CAC: null,
}

const companyRepresentativesErrorMessages = {
  representativeName1: '',
  representativeEmail1: '',
  representativePhone1: '',
  rep1Passport: '',
  rep1CV: '',
  CAC: '',
}

// Financial members form stuff

const financialMembersFormInitialValues = {
  financialMemberName1: '',
  financialMemberEmail1: '',
  financialMemberName2: '',
  financialMemberEmail2: '',
}

const financialMembersFormValidationFunctions = {
  financialMemberName1: '',
  financialMemberEmail1: '',
  financialMemberName2: '',
  financialMemberEmail2: '',
}

const financialMembersErrorMessages = {
  financialMemberName1: '',
  financialMemberEmail1: '',
  financialMemberName2: '',
  financialMemberEmail2: '',
}

// Registration process

const registrationForms = [
  EmailPasswordForm,
  CompanyDetailsForm,
  CompanyRepresentativesForm,
  FinancialMembersForm,
  EmailPasswordForm,
]

const registrationFormsInitialValues = [
  emailPasswordFormInitialValues,
  CompanyDetailsFormInitialValues,
  companyRepresentativesFormInitialValues,
  financialMembersFormInitialValues,
]

const registrationFormValidationFunctions = [
  emailPasswordValidationFunctions,
  companyDetailsValidationFunctions,
  companyRepresentativesFormValidationFunctions,
  financialMembersFormValidationFunctions,
]

const registrationFormsErrorMessages = [
  emailPasswordErrorMessages,
  companyDetailsErrorMessages,
  companyRepresentativesErrorMessages,
  financialMembersErrorMessages,
]

// Registration helper functions

const validateInputs = (nameToValues, validationFunctions, errorMessages) =>
  Object.keys(nameToValues).reduce((acc, key) => {
    const validator = validationFunctions[key]
    if (typeof validator !== 'function') return acc
    const value = nameToValues[key]
    const good = validator(value)
    return good ? acc : { ...acc, [key]: errorMessages[key] }
  }, {})

// COMPONENT!!!

const FormManager = props => {
  const { registrationStage } = props
  const CurrentForm = registrationForms[registrationStage]
  const currenrFormInitialValues =
    registrationFormsInitialValues[registrationStage]
  const validationFunctions =
    registrationFormValidationFunctions[registrationStage]
  const errorMessages = registrationFormsErrorMessages[registrationStage]

  return (
    <Formik
      initialValues={currenrFormInitialValues}
      onSubmit={(values, actions) => {
        console.log('submit', values, actions)
      }}
      validate={nameToValues =>
        validateInputs(nameToValues, validationFunctions, errorMessages)
      }
      render={props => <CurrentForm {...props} />}
    />
  )
}

export default FormManager
