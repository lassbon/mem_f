import React from 'react'
import InputError from 'components/form/InputError'
import ButtonFixedWidthRadiusXS from 'components/buttons/ButtonFixedWidthRadiusXS'
import StyledInput from 'components/form/StyledInput'

const tradeGroups = [
  'Agriculture',
  'Air Transport',
  'Air Transport Unions',
  'Airlines',
  'Alcoholic Beverages',
  'Alternative Energy Production & Services',
  'Architectural Services',
  'Attorneys/Law Firms',
  'Auto Dealers',
  'Auto Manufacturers',
  'Automotive',
  'Banking',
  'Bars & Restaurants',
  'Beer',
]

const employees = [
  '1 - 10',
  '11 - 20',
  '21 - 40',
  '41 - 80',
  '81 - 100',
  '100 and above',
]

const returns = [
  'N100,000 - N500,000',
  'N501,000 - N1,000,000',
  'N1,000,001 - N3,000,000',
  'N3,000,001 - N5,000,000',
  'N5,000,001 - N10,000,000',
  'N100,000,001 and above',
]

const CompanyDetailsForm = ({
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
          <select
            name="companyBusiness"
            id="companyBusiness"
            className="w-full p-4 py-3 roboto text-base tracking-wide capitalize border border-grey-light border-solid rounded-sm"
            onChange={handleChange}
            onBlur={handleBlur}
            defaultValue=""
          >
            {[
              <option key="placeholder" value="" disabled>
                Select a trade group
              </option>,
              ...tradeGroups.map(value => (
                <option key={value} value={value}>
                  {value}
                </option>
              )),
            ]}
          </select>
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
              Number of employees
            </label>
            <select
              name="employees"
              id="employees"
              className="w-full p-4 py-3 roboto text-base tracking-wide capitalize border border-grey-light border-solid rounded-sm"
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue=""
            >
              {[
                <option key="placeholder" value="" disabled>
                  Select employee size
                </option>,
                ...employees.map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                )),
              ]}
            </select>
            <InputError touched={touched.employees} error={errors.employees} />
          </fieldset>
          <fieldset className="mb-6">
            <label htmlFor="" className="mb-4 text-xs text-grey">
              Company's Annual Return
            </label>
            <select
              name="annualReturn"
              id="annualReturn"
              className="w-full p-4 py-3 roboto text-base tracking-wide capitalize border border-grey-light border-solid rounded-sm"
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue=""
            >
              {[
                <option key="placeholder" value="" disabled>
                  Select annual return range
                </option>,
                ...returns.map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                )),
              ]}
            </select>
            <InputError
              touched={touched.annualReturn}
              error={errors.annualReturn}
            />
          </fieldset>
          <fieldset className="mb-6">
            <label htmlFor="" className="mb-4 text-xs text-grey">
              Company's Annual Profit
            </label>
            <select
              name="annualProfit"
              id="annualProfit"
              className="w-full p-4 py-3 roboto text-base tracking-wide capitalize border border-grey-light border-solid rounded-sm"
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue=""
            >
              {[
                <option key="placeholder" value="" disabled>
                  Select annual profit range
                </option>,
                ...returns.map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                )),
              ]}
            </select>
            <InputError
              touched={touched.annualProfit}
              error={errors.annualProfit}
            />
          </fieldset>
        </div>
      </div>
    </div>

    <ButtonFixedWidthRadiusXS
      className="w-1/2"
      loading={loading}
      loadingText={loadingText}
    >
      <span className="">Continue</span>
      <i className="ion-ios-arrow-thin-right ml-4" />
    </ButtonFixedWidthRadiusXS>
  </form>
)

export default CompanyDetailsForm
