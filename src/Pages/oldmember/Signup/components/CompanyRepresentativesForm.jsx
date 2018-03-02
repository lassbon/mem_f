import React, { Component } from 'react'
import { connect } from 'react-redux'
import InputError from 'components/form/InputError'
import ButtonFixedWidthRadiusXS from 'components/buttons/ButtonFixedWidthRadiusXS'
import StyledInput from 'components/form/StyledInput'

import Uppy from 'uppy/lib/core'
import Dashboard from 'uppy/lib/plugins/Dashboard'
import XHRUpload from 'uppy/lib/plugins/XHRUpload'
import Form from 'uppy/lib/plugins/Form'
const FileInput = require('uppy/lib/plugins/FileInput')

const ProgressBar = require('uppy/lib/plugins/ProgressBar')
// import "uppy/uppy.min.css">

const BASEURL = 'https://acciapi.ml'

const imageRestrictions = () => ({
  maxFileSize: 1000 * 1000,
  maxNumberOfFiles: 1,
  minNumberOfFiles: 1,
  allowedFileTypes: ['image/*'],
})

const documentRestrictions = () => ({
  maxFileSize: 1000 * 5000,
  maxNumberOfFiles: 1,
  minNumberOfFiles: 1,
  allowedFileTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'docx',
  ],
})

const makeUppy = (
  { trigger, restrictions },
  { token, id, name, completeCallback }
) => {
  Uppy({
    autoProceed: false,
    restrictions,
  })
    .use(Dashboard, { trigger })
    .use(Form, { target: '#form' })
    .use(XHRUpload, {
      bundle: true,
      endpoint: `${BASEURL}/api/v1/user/${id}`,
      fieldName: name,
      formData: true,
      headers: {
        'Content-Type': 'application/form-data',
        Accept: 'application/form-data',
        authorization: token,
      },
      // metaFields: ['file'],
      method: 'put',
    })
    .run()
    .on('complete', result => {
      completeCallback(result)
      console.log('Upload result:', result)
    })
}

