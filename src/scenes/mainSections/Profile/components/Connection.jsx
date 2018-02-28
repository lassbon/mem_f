import React from 'react'

const Connection = ({}) => (
  <li className="px-8 py-6 border-t border-grey-lighter">
    <figure className="flex">
      <div className="w-8 mr-4">
        <img src="/static/images/011-woman-5.svg" alt="" className="" />
      </div>
      <figcaption className="text-sm">
        <h6 className="text-sm">Sade Adu</h6>
        <p className="">
          <i className="inline-block w-2 h-2 rounded-full bg-yellow-dark" />
          <span className="ml-3 text-grey-dark text-xxs">Gold Memeber</span>
        </p>
        <p className="flex justify-center mt-4">
          <span className="flex pr-6 justify-center">
            <i className="ion-ios-email text-grey text-base" />
            <span className="ml-3 text-xs">sade@adu.com</span>
          </span>
          <span className="flex pl-6 justify-center border-l border-grey-light">
            <i className="ion-ios-telephone text-grey text-base" />
            <span className="ml-3 text-xs">08011223344</span>
          </span>
        </p>
      </figcaption>
    </figure>
  </li>
)

export default Connection
