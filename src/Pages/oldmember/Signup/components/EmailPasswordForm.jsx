import React from 'react'
import InputError from 'components/form/InputError'
import ButtonFixedWidthRadiusXS from 'components/buttons/ButtonFixedWidthRadiusXS'
import StyledInput from 'components/form/StyledInput'

const EmailPasswordForm = ({
  handleSubmit,
  values,
  handleBlur,
  touched,
  errors,
  handleChange,
  loading,
  loadingText,
}) => {
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="pb-4">
        <fieldset className="lg:w-1/2 mb-6">
          <label htmlFor="" className="mb-4 text-xs text-grey">
            Company E-mail
          </label>
          <StyledInput
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <InputError touched={touched.email} error={errors.email} />
        </fieldset>
        <div className="lg:flex">
          <fieldset className="lg:w-1/2 block mr-3 mb-6">
            <label htmlFor="" className="mb-4 text-xs text-grey">
              Password
            </label>
            <StyledInput
              name="password"
              type="password"
              placeholder="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <InputError touched={touched.password} error={errors.password} />
          </fieldset>
          <fieldset className="lg:w-1/2 flex-1 block ml-3 mb-6">
            <label htmlFor="" className="mb-4 text-xs text-grey">
              Confirm Password
            </label>
            <StyledInput
              name="confirmPassword"
              type="password"
              placeholder="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />
            <InputError
              touched={touched.confirmPassword}
              error={errors.confirmPassword}
            />
          </fieldset>
        </div>
      </div>

      <ButtonFixedWidthRadiusXS loading={loading} loadingText={loadingText}>
        <span className="">Continue</span>
        <i className="ion-ios-arrow-thin-right ml-4" />
      </ButtonFixedWidthRadiusXS>
    </form>
  )
}

export default EmailPasswordForm
