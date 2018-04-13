import React from 'react'

const ChatsList = ({ getProps, users, chats, user, messages }) => {
  const { openChat } = getProps()
  console.log(chats)
  console.log(user)

  return (
    <ul className="list-reset  px-8 py-4">
      {users.result.map(id => {
        const friend = users.entities.users[id]
        if (friend.id === user.id) { // user cannot chat with himself (should have tried this though, weird results I imagine :-D )
          return
        }
        const chatted = chats[user.id]
        console.log(chatted)
        const myChats = chatted[friend.id] === undefined ? null : chatted[friend.id].messages
        console.log(myChats)
        const chatsArray = myChats === null ? null : Object.values(myChats).map(value => messages[value])
        console.log(chatsArray)
        const lastChatDate = chatsArray === null ? null : new Date(chatsArray[chatsArray.length - 1].createdAt);
        const lastChatContent = chatsArray === null ? null : chatsArray[chatsArray.length - 1].content;
        return (
          <li
            key={id}
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
              {chatsArray != null ?              
                <p className="text-xs text-grey-darker">{lastChatContent.substring(0,26)+"..."}</p>
              :
              <p className="text-xs text-grey-dark italic">Start chatting</p>
              }               
              <span className="absolute pin-r pin-t text-xs text-grey">
              {chatsArray != null ?              
                new Date(chatsArray[chatsArray.length - 1].createdAt).setHours(0,0,0,0) == new Date().setHours(0,0,0,0) ? new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: 'numeric'}).format(lastChatDate) : new Intl.DateTimeFormat().format(lastChatDate)
              :
              ""
              }                
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default ChatsList
