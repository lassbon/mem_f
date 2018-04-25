import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Search from './Search'
import { Link } from 'react-router-dom'

const pageTitles = {
  timeline: 'Timeline',
  profile: 'Profile',
  events: 'Events',
  payment: 'Payments',
  news: 'News',
  projects: 'Projects',
}

class TopBar extends Component {
  state = {
    dropDown: 'hidden'
  }

  render()  {
  const { match, chatNotifications, friendRequestNotifications, users } = this.props;
  const { path } = match
  const paths = path.split('/')
  const currentPath = paths[paths.length - 1]
  const title = pageTitles[currentPath]

  return (
    <div className="lg:flex items-center text-sm bg-blue-lighter lg:lt-shadow relative z-40">
      <div className="w-full lg:w-1/5">
        <Search />
      </div>
      <div className="inline-flex">
      <div className="flex flex-grow items-center lg:px-16 px-6 py-4 lg:py-0 hind text-white">
        <span className="mr-4 text-xl">
          <i className="ion-ios-list-outline" />
        </span>
        <h2 className="font-semibold">{title ? `${title}` : ''}</h2>
      </div>
      <div className="flex absolute pin-r mt-4 mr-4 lg:mr-0 lg:mt-0 items-center lg:px-16 text-2xl">
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
        <span className="text-white mr-4 lg:mr-0" onClick={() => { this.state.dropDown === "visible" ? this.setState({ dropDown: 'hidden' }) : this.setState({ dropDown: 'visible' }) }}>
        {chatNotifications.length > 0 || friendRequestNotifications.length > 0 ? 
          <span className="bg-red absolute rounded-full text-white text-xs w-4 h-4 text-center">{chatNotifications.length + friendRequestNotifications.length}</span>
          :
          null      
        }
          <i className="ion-android-notifications"  />
        </span>
        <div className="bg-white absolute pin-r pin-t -mr-4 lg:mr-8 mt-8 w-64 border border-solid border-grey-lighter shadow-lg" style={{ visibility: this.state.dropDown }}>
          <div className="bg-grey-lighter py-2">
            <span className="ml-4 text-sm font-thin text-grey-dark"><span className="font-bold">{friendRequestNotifications.length + chatNotifications.length} pending</span> notifications</span>
          </div>
          <div className="absolute border-pink-lightest" style={{ top: '-0.5rem', right: '2rem',
            width: '0', height: '0', borderLeft: '0.5rem solid transparent',
            borderRight: '0.5rem solid transparent', borderBottom: '0.5rem solid white' }} />
          <ul className="list-reset">
            {
              chatNotifications.map(value => {
                return (
                  <li className="flex text-sm py-4 px-4 border-b border-solid border-grey-lighter">
                  <i className="inline-flex text-white ion-chatbubbles bg-purple-light py-2 px-2 mr-2"></i>
                    <p className="inline-flex">New chat message from {users.entities.users[value].companyName}</p> 
                  </li>
                )
              })
            }
            {
              friendRequestNotifications.map(value => {
                return (
                  <Link to="/app/profile">
                    <li className="flex text-sm py-4 px-4 border-b border-solid border-grey-lighter">
                    <i className="inline-flex text-white ion-person-add bg-teal py-2 px-2 mr-2"></i>
                    <p className="inline-flex">New friend request from {users.entities.users[value].companyName}</p> 
                    </li>
                  </Link>                  
                )
              })
            }
          </ul>
        </div>
      </div>
      </div>
      
    </div>
  )
  }

  
}

export default withRouter(TopBar)
