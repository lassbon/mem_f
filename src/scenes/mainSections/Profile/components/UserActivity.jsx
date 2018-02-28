import React from 'react'

const UserActivity = ({ activity: { createdAt, postText } }) => (
  <li className="pl-8 mt-8 relative">
    <div className="mb-2 text-grey">
      <h6 className=" text-xs font-semibold hind ">New Post</h6>
      <span className="text-xxs">1 hr ago</span>
    </div>
    <div className="p-4 rounded-sm bg-white text-grey-darkest roboto leading-normal lg:lt-shadow">
      {postText}
    </div>
    <span className="absolute pin-t pin-l w-4 h-4 flex justify-center items-center rounded-full border border-grey border-solid">
      <i className="w-3 h-3 rounded-full bg-grey-darker" />
    </span>
  </li>
)

export default UserActivity
