import React from 'react'
import InputError from 'components/form/InputError'
import ButtonFixedWidthRadiusXS from 'components/buttons/ButtonFixedWidthRadiusXS'
import StyledInput from 'components/form/StyledInput'

const FinancialMembersForm = ({
  handleSubmit,
  loading,
  loadingText,
  values,
  handleBlur,
  touched,
  errors,
  handleChange,
  setFieldValue,
  setFieldTouched,
}) => (
  <form action="" onSubmit={handleSubmit}>
    <div className="lg:flex pb-4">
      <div className="lg:w-1/2 mr-6">
        <h4 className="mb-4 text-xs text-grey-darkest hind uppercase">
          Financial member 1
        </h4>
        <fieldset className="mb-6">
          <label htmlFor="" className="mb-4 text-xs text-grey">
            Representative's ID
          </label>
          <StyledInput
            name="financialMemberId1"
            type="text"
            placeholder="Member's ID"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.financialMemberId1}
          />
          <InputError
            touched={touched.financialMemberId1}
            error={errors.financialMemberId1}
          />
        </fieldset>
        <fieldset className="mb-6">
          <label htmlFor="" className="mb-4 text-xs text-grey">
            Representative's Email
          </label>
          <StyledInput
            name="financialMemberEmail1"
            type="text"
            placeholder="Representative's Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.financialMemberEmail1}
          />
          <InputError
            touched={touched.financialMemberEmail1}
            error={errors.financialMemberEmail1}
          />
        </fieldset>
      </div>
      <div className="lg:w-1/2 lg:h-full ml-6">
        <h4 className="mb-4 text-xs text-grey-darkest hind uppercase">
          Financial member 2
        </h4>
        <fieldset className="mb-6">
          <label htmlFor="" className="mb-4 text-xs text-grey">
            Representative's ID
          </label>
          <StyledInput
            name="financialMemberId2"
            type="text"
            placeholder="Member's ID"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.financialMemberId2}
          />
          <InputError
            touched={touched.financialMemberId2}
            error={errors.financialMemberId2}
          />
        </fieldset>
        <fieldset className="mb-6">
          <label htmlFor="" className="mb-4 text-xs text-grey">
            Representative's Email
          </label>
          <StyledInput
            name="financialMemberEmail2"
            type="text"
            placeholder="Representative's Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.financialMemberEmail2}
          />
          <InputError
            touched={touched.financialMemberEmail2}
            error={errors.financialMemberEmail2}
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

export default FinancialMembersForm
