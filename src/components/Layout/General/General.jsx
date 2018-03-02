import React from 'react'
import './styles'

const General = ({ children }) => (
  <div className="general lg:h-screen lg:flex ">
    <aside className="flex justify-center items-end pb-6 lg:w-1/5 lg:h-full sidebar">
      {/* <img src="/static/images/logo.png" alt="" /> */}
    </aside>
    <main className="lg:w-4/5 lg:h-full flex justify-center items-center relative">
      <div className="absolute w-full pin-r pin-t mt-8 flex justify-center items-center">
        <div className="w-3/4 flex justify-end">
          <img src="/static/images/logo.png" alt="" className="w-64" />
        </div>
      </div>

      <div className="w-full mt-8 relative">
        {children}
        <div className="w-full flex justify-center pin-r pin-b align-middle mt-8 text-xs text-grey">
          Designed and Powered by{' '}
          <a href="https://karixchange.com" className="ml-2 text-red-light">
            karixchange
          </a>
        </div>
      </div>
    </main>
  </div>
)

export default General
