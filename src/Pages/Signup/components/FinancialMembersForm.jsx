import React from 'react'
import InputError from 'components/form/InputError'
import ButtonFixedWidthRadiusXS from 'components/buttons/ButtonFixedWidthRadiusXS'
import StyledInput from 'components/form/StyledInput'

const FinancialMembersForm = ({
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
        <h4 className="mb-4 text-xs text-grey-darkest hind uppercase">
          Financial member 1
        </h4>
        <fieldset className="mb-6">
          <label htmlFor="" className="mb-4 text-xs text-grey">
            Representative's Name
          </label>
          <StyledInput
            name="representativeName1"
            type="text"
            placeholder="Full name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.representativeName1}
          />
          <InputError
            touched={touched.representativeName1}
            error={errors.representativeName1}
          />
        </fieldset>
        <fieldset className="mb-6">
          <label htmlFor="" className="mb-4 text-xs text-grey">
            Representative's Email
          </label>
          <StyledInput
            name="representativesEmail1"
            type="text"
            placeholder="Representative's Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.representativesEmail1}
          />
          <InputError
            touched={touched.representativesEmail1}
            error={errors.representativesEmail1}
          />
        </fieldset>
      </div>
      <div className="lg:w-1/2 lg:h-full ml-6">
        <h4 className="mb-4 text-xs text-grey-darkest hind uppercase">
          Financial member 2
        </h4>
        <fieldset className="mb-6">
          <label htmlFor="" className="mb-4 text-xs text-grey">
            Representative's Name
          </label>
          <StyledInput
            name="representativeName1"
            type="text"
            placeholder="Full name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.representativeName1}
          />
          <InputError
            touched={touched.representativeName1}
            error={errors.representativeName1}
          />
        </fieldset>
        <fieldset className="mb-6">
          <label htmlFor="" className="mb-4 text-xs text-grey">
            Representative's Email
          </label>
          <StyledInput
            name="representativesEmail1"
            type="text"
            placeholder="Representative's Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.representativesEmail1}
          />
          <InputError
            touched={touched.representativesEmail1}
            error={errors.representativesEmail1}
          />
        </fieldset>
      </div>
    </div>

    <ButtonFixedWidthRadiusXS>
      <span className="">Continue</span>
      <i className="ion-ios-arrow-thin-right ml-4" />
    </ButtonFixedWidthRadiusXS>
  </form>
)

export default FinancialMembersForm
