import React, { Component } from 'react'
import prettifyMoney from 'helpers/prettifyMoney'

class CompletedEvent extends Component {
  state = {
    expanded: false,
  }
  stateSetExpanded = expanded =>
    this.setState(state => ({ ...state, expanded }))
  render() {
    const { event, likeEvent, token, user } = this.props
    const { expanded } = this.state
    return (
      <li className="lg:w-1/3 lg:pr-8 mb-6 relative">
        <div className="relative">
          <div className="rounded-lg overflow-hidden bg-white lg:lt-shadow relative">
            <div className="absolute ml-4 mt-4 px-4 py-2 bg-white rounded-full text-xs text-grey-darkest font-semibold z-20">
              Completed
            </div>
            <figure className="featured-event-figure bg-grey">
              <div
                style={{ backgroundImage: `url(${event.banner})` }}
                className="featured-image-container bg-center bg-cover"
              />
              <button
                onClick={() =>
                  likeEvent(
                    {
                      id: event.id,
                      liker: user.id,
                    },
                    token
                  )
                }
                className="absolute pin-t pin-r mt-4 mr-6 text-2xl text-white"
              >
                {event.likes && event.likes.includes(user.id) ? (
                  <i className="ion-android-favorite text-purple-light" />
                ) : (
                  <i className="ion-android-favorite-outline" />
                )}
              </button>
              <figcaption className="absolute pin-b w-full p-6 text-white text-sm">
                <h4 className="mb-2 text-xl font-normal">{event.title}</h4>
                <address className="roman opacity-75">{event.venue}</address>
                <div className="flex justify-between items-center mt-6">
                  <div className="align-middle">
                    <ul className="list-reset inline-flex pl-3">
                      {!!event.likes &&
                        event.likes.map(id => (
                          <li
                            key={id}
                            className="w-6 h-6 -ml-3 bg-red border-2 border-white rounded-full shadow overflow-hidden"
                          >
                            <img src="/static/images/011-woman-5.svg" alt="" />
                          </li>
                        ))}
                    </ul>
                    <span className="pl-2">
                      {!!event.likes ? event.likes.length : 0} likes
                    </span>
                  </div>

                  <div className="">
                    <button
                      onClick={() => this.stateSetExpanded(true)}
                      className=" px-4 py-2 rounded-full text-xs text-white font-semibold"
                    >
                      More
                      <span className="ml-2">
                        <i className="ion-ios-arrow-up" />
                      </span>
                    </button>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
          {expanded && (
            <div className="more-details absolute px-8 py-6 rounded-b-none bg-white rounded-lg z-20">
              <button
                onClick={() => this.stateSetExpanded(false)}
                className="absolute pin-b pin-r mr-4 mb-6 px-3 py-1 rounded text-xs text-purple-darker"
              >
                Hide
                <span className="ml-2">
                  <i className="ion-ios-arrow-down" />
                </span>
              </button>
              <div className="mb-4 text-xs">
                <span>Description</span>
                <p className=" text-base roboto">{event.description}</p>
              </div>
              <div className="mt-4 text-xs">
                <span>Fee</span>
                <p className=" text-base roboto">N{prettifyMoney(event.fee)}</p>
              </div>
              <div className="mt-4 text-xs">
                <span>Venue</span>
                <p className=" text-base roboto">N{prettifyMoney(event.fee)}</p>
              </div>
            </div>
          )}
        </div>
      </li>
    )
  }
}
export default CompletedEvent
