import React from 'react'
import { withRouter } from 'react-router-dom'
import Search from './Search'

const pageTitles = {
  timeline: 'Timeline',
  profile: 'Profile',
  events: 'Events',
  payment: 'Payments',
}

const TopBar = ({ match }) => {
  const { path } = match
  const paths = path.split('/')
  const currentPath = paths[paths.length - 1]
  const title = pageTitles[currentPath]

  return (
    <div className="lg:flex items-center text-sm bg-blue-lighter lg:lt-shadow relative z-40">
      <div className="w-full lg:w-1/4">
        <Search />
      </div>
      <div className="flex flex-grow items-center lg:px-16 px-6 py-4 lg:py-0 hind text-white">
        <span className="mr-4 text-xl">
          <i className="ion-ios-list-outline" />
        </span>
        <h2 className="font-semibold">{title ? `Your ${title}` : ''}</h2>
      </div>
      <div className="flex items-center lg:px-16 text-2xl">
        {/* <span className="inline-block mr-8 flex justify-center items-center roboto uppercase font-semibold text-grey-dark text-xs">
        <span className="flex justify-center items-center w-8 h-8 shadow rounded-full bg-blue-lighter">
          AB
        </span>
        <span className="flex justify-center items-center w-8 h-8 shadow -ml-2 rounded-full bg-pink-lighter">
          PR
        </span>
        <span className="flex justify-center items-center w-8 h-8 shadow -ml-2 rounded-full bg-yellow-lighter">
          TO
        </span>
      </span> */}
        <span className="text-grey-darker">
          {/* <i className="ion-android-notifications" /> */}
        </span>
      </div>
    </div>
  )
}

export default withRouter(TopBar)
