// Vendors

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import simpleScrollbar from 'fixed/simpleScrollbar'

// Components

import ButtonFixedWidthRadiusXS from 'components/buttons/ButtonFixedWidthRadiusXS'
import Circle from 'loaders/Circle'

import './membershipCategory.css'

// Helpers

import network from 'services/network'
import requestHandler from 'helpers/requestHandler'

const renderBasedOnCategoriesState = (
  loading,
  { membershipCategories, recommendedLevel, setFieldValue, values }
) => {
  if (loading)
    return (
      <div className="flex justify-center py-6">
        <Circle text="Retreiving membership categories. Please wait" />
      </div>
    )
  return (
    <ul className="membership-option-height list-reset lg:flex">
      {membershipCategories.map((category, index) => (
        <Category
          key={category.id}
          category={category}
          index={index}
          recommended={
            recommendedLevel.toUpperCase() === category.name.toUpperCase()
          }
          setFieldValue={setFieldValue}
          values={values}
        />
      ))}
    </ul>
  )
}

// Data

const toastOptions = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 3 * 60 * 60,
}

const benefits = `Can vote and be voted for.

Priority provision during chamber activities.

Advocacy roles on related issues on behalf of the company with government.

Entitled to first advantage on ALL chamber’s activities/services as the case may be.

20 per cent discount on space participation at the Annual Abuja International Trade Fair

or/and on any Foreign Trade Missions.

Glass/ Crystal Membership Certificate.

Right of Choice on selected chamber’s activities/ programmes.

Freebies (Scarf, Cufflinks, Tie Pins, Customised Chamber’s Shirt).

Direct link to company’s website from the official chamber’s webpage.`

class MembershipPayment extends Component {
  state = {
    membershipCategories: [],
    loadingLevels: false,
  }
  stateSetLoadingLevels = loadingLevels =>
    this.setState(state => ({ ...state, loadingLevels }))
  stateSetMembershipCategories = membershipCategories =>
    this.setState(state => ({ ...state, membershipCategories }))
  componentDidMount() {
    const { token } = this.props

    this.stateSetLoadingLevels(true)
    requestHandler(network.general.fetchMembershipLevels)({ token })
      .then(this.stateSetMembershipCategories)
      .catch(err => {
        toast.err(
          'Sorry, an error occured while trying to fetch membership levels. Please check your internet connection and reload the page.'
        )
      })
      .then(() => this.stateSetLoadingLevels(false))
  }
  componentDidUpdate(prevProps, prevState) {}
  elements = {
    categoryElement: [],
  }
  categoryElements = ref => this.elements.categoryElement.push(ref)
  render() {
    const {
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
      user: { recommendedLevel },
    } = this.props
    const { loadingLevels, membershipCategories } = this.state

    return (
      <>
        <ToastContainer {...toastOptions} />

        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            {renderBasedOnCategoriesState(loadingLevels, {
              membershipCategories,
              recommendedLevel,
              setFieldValue,
              values,
            })}
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
      </>
    )
  }
}

const Category = ({
  category: { description, fee, name },
  index,
  recommended,
  setFieldValue,
  values,
}) => (
  <li
    onClick={() => {
      setFieldValue('membershipPlan', name)
    }}
    className={`membership-option lg:h-full lg:w-1/4 border-4 border-grey-lighter overflow-y-hidden cursor-pointer relative ${
      recommended
        ? 'bg-pink-light text-white z-30 active'
        : 'bg-grey-lightest text-grey-darker'
    } ${values.membershipPlan === name ? 'selected' : ''}`}
  >
    <div
      ref={ref => ref && simpleScrollbar.initEl(ref)}
      className="lg:h-full overflow-y-scroll"
    >
      <div className="flex flex-col justify-center items-center lg:py-8 lg:mb-6">
        {recommended && (
          <div className="p-1 px-4 mb-2 bg-yellow text-pink-darker text-sm rounded-full">
            Recommended
          </div>
        )}
        <h3 className="text-xs font-normal">{name}</h3>
        <div className="mb-4 text-xl font-semibold roboto">N{fee}</div>
        <div className="w-full mb-6 flex lg:px-12 items-center justify-center relative">
          <span className="inline-block absolute pin-l w-full border-b border-grey-light" />
          <span
            className={`text-xxs uppercase px-4 relative ${
              recommended
                ? 'bg-pink-light text-white z-30'
                : 'bg-grey-lightest text-grey'
            }`}
          >
            Breakdown
          </span>
        </div>
        <ul className="w-full list-reset">
          {description.split('\n').map((line, lIndex) => (
            <li key={lIndex} className={`text-xs py-1 lg:px-6`}>
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="select absolute pin-b z-20">
      <button type="button" className="px-6 py-3 bg-pink-darker text-white">
        <span className="">
          {values.membershipPlan === name ? 'Selected' : 'Select'}
        </span>
        <i
          className={`${
            values.membershipPlan === name
              ? 'ion-checkmark-round'
              : 'ml-4 ion-ios-circle-outline'
          } `}
        />
      </button>
    </div>
  </li>
)

const mapStateToProps = ({ auth: { token }, user }) => ({
  token,
  user,
})

const glueTo = connect(mapStateToProps, null)

export default glueTo(MembershipPayment)
