import React from 'react'
import './styles'

const General = ({ children }) => (
  <div className="general lg:h-screen lg:flex ">
    <aside className="lg:flex justify-center items-end lg:pb-6 lg:w-1/5 lg:h-full relative sidebar">
      {/* <img src="/static/images/logo.png" alt="" /> */}
      <div className="lg:absolute w-full pin-r pin-t lg:mt-8 lg:flex justify-center items-center sm:z-10">
        <div className="p-4 lg:w-3/4 lg:flex justify-end">
          <img src="/static/images/logo.png" alt="" className="w-32 lg:w-64" />
        </div>
      </div>

      <div className="circle" />
    </aside>
    <main className="lg:w-4/5 lg:h-full lg:flex justify-center items-center relative">
      <div className="w-full mt-8 relative">
        {children}
        <div className="w-full flex justify-center pin-r pin-b align-middle mt-8 text-xs text-grey">
          Designed by{' '}
          <a href="https://karixchange.com" className="ml-2 text-red-light">
            karixchange
          </a>
        </div>
      </div>
    </main>
  </div>
)

export default General
