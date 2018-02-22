import React from 'react'
import styles from './Sidebar.css'
import MainNav from './MainNav'

const navList = ['Timeline']
const Sidebar = () => (
  <aside
    className={`lg:sidebar lg:w-1/6 lg:h-full border-r border-solid border-grey-lighter`}
  >
    <MainNav />
  </aside>
)

export default Sidebar
