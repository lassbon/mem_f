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
        <div className="lg:flex">
        <fieldset className="lg:w-1/2 block lg:mr-3 mb-6">
          <label htmlFor="" className="mb-4 text-xs text-grey">
            Your Name
          </label>
          <StyledInput
            name="companyName"
            type="text"
            placeholder="Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.companyName}
          />
          <InputError
            touched={touched.companyName}
            error={errors.companyName}
          />
        </fieldset>
        <fieldset className="lg:w-1/2 flex-1 block lg:ml-3 mb-6">
          <label htmlFor="" className="mb-4 text-xs text-grey">
            Your E-mail
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
        </div>
        <div className="lg:flex">
        <fieldset className="lg:w-1/2 block lg:mr-3 mb-6">
          <label htmlFor="" className="mb-4 text-xs text-grey">
            Your Phone number
          </label>
          <StyledInput
            name="companyPhone"
            type="text"
            placeholder="08000000000"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.companyPhone}
          />
          <InputError
            touched={touched.companyPhone}
            error={errors.companyPhone}
          />
        </fieldset>
        <fieldset className="lg:w-1/2 flex-1 block lg:ml-3 mb-6">
          <label htmlFor="" className="mb-4 text-xs text-grey">
            Your Address<span>(Optional)</span>
          </label>
          <StyledInput
            name="companyAddress"
            type="text"
            placeholder="Your address"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.companyAddress}
          />
          <InputError
            touched={touched.companyAddress}
            error={errors.companyAddress}
          />
        </fieldset>
        </div>
        <div className="lg:flex">
          <fieldset className="lg:w-1/2 block lg:mr-3 mb-6">
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
          <fieldset className="lg:w-1/2 flex-1 block lg:ml-3 mb-6">
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