class CompanyRepresentativesForm extends Component {
  render() {
    const {
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      loading,
      loadingText,
      setFieldValue,
      token,
      touched,
      values,
    } = this.props
    return (
      <>
        <form id="form" action="" onSubmit={handleSubmit}>
          <ButtonFixedWidthRadiusXS loading={loading} loadingText={loadingText}>
            <span className="">Continue</span>
            <i className="ion-ios-arrow-thin-right ml-4" />
          </ButtonFixedWidthRadiusXS>
          <div className="lg:flex pb-4 mt-4">
            <div className="lg:w-1/2 mr-6">
              <fieldset className="mb-6">
                <label htmlFor="" className="mb-4 text-xs text-grey">
                  Representative's Name
                </label>
                <StyledInput
                  name="companyRepName1"
                  type="text"
                  placeholder="Full name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyRepName1}
                />
                <InputError
                  touched={touched.companyRepName1}
                  error={errors.companyRepName1}
                />
              </fieldset>
              <fieldset className="mb-6">
                <label htmlFor="" className="mb-4 text-xs text-grey">
                  Representative's Email
                </label>
                <StyledInput
                  name="companyRepEmail1"
                  type="text"
                  placeholder="Representative's Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyRepEmail1}
                />
                <InputError
                  touched={touched.companyRepEmail1}
                  error={errors.companyRepEmail1}
                />
              </fieldset>
              <fieldset className="mb-6">
                <label htmlFor="" className="mb-4 text-xs text-grey">
                  Representative's phone numer
                </label>
                <StyledInput
                  name="companyRepPhone1"
                  type="text"
                  placeholder="08000000000"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyRepPhone1}
                />
                <InputError
                  touched={touched.companyRepPhone1}
                  error={errors.companyRepPhone1}
                />
              </fieldset>
            </div>
            <div className="lg:w-1/2 lg:h-full ml-6">
              <span className="mb-4 text-xs text-grey-darker">Documents</span>
              <div className="p-4 py-6 bg-teal-lightest border border-grey-lighter border-solid rounder-sm">
                <fieldset className="">
                  <div
                    name="companyRepPassportUrl1"
                    id="companyRepPassportUrl1"
                    className="flex items-center justify-between mb-4 bg-white shadow rounded overflow-hidden border border-dashed border-grey cursor-pointer relative"
                  >
                    <div className="flex items-center p-2">
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
                        {values.companyRepPassportUrl1 ||
                          `Representative's Passport`}
                      </label>
                    </div>
                    <button
                      type="button"
                      className=" h-12 w-12 px-4 bg-pink-light text-base text-white"
                    >
                      <i className="ion-ios-cloud-upload-outline" />
                    </button>
                    <input
                      name="companyRepPassportUrl1"
                      id="companyRepPassportUrl1"
                      onChange={e => {
                        let reader = new FileReader()
                        let file = e.target.files[0]

                        reader.onloadend = () => {
                          setFieldValue(
                            'companyRepPassportUrl1File',
                            reader.result
                          )
                        }
                        reader.readAsDataURL(file)

                        handleChange(e)
                      }}
                      onBlur={handleBlur}
                      type="file"
                      className="absolute pin-t pin-l w-full h-full opacity-0"
                    />
                  </div>

                  <InputError
                    touched={touched.companyRepPassportUrl1}
                    error={errors.companyRepPassportUrl1}
                  />

                  <div
                    name="companyRepCVUrl"
                    id="companyRepCVUrl"
                    className="flex items-center justify-between mb-4 bg-white shadow rounded overflow-hidden border border-dashed border-grey cursor-pointer relative"
                  >
                    <div className="flex items-center p-2">
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
                        {values.companyRepCVUrl || `Rep's Curriculum Vitae`}
                      </label>
                    </div>

                    <button
                      type="button"
                      className=" h-12 w-12 px-4 bg-pink-light text-base text-white"
                    >
                      <i className="ion-ios-cloud-upload-outline" />
                    </button>
                    <input
                      name="companyRepCVUrl"
                      id="companyRepCVUrl"
                      onChange={e => {
                        let reader = new FileReader()
                        let file = e.target.files[0]

                        reader.onloadend = () => {
                          setFieldValue('companyRepCVUrlFile', reader.result)
                        }
                        reader.readAsDataURL(file)

                        handleChange(e)
                      }}
                      onBlur={handleBlur}
                      type="file"
                      className="absolute pin-t pin-l w-full h-full opacity-0"
                    />
                  </div>
                  <InputError
                    touched={touched.companyRepCVUrl}
                    error={errors.companyRepCVUrl}
                  />

                  <div
                    name="companyCOIUrl"
                    id="companyCOIUrl"
                    className="flex items-center justify-between bg-white shadow rounded overflow-hidden border border-dashed border-grey cursor-pointer relative"
                  >
                    <div className="flex items-center p-2">
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
                        {values.companyCOIUrl || `Company's CAC`}
                      </label>
                    </div>

                    <button
                      type="button"
                      className=" h-12 w-12 px-4 bg-pink-light text-base text-white"
                    >
                      <i className="ion-ios-cloud-upload-outline" />
                    </button>
                    <input
                      name="companyCOIUrl"
                      id="companyCOIUrl"
                      onChange={e => {
                        handleChange(e)

                        let reader = new FileReader()
                        let file = e.target.files[0]

                        reader.onloadend = () => {
                          setFieldValue('companyCOIUrlFile', reader.result)
                        }
                        reader.readAsDataURL(file)
                      }}
                      onBlur={handleBlur}
                      type="file"
                      className="absolute pin-t pin-l w-full h-full opacity-0"
                    />
                  </div>

                  <InputError
                    touched={touched.companyCOIUrl}
                    error={errors.companyCOIUrl}
                  />
                </fieldset>
              </div>
            </div>
          </div>
          <div className="lg:flex lg:flex-wrap p-4 px-8 mt-4 bg-grey-lightest">
            <div className="w-full mb-4 p-2 bg-purple-lighter text-white rounded-sm">
              Representative 2: Optional
            </div>
            <div className="lg:w-1/2 mr-6">
              <fieldset className="mb-6">
                <label htmlFor="" className="mb-4 text-xs text-grey">
                  Representative's Name
                </label>
                <StyledInput
                  name="companyRepName2"
                  type="text"
                  placeholder="Full name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyRepName2}
                />
                <InputError
                  touched={touched.companyRepName2}
                  error={errors.companyRepName2}
                />
              </fieldset>
              <fieldset className="mb-6">
                <label htmlFor="" className="mb-4 text-xs text-grey">
                  Representative's Email
                </label>
                <StyledInput
                  name="companyRepEmail2"
                  type="text"
                  placeholder="Representative's Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyRepEmail2}
                />
                <InputError
                  touched={touched.companyRepEmail2}
                  error={errors.companyRepEmail2}
                />
              </fieldset>
              <fieldset className="mb-6">
                <label htmlFor="" className="mb-4 text-xs text-grey">
                  Representative's phone numer
                </label>
                <StyledInput
                  name="companyRepPhone2"
                  type="text"
                  placeholder="08000000000"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyRepPhone2}
                />
                <InputError
                  touched={touched.companyRepPhone2}
                  error={errors.companyRepPhone2}
                />
              </fieldset>
            </div>
            <div className="flex-grow lg:h-full ml-6">
              <span className="mb-4 text-xs text-grey-darker">Documents</span>
              <div className="p-4 py-6 bg-teal-lightest border border-grey-lighter border-solid rounder-sm">
                <fieldset className="">
                  <div
                    name="companyRepPassportUrl2"
                    id="companyRepPassportUrl2"
                    className="flex items-center justify-between mb-4 bg-white shadow rounded overflow-hidden border border-dashed border-grey cursor-pointer relative"
                  >
                    <div className="flex items-center p-2">
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
                        {values.companyRepPassportUrl2 ||
                          `Representative's Passport`}
                      </label>
                      <input
                        name="companyRepPassportUrl2"
                        id="companyRepPassportUrl2"
                        onChange={e => {
                          handleChange(e)

                          let reader = new FileReader()
                          let file = e.target.files[0]

                          reader.onloadend = () => {
                            setFieldValue(
                              'companyRepPassportUrl2File',
                              reader.result
                            )
                          }
                          reader.readAsDataURL(file)
                        }}
                        type="file"
                        className="absolute pin-t pin-l w-full h-full opacity-0"
                      />
                    </div>
                    <button
                      type="button"
                      className=" h-12 w-12 px-4 bg-pink-light text-base text-white"
                    >
                      <i className="ion-ios-cloud-upload-outline" />
                    </button>
                  </div>

