import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import requestHandler from 'helpers/requestHandler'
import Autosuggest from 'react-autosuggest'
import { ToastContainer, toast } from 'react-toastify'

import './search.css'

// Helper

import { receivedUsers, sentFriendRequest } from 'redux/action_creators'

const onSuggestionSelected = () => 'selected'
const toastOptions = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 3 * 60 * 60,
}
const onSuggestionsClearRequested = () => {}
const getSuggestionValue = ({ companyName }) => companyName

const shouldRenderSuggestions = () => true

class Search extends Component {
  state = {
    searchTerm: '',
    users: this.props.users.result.map(
      id => this.props.users.entities.users[id]
    ),
  }
  elements = {}
  stateSetSearchTerm = searchTerm => {
    searchTerm = '' ? toast.success('Connection request sent') : searchTerm // this does a bind to toast show the event is registered
    this.setState(state => ({ ...state, searchTerm }))
  }
  stateSetUsers = users => {
    this.setState(state => ({ ...state, users }))
  }
  handleSearchInputChange = (event, { newValue }) => {
    const { auth: { token }, fetchUsers, users } = this.props
    this.stateSetSearchTerm(newValue)
  }
  onSuggestionsFetchRequested = ({ value }) => {
    const users = this.props.users.result.map(
      id => this.props.users.entities.users[id]
    )
    if (!value) {
      this.stateSetUsers(users)
      return
    }
    const filteredUsers = users.filter(
      ({ companyName }) =>
        value.trim() === '' ||
        (companyName &&
          companyName.toUpperCase().indexOf(value.trim().toUpperCase()) > -1)
    )
    this.stateSetUsers(filteredUsers)
  }
  searchInput = obj => (this.elements.searchInput = obj.input)
  componentDidUpdate(prevProps, prevState) {
    const { searchKey } = this.props
    if (searchKey !== prevProps.searchKey) {
      this.elements.searchInput.focus()
    }
  }
  render() {
    const {
      auth,
      fetchUsers,
      sendFriendRequest,
      user,
      users: reduxUsers,
    } = this.props
    const { searchTerm, users } = this.state
    const { handleSearchInputChange, stateSetSearchTerm } = this

    const renderSuggestion = (
      { companyPhone, companyName, email, id, membershipPlan },
      auth,
      sendFriendRequest
    ) => (
      <div className="block pt-2 px-4 border-t border-grey-lighter bg-grey-lighter">
        <figure className="flex px-8 py-6 bg-white">
          <div className="w-8 mr-4">
          {!!this.props.users.entities.users[id].profileImage ? (
            <img src={this.props.users.entities.users[id].profileImage} alt="" className="" />
          ) : (
            <img src="/static/images/033-boy.svg" alt="" className="" />
          )}
          </div>
          <figcaption className="flex-grow text-sm">
            <h6 className="text-sm">{companyName}</h6>
            <div className="lg:flex justify-between">
              <p>
                <i className="inline-block w-2 h-2 rounded-full bg-yellow-dark" />
                <span className="ml-3 text-grey-dark text-xxs">
                  {membershipPlan || 'Not a '} Memeber
                </span>
              </p>
              <div className="mt-2 lg:mt-0">
                {/* <Link to={`/app/profile/${id}`}>See profile</Link> */}

                <button
                  onClick={() =>
                    sendFriendRequest(
                      { requestee: id, requester: auth.user.id },
                      auth.token
                    )
                      .then(() => {
                        toast.success('Connection request sent')
                        stateSetSearchTerm('')
                      })
                      .catch(error => {
                        stateSetSearchTerm('')
                        toast.error(error.message)
                      })
                  }
                  className="px-3 py-1 bg-pink text-white text-xs"
                >
                  Connect
                </button>
              </div>
            </div>
            <p className="lg:flex justify-between mt-4">
              <span className="flex pr-6 lg:justify-center">
                <i className="ion-ios-email text-grey text-base" />
                <span className="ml-3 text-xs">{email}</span>
              </span>
              <span className="flex lg:pl-6 lg:justify-center lg:border-l lg:border-grey-light">
                <i className="ion-ios-telephone text-grey text-base" />
                <span className="ml-3 text-xs">{companyPhone}</span>
              </span>
            </p>
          </figcaption>
        </figure>
      </div>
    )
    return (
      reduxUsers && (
        <>
          <ToastContainer {...toastOptions} />
          <form className="topbar-search flex items-center px-6 bg-pink-lighter text-grey-darker relative z-20">
            <span className="text-sm text-white">
              <i className="ion-ios-search-strong" />
            </span>
            <Autosuggest
              suggestions={users}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={suggestion =>
                renderSuggestion(suggestion, auth, sendFriendRequest)
              }
              ref={el => !!el && this.searchInput(el)}
              shouldRenderSuggestions={shouldRenderSuggestions}
              inputProps={{
                onChange: handleSearchInputChange,
                value: searchTerm,
                className:
                  'w-full py-6 px-4 font-normal text-sm text-white capitalize',
                placeholder: 'Add connection',
                // autoFocus: 'autofocus',
              }}
            />
            <button>
              <i />
            </button>
          </form>
          {/* <section className="below-top-bar fixed pin-b pin-l lg:w-1/3">
          <div className="h-full bg-white border-t-4 border-r-4 border-pink-lightest border-dotted overflow-y-hidden" />
        </section> */}
        </>
      )
    )
  }
}

const mapStateToProps = ({ auth, searchBar: { key }, user, users }) => ({
  auth,
  searchKey: key,
  user,
  users,
})

const mapDispatchToProps = dispatch => ({
  search: searchTerm =>
    dispatch(async (dispatch, getState, { network }) => {
      // requestHandler(network.login)(searchTerm)
    }),
  fetchUsers: token =>
    dispatch(async (dispatch, getState, { network }) => {
      const users = await requestHandler(network.user.fetchUsers)({ token })
      return dispatch(receivedUsers(users))
    }),
  sendFriendRequest: (params, token) =>
    dispatch(async (dispatch, getState, { network }) => {
      const response = await requestHandler(network.user.sendFriendRequest)({
        params,
        token,
      })
      if (response.status === 'success') dispatch(sentFriendRequest(response))
      return response
    }),
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default glueTo(Search)
