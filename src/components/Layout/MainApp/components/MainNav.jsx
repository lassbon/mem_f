import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeMainSection } from 'redux/action_creators'

const MainNav = () => (
  <nav>
    <ul className="p-6 py-8 list-reset text-sm text-grey-darkest font-semibold roboto">
      <li className="mb-4 border-b border-solid border-grey-lighter">
        <Link to="/app/timeline" className="flex items-center  pb-4">
          <span className="inline-block w-8 mr-4">
            <img src="/static/images/newspaper.svg" alt="" />
          </span>
          <span className="">Timeline</span>
        </Link>
      </li>
      <li className="mb-4 border-b border-solid border-grey-lighter">
        <Link to="/app/profile" className="flex items-center  pb-4">
          {' '}
          <span className="inline-block w-8 mr-4">
            <img src="/static/images/curriculum.svg" alt="" />
          </span>
          <span className="">Profile</span>
        </Link>
      </li>
      <li className="mb-4 border-b border-solid border-grey-lighter">
        <Link to="/app/payment" className="flex items-center  pb-4">
          {' '}
          <span className="inline-block w-8 mr-4">
            <img src="/static/images/invoice.svg" alt="" />
          </span>
          <span className="">Payment</span>
        </Link>
      </li>
      <li className="mb-4 border-b border-solid border-grey-lighter">
        <Link to="/app/events" className="flex items-center  pb-4">
          {' '}
          <span className="inline-block w-8 mr-4">
            <img src="/static/images/event.svg" alt="" />
          </span>
          <span className="">Event</span>
        </Link>
      </li>
    </ul>
  </nav>
)

const mapStateToProps = ({ navigation: { currentMainSectionIndex } }) => ({
  currentMainSectionIndex,
})

const mapDispatchToProps = dispatch => ({
  goToSection: obj => dispatch(changeMainSection(obj)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainNav)