                  <InputError
                    touched={touched.companyRepPassportUrl2}
                    error={errors.companyRepPassportUrl2}
                  />

                  <div
                    name="companyRepCVUrl2"
                    id="companyRepCVUrl2"
                    className="flex items-center justify-between mb-4 bg-white shadow rounded overflow-hidden border border-dashed border-grey cursor-pointer relative"
                  >
                    <div className="flex items-center p-2">
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
                        {values.companyRepCVUrl2 || `Rep's Curriculum Vitae`}
                      </label>
                      <input
                        name="companyRepCVUrl2"
                        id="companyRepCVUrl2"
                        onChange={e => {
                          handleChange(e)

                          let reader = new FileReader()
                          let file = e.target.files[0]

                          reader.onloadend = () => {
                            setFieldValue('companyRepCVUrl2File', reader.result)
                          }
                          reader.readAsDataURL(file)
                        }}
                        type="file"
                        className="absolute pin-t pin-l w-full h-full opacity-0"
                      />
                    </div>

                    <button
                      type="button"
                      className=" h-12 w-12 px-4 bg-pink-light text-base text-white"
                    >
                      <i className="ion-ios-cloud-upload-outline" />
                    </button>
                  </div>
                  <InputError
                    touched={touched.companyRepCVUrl2}
                    error={errors.companyRepCVUrl2}
                  />
                </fieldset>
              </div>
            </div>
          </div>
        </form>
      </>
    )
  }
  componentDidMount() {
    const { token, id, setFieldValue } = this.props
    // const passport = makeUppy(
    //   {
    //     trigger: '#representativePassport',
    //     restrictions: imageRestrictions(),
    //   },
    //   {
    //     token,
    //     id,

    //     name: 'companyRepPassportUrl1',
    //     completeCallback: result => {
    //       if (result.successful.length < 1) return
    //       setFieldValue('representativePassport', 'uploaded')
    //     },
    //   }
    // )
    // makeUppy(
    //   {
    //     trigger: '#representativeCV',
    //     restrictions: documentRestrictions(),
    //   },
    //   {
    //     token,
    //     id,

    //     name: 'companyRepCVurl1',
    //     completeCallback: result => {
    //       if (result.successful.length < 1) return
    //       setFieldValue('representativeCV', 'uploaded')
    //     },
    //   }
    // )
    // makeUppy(
    //   {
    //     trigger: '#CAC',
    //     restrictions: documentRestrictions(),
    //   },
    //   {
    //     token,
    //     id,
    //     name: 'companyCOIUrl',
    //     completeCallback: result => {
    //       if (result.successful.length < 1) return
    //       setFieldValue('CAC', 'uploaded')
    //     },
    //   }
    // )
  }
}

const mapStateToProps = ({ auth: { token, user: { id } } }) => ({
  token,
  id,
})

const glueTo = connect(mapStateToProps, null)

export default glueTo(CompanyRepresentativesForm)
