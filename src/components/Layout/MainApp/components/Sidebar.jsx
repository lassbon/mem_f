import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styles from './Sidebar.css'
import MainNav from './MainNav'

import { logOut } from 'redux/action_creators'

const navList = ['Timeline']
const Sidebar = ({ history, logOut }) => (
  <aside className="lg:flex lg:flex-col lg:justify-between lg:sidebar lg:w-1/5 lg:h-full overflow-hidden border-r border-solid border-grey-lighter bg-pink-lightest hidden">
    <MainNav />
    <ul className="list-reset py-3 px-2 text-sm roboto">
      <li
        onClick={() => {
          logOut()
          history.push('/login')
        }}
        className="flex justify-between p-4 rounded bg-red-lightest cursor-pointer"
      >
        Logout
        <span className="text-base">
          <i className="ion-log-out" />
        </span>
      </li>
    </ul>
  </aside>
)

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
})

const glueTo = connect(null, mapDispatchToProps)

export default withRouter(glueTo(Sidebar))
