import React from 'react'
import './styles'

const General = ({ children }) => (
  <div className="general lg:h-screen lg:flex ">
    <aside className="lg:w-1/5 lg:h-full sidebar">
      {/* <img src="/static/images/logo.png" alt="" /> */}
    </aside>
    <main className="lg:w-4/5 lg:h-full">{children}</main>
  </div>
)

export default General
