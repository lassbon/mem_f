import React, { Component } from 'react'
import InputError from 'components/form/InputError'
import ButtonFixedWidthRadiusXS from 'components/buttons/ButtonFixedWidthRadiusXS'
import StyledInput from 'components/form/StyledInput'

import Uppy from 'uppy/lib/core'
import Dashboard from 'uppy/lib/plugins/Dashboard'
import Tus from 'uppy/lib/plugins/Tus'

const BASEURL = 'http://membership-api.accinigeria.com/'

class CompanyRepresentativesForm extends Component {
  render() {
    const {
      handleSubmit,
      values,
      handleBlur,
      touched,
      errors,
      handleChange,
    } = this.props
    return (
      <form action="" onSubmit={handleSubmit}>
        <div className="lg:flex pb-4">
          <div className="lg:w-1/2 mr-6">
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
            <fieldset className="mb-6">
              <label htmlFor="" className="mb-4 text-xs text-grey">
                Representative's phone numer
              </label>
              <StyledInput
                name="representativePhone1"
                type="text"
                placeholder="08000000000"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.representativePhone1}
              />
              <InputError
                touched={touched.representativePhone1}
                error={errors.representativePhone1}
              />
            </fieldset>
          </div>
          <div className="lg:w-1/2 lg:h-full ml-6">
            <span className="mb-4 text-xs text-grey-darker">Documents</span>
            <div className="p-4 py-6 bg-teal-lightest border border-grey-lighter border-solid rounder-sm">
              <fieldset className="">
                <div className="flex items-center justify-between mb-4 bg-white shadow rounded overflow-hidden border border-dashed border-grey cursor-pointer">
                  <div
                    id="representativePassport"
                    className="flex items-center p-2"
                  >
                    <i className="inline-block h-8 mr-2">
                      <img
                        src="/static/images/jpg.svg"
                        alt=""
                        className="w-auto h-full"
                      />
                    </i>
                    <i className="inline-block h-8 mr-2">
                      <img
                        src="/static/images/png.svg"
                        alt=""
                        className="w-auto h-full"
                      />
                    </i>
                    <label htmlFor="" className=" text-sm text-grey-darker">
                      Representative's Passport
                    </label>
                  </div>

                  <button className=" h-12 w-12 px-4 bg-pink-light text-base text-white">
                    <i className="ion-ios-cloud-upload-outline" />
                  </button>
                </div>

                <div className="flex items-center justify-between mb-4 bg-white shadow rounded overflow-hidden border border-dashed border-grey cursor-pointer">
                  <div
                    id="representativePassport"
                    className="flex items-center p-2"
                  >
                    <i className="inline-block h-8 mr-2">
                      <img
                        src="/static/images/pdf.svg"
                        alt=""
                        className="w-auto h-full"
                      />
                    </i>
                    <i className="inline-block h-8 mr-2">
                      <img
                        src="/static/images/doc.svg"
                        alt=""
                        className="w-auto h-full"
                      />
                    </i>
                    <label htmlFor="" className=" text-sm text-grey-darker">
                      Rep's Curriculum Vitae
                    </label>
                  </div>

                  <button className=" h-12 w-12 px-4 bg-pink-light text-base text-white">
                    <i className="ion-ios-cloud-upload-outline" />
                  </button>
                </div>

                <div className="flex items-center justify-between bg-white shadow rounded overflow-hidden border border-dashed border-grey cursor-pointer">
                  <div
                    id="representativePassport"
                    className="flex items-center p-2"
                  >
                    <i className="inline-block h-8 mr-2">
                      <img
                        src="/static/images/pdf.svg"
                        alt=""
                        className="w-auto h-full"
                      />
                    </i>
                    <i className="inline-block h-8 mr-2">
                      <img
                        src="/static/images/doc.svg"
                        alt=""
                        className="w-auto h-full"
                      />
                    </i>
                    <label htmlFor="" className=" text-sm text-grey-darker">
                      Company's CAC
                    </label>
                  </div>

                  <button className=" h-12 w-12 px-4 bg-pink-light text-base text-white">
                    <i className="ion-ios-cloud-upload-outline" />
                  </button>
                </div>

                <InputError
                  touched={touched.representativePassport}
                  error={errors.representativePassport}
                />
              </fieldset>
            </div>
          </div>
        </div>

        <ButtonFixedWidthRadiusXS>
          <span className="">Continue</span>
          <i className="ion-ios-arrow-thin-right ml-4" />
        </ButtonFixedWidthRadiusXS>
      </form>
    )
  }
  componentDidMount() {
    Uppy({ autoProceed: false })
      .use(Dashboard, { trigger: '#representativePassport' })
      .use(Tus, { endpoint: `${BASEURL}api/v1/user/upload` })
      .run()
      .on('complete', result => {
        console.log('Upload result:', result)
      })
  }
}

export default CompanyRepresentativesForm
