import React, { Component } from 'react'
import { connect } from 'react-redux'
import simpleScrollbar from 'fixed/simpleScrollbar'

// Components

import UserProfile from 'UserProfile'
import Connections from 'Connections'

// Helpers

class Profile extends Component {
  state = {
    editing: false,
  }
  stateSetEdit = editing => this.setState(state => ({ ...state, editing }))
  render() {
    const { user } = this.props
    return (
      <section className="lg:h-full flex">
        <div className="flex flex-wrap lg:h-full lg:w-2/3 lg:pl-16 lg:pr-4 py-6">
          <section
            ref={el => el && simpleScrollbar.initEl(el)}
            className="inline-block lg:h-full overflow-y-scroll lg:flex-grow mb-4 mr-4 bg-white lg:lt-shadow relative"
          >
            {<Connections />}
          </section>
          {/* <section className="inline-block h-auto lg:flex-grow mb-4 p-4 bg-white lg:lt-shadow">
            <i />
          </section> */}
        </div>
        <aside
          ref={el => el && simpleScrollbar.initEl(el)}
          className="lg:w-1/3 lg:h-full lg:overflow-y-scroll bg-grey-lightest"
        >
          <UserProfile
            editing={this.state.editing}
            stateSetEdit={this.stateSetEdit}
            user={user}
          />
        </aside>
      </section>
    )
  }
}

const mapStateToProps = ({ auth: { token }, user }) => ({
  token,
  user,
})

const glueTo = connect(mapStateToProps, null)

export default glueTo(Profile)
