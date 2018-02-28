import React from 'react'
import './eventsStyles.css'

const Events = () => (
  <div className="lg:px-12 lg:py-6">
    <ul className="list-reset flex flex-wrap">
      <Event />
    </ul>
  </div>
)

const Event = () => (
  <li className="lg:w-1/3 lg:px-6">
    <div className="rounded overflow-hidden bg-white lg:lt-shadow">
      <figure className="bg-grey relative">
        <div
          style={{ backgroundImage: `url(/static/images/olu_eletu_3.jpg)` }}
          className="featured-image-container bg-center bg-cover"
        />
        <div className="absolute pin-b pin-r mb-4 mr-4 px-4 py-2 bg-white rounded-full text-xs">
          Ongoing
        </div>
      </figure>
      <div className="px-6 py-8">
        <h4 className="font-semibold ">AIMP ABUJA WORKSHOP</h4>
        <p className="text-xs text-grey-darker mt-2">
          AiMP Abuja is re-launched and ready to go; and we are having our first
          workshop themed - The Workshop themed ‘Understanding the Green Book:
          Raising a People who will build a New Nigeria’ on Sunday, 29th October
          2017, at the Transcorp Hilton, Abuja at 5pm.
        </p>
        <div className="mt-4 text-xs text-pink-dark">
          <span>7th September 2017 </span>
          <span className="px-2 text-grey">
            <i className="ion-arrow-right-c" />
          </span>
          <span>9th November 2017 </span>
        </div>

        {/* <div className="mt-3">
          <button>details</button>
        </div> */}
      </div>
    </div>
    <ul className="list-reset flex mt-6">
      {Array(6)
        .fill('')
        .map(() => (
          <li className="w-6 h-6 ml-2 bg-red rounded-full shadow overflow-hidden">
            <img src="/static/images/011-woman-5.svg" alt="" />
          </li>
        ))}
    </ul>
  </li>
)

export default Events
