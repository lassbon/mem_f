import React from 'react'

const Comment = ({ comment: { comment, companyName, updatedAt }, user: {profileImage} }) => (
  <li className="pt-2 pl-3 mt-3 bg-white border border-grey shadow">
    <div className="flex items-center">
    {!!profileImage ? (
            <img className="w-10 h-10 rounded-full mr-4" src={profileImage} alt="Avatar" />
          ) : (
            <img className="w-10 h-10 rounded-full mr-4" src="../../../../static/images/033-boy.svg" alt="Avatar" />
          )}      
      <div className="text-sm">
        <p className="text-blue-lighter leading-none">{companyName}</p>
        <p className="text-grey-dark">{new Intl.DateTimeFormat('en-GB', { 
          year: 'numeric', 
          month: 'long', 
          day: '2-digit' 
        }).format(new Date(updatedAt))}</p>
      </div>
    </div>

    <div className="p-4 ml-8 bg-white text-grey-darkest rounded-sm">
      <p>{comment}</p>
    </div>
  </li>
)

export default Comment