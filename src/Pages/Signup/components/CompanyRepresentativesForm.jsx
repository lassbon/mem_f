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
                  name="representativeEmail1"
                  type="text"
                  placeholder="Representative's Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.representativeEmail1}
                />
                <InputError
                  touched={touched.representativeEmail1}
                  error={errors.representativeEmail1}
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
                  <div
                    name="files"
                    id="representativePassport"
                    className="flex items-center justify-between mb-4 bg-white shadow rounded overflow-hidden border border-dashed border-grey cursor-pointer"
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
                        Representative's Passport
                      </label>
                    </div>
                    <button
                      type="button"
                      className=" h-12 w-12 px-4 bg-pink-light text-base text-white"
                    >
                      <i className="ion-ios-cloud-upload-outline" />
                    </button>
                  </div>

                  <InputError
                    touched={touched.representativePassport}
                    error={errors.representativePassport}
                  />

                  <div
                    name="file"
                    id="representativeCV"
                    className="flex items-center justify-between mb-4 bg-white shadow rounded overflow-hidden border border-dashed border-grey cursor-pointer"
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
                        Rep's Curriculum Vitae
                      </label>
                    </div>

                    <button
                      type="button"
                      className=" h-12 w-12 px-4 bg-pink-light text-base text-white"
                    >
                      <i className="ion-ios-cloud-upload-outline" />
                    </button>
                  </div>
                  <InputError
                    touched={touched.representativeCV}
                    error={errors.representativeCV}
                  />

                  <div
                    name="file"
                    id="CAC"
                    className="flex items-center justify-between bg-white shadow rounded overflow-hidden border border-dashed border-grey cursor-pointer"
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
                        Company's CAC
                      </label>
                    </div>

                    <button
                      type="button"
                      className=" h-12 w-12 px-4 bg-pink-light text-base text-white"
                    >
                      <i className="ion-ios-cloud-upload-outline" />
                    </button>
                  </div>

                  <InputError touched={touched.CAC} error={errors.CAC} />
                </fieldset>
              </div>
            </div>
          </div>

          <ButtonFixedWidthRadiusXS loading={loading} loadingText={loadingText}>
            <span className="">Continue</span>
            <i className="ion-ios-arrow-thin-right ml-4" />
          </ButtonFixedWidthRadiusXS>
        </form>
      </>
    )
  }
  componentDidMount() {
    const { token, id, setFieldValue } = this.props
    const passport = makeUppy(
      {
        trigger: '#representativePassport',
        restrictions: imageRestrictions(),
      },
      {
        token,
        id,

        name: 'companyRepPassportUrl1',
        completeCallback: result => {
          if (result.successful.length < 1) return
          setFieldValue('representativePassport', 'uploaded')
        },
      }
    )
    makeUppy(
      {
        trigger: '#representativeCV',
        restrictions: documentRestrictions(),
      },
      {
        token,
        id,

        name: 'companyRepCVurl1',
        completeCallback: result => {
          if (result.successful.length < 1) return
          setFieldValue('representativeCV', 'uploaded')
        },
      }
    )
    makeUppy(
      {
        trigger: '#CAC',
        restrictions: documentRestrictions(),
      },
      {
        token,
        id,
        name: 'companyCOIUrl',
        completeCallback: result => {
          if (result.successful.length < 1) return
          setFieldValue('CAC', 'uploaded')
        },
      }
    )
  }
}

const mapStateToProps = ({ auth: { token, user: { id } } }) => ({
  token,
  id,
})

const glueTo = connect(mapStateToProps, null)

export default glueTo(CompanyRepresentativesForm)
