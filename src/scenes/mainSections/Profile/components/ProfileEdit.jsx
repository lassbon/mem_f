// Vendor
import React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { String } from 'valib'

// Components
import InputError from 'components/form/InputError'
import ButtonFixedWidthRadiusXS from 'components/buttons/ButtonFixedWidthRadiusXS'
import StyledInput from 'components/form/StyledInput'

// Helpers

import requestHandler from 'helpers/requestHandler'
import { receivedUserDetails } from 'redux/action_creators'
import { notEmptyOrNumber, validatePhoneNumer } from 'helpers/validation'
const makeBool = val => !!val

const initialValues = {
  email: '',
  companyAddress: '',
  companyPhone: '',
  profileImage: '',
}

const formValidationFunctions = {
  email: String.isEmailLike,
  companyAddress: notEmptyOrNumber,
  companyPhone: validatePhoneNumer,
  profileImage: notEmptyOrNumber,
}

const formErrors = {
  email: 'Please enter a valid email address',
  companyAddress: 'Please enter a valid physical address',
  companyPhone: 'Please enter a valid 11 digit phone number',
  profileImage: 'Please add a profile picture',
}

const submitCallback = companyDetailsResponse => toast.success('Details')

const ProfileEdit = ({
  auth: { token },
  stateSetEdit,
  updateUserDetails,
  user: { companyAddress, companyPhone, email, id, profileImage },
}) => (
  <div className="">
    <Formik
      initialValues={{ companyAddress, companyPhone, email, profileImage }}
      onSubmit={values => {
        updateUserDetails(id, values, token).then(() => {
          stateSetEdit(false)
        })
      }}
      render={props => <Form {...props} />}
    />
    <button
      onClick={() => stateSetEdit(false)}
      type="button"
      className="mt-4 px-4 py-2 bg-red-light text-white"
    >
      Cancel
    </button>
  </div>
)

const Form = ({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  touched,
  values,
}) => (
  <form className="p-8 lg:px-12" onSubmit={handleSubmit}>
    <fieldset className="mb-6">
      <label htmlFor="" className="mb-4 text-xs text-grey">
        Profile Image
      </label>
      <StyledInput
        disabled
        name="profileImage"
        type="text"
        placeholder="Profile Image"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.profileImage}
      />
      <InputError touched={touched.profileImage} error={errors.profileImage} />
    </fieldset>
    <fieldset className="mb-6">
      <label htmlFor="" className="mb-4 text-xs text-grey">
        Company's Email
      </label>
      <StyledInput
        name="email"
        type="text"
        placeholder="Email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
      />
      <InputError touched={touched.email} error={errors.email} />
    </fieldset>
    <fieldset className="mb-6">
      <label htmlFor="" className="mb-4 text-xs text-grey">
        Company's Address
      </label>
      <StyledInput
        name="companyAddress"
        type="text"
        placeholder="Company address"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.companyAddress}
      />
      <InputError
        touched={touched.companyAddress}
        error={errors.companyAddress}
      />
    </fieldset>
    <fieldset className="mb-6">
      <label htmlFor="" className="mb-4 text-xs text-grey">
        Company's Phone number
      </label>
      <StyledInput
        name="companyPhone"
        type="text"
        placeholder="08000000000"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.companyPhone}
      />
      <InputError touched={touched.companyPhone} error={errors.companyPhone} />
    </fieldset>
    <ButtonFixedWidthRadiusXS>
      <span className="">Save</span>
      <i className="ion-ios-cloud-upload-outline ml-4" />
    </ButtonFixedWidthRadiusXS>
  </form>
)

const mapStateToProps = ({ auth, user }) => ({
  auth,
  user,
})

const mapDispatchToProps = dispatch => ({
  updateUserDetails: (id, params, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      const response = await requestHandler(network.user.updateUserDetails)({
        id,
        params,
        token,
      })
      if (response.status === 'success') dispatch(receivedUserDetails(params))
      return Promise.resolve(response)
    }),
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default glueTo(ProfileEdit)
