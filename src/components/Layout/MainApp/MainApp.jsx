import React from 'react'
import { array, any } from 'prop-types'
import Sidebar from 'Sidebar'
import TopBar from 'TopBar'
import './styles.css'

const MainApp = ({ children }) => (
  <div className="main-app lg:h-screen">
    <TopBar />
    <div className="below-top-bar lg:flex">
      <Sidebar />
      <main className="lg:w-5/6 lg:h-full">{children}</main>
    </div>
  </div>
)

MainApp.propTypes = {
  children: any.isRequired,
}

export default MainApp
