import React from 'react'

const Comment = ({ comment: { comment, companyName } }) => (
  <li className=" mt-6">
    <div className="text-grey-dark">
      {companyName} <span className="">said:</span>
    </div>

    <div className="p-4 ml-8 bg-grey-lighter border border-grey-light text-grey-darkest rounded-sm">
      <p>{comment}</p>
    </div>
  </li>
)

export default Comment
