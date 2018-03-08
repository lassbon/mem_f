import React from 'react'

const ChatsList = ({ getProps, users }) => {
  const { openChat } = getProps()
  return (
    <ul className="list-reset  px-8 py-4">
      {users.result.map(id => {
        const friend = users.entities.users[id]
        return (
          <li
            onClick={() => openChat(friend.id)}
            className="flex items-center py-4 border-b border-grey-light text-grey-dark cursor-pointer"
          >
            <div className="w-10 h-10 mr-6 rounded-full overflow-hidden bg-teal">
              <img
                src={friend.profileImage || '/static/images/011-woman-5.svg'}
                alt="Profile image"
              />
            </div>
            <div className="flex-grow relative">
              <h5 className="mb-1 roboto">{friend.companyName}</h5>
              <p className="text-xs text-grey-darker">Start chatting</p>
              <span className="absolute pin-r pin-t text-xs text-grey">
                12:34
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default ChatsList
