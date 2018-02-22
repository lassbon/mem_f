import React from 'react'
import InputError from 'components/form/InputError'
import ButtonFixedWidthRadiusXS from 'components/buttons/ButtonFixedWidthRadiusXS'
import StyledInput from 'components/form/StyledInput'

const CompanyDetailsForm = ({
  handleSubmit,
  values,
  handleBlur,
  touched,
  errors,
  handleChange,
}) => (
  <form action="" onSubmit={handleSubmit}>
    <div className="lg:flex pb-4">
      <div className="lg:w-1/2 mr-6">
        <fieldset className="mb-6">
          <label htmlFor="" className="mb-4 text-xs text-grey">
            Company Name
          </label>
          <StyledInput
            name="companyName"
            type="text"
            placeholder="Company name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.companyName}
          />
          <InputError
            touched={touched.companyName}
            error={errors.companyName}
          />
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
          <InputError
            touched={touched.companyPhone}
            error={errors.companyPhone}
          />
        </fieldset>
        <fieldset className="mb-6">
          <label htmlFor="" className="mb-4 text-xs text-grey">
            Company's Business
          </label>
          <StyledInput
            name="companyBusiness"
            type="text"
            placeholder="Company Business"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.companyBusiness}
          />
          <InputError
            touched={touched.companyBusiness}
            error={errors.companyBusiness}
          />
        </fieldset>
      </div>
      <div className="lg:w-1/2 lg:h-full ml-6">
        <span className="mb-4 text-xs text-grey-darker">Earnings and Size</span>
        <div className="p-4 bg-teal-lightest border border-grey-lighter border-solid">
          <fieldset className="mb-6">
            <label htmlFor="" className="mb-4 text-xs text-grey">
              Company's Business
            </label>
            <StyledInput
              name="companyBusiness"
              type="text"
              placeholder="Company Business"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.companyBusiness}
            />
            <InputError
              touched={touched.companyBusiness}
              error={errors.companyBusiness}
            />
          </fieldset>
          <fieldset className="mb-6">
            <label htmlFor="" className="mb-4 text-xs text-grey">
              Company's Business
            </label>
            <StyledInput
              name="companyBusiness"
              type="text"
              placeholder="Company Business"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.companyBusiness}
            />
            <InputError
              touched={touched.companyBusiness}
              error={errors.companyBusiness}
            />
          </fieldset>
          <fieldset className="mb-6">
            <label htmlFor="" className="mb-4 text-xs text-grey">
              Company's Business
            </label>
            <StyledInput
              name="companyBusiness"
              type="text"
              placeholder="Company Business"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.companyBusiness}
            />
            <InputError
              touched={touched.companyBusiness}
              error={errors.companyBusiness}
            />
          </fieldset>
        </div>
      </div>
    </div>

    <ButtonFixedWidthRadiusXS className="w-1/2">
      <span className="">Continue</span>
      <i className="ion-ios-arrow-thin-right ml-4" />
    </ButtonFixedWidthRadiusXS>
  </form>
)

export default CompanyDetailsForm
