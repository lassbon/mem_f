import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import { isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'
import { Formik } from 'formik'
import simpleScrollbar from 'fixed/simpleScrollbar'

import ChatsList from 'ChatsList'

import './chat.css'
import generateUID from 'helpers/generateUID'

const firebasePaths = {
  chatsFrom: (fromId, toId) => `chats/${fromId}/${toId}/messages`,
  chatsTo: (fromId, toId) => `chats/${toId}/${fromId}/messages`,
  messages: messageUID => `messages/${messageUID}`,
}

class Chat extends Component {
  state = {
    chatting: false,
    chattingWith: '',
    expanded: false,
    sendingMessage: false,
  }
  stateSetChatting = chatting =>
    this.setState(state => ({ ...state, chatting }))
  stateSetChattingWith = chattingWith =>
    this.setState(state => ({ ...state, chattingWith }))
  stateSetExpanded = expanded =>
    this.setState(state => ({ ...state, expanded }))
  openChat = id => {
    this.stateSetChatting(true)
    this.stateSetChattingWith(id)
  }
  submitNewChatMessage = (content, to) => {
    const { firebase, user: { id } } = this.props
    const messageUID = generateUID()
    const message = {
      by: id,
      content,
      createdAt: moment().toISOString(),
      id: messageUID,
      to,
    }
    // firebase.set(firebasePaths.chats(id, to, 0), messageUID)
    return Promise.all([
      firebase.push(firebasePaths.chatsFrom(id, to), messageUID),
      firebase.push(firebasePaths.chatsFrom(to, id), messageUID),
      firebase.set(firebasePaths.messages(messageUID), message).then(res => {
        console.log(res)
      }),
    ])
  }
  render() {
    const { chats, firebase, messages, user, users } = this.props
    const { chatting, chattingWith, expanded } = this.state
    // console.log('firebase', firebase)
    const chatsListGetProps = () => ({
      openChat: this.openChat,
    })
    return expanded ? (
      <div
        style={
          {
            // height: 'calc(100vh - (68 * 2))',
          }
        }
        className="chat below-top-bar bg-white z-50 relative border-grey-lighter border-t-4"
      >
      {/* <header className="below-top-bar py-3 text-center bg-blue-lighter">
        {!chatting && <i className="text-white ion-chatbubbles" /> }              
        <h2 className="text-white font-normal text-base inline-block ml-2">
          {chatting ? (
            <button onClick={() => this.stateSetChatting(false)}>
              <div>
                <span>
                  <i className="ion-arrow-left-c" />
                </span>
                {users.entities.users[chattingWith].email}
              </div>
            </button>
          ) : (
            'Chat'
          )}
        </h2>
      </header> */}
        {!chatting && (
          <div
            ref={el => el && simpleScrollbar.initEl(el)}
            className="h-full bg-white shadow-lg overflow-y-scroll"
          >
            <header className="py-3 text-center bg-blue-lighter">
              <i className="text-white ion-chatbubbles" />
              <h2 className="text-white font-normal text-base inline-block ml-2">
                {chatting ? (
                  <button onClick={() => this.stateSetChatting(false)}>
                    <div>
                      <span>
                        <i className="ion-arrow-left-c" />
                      </span>
                      {users.entities.users[chattingWith].email}
                    </div>
                  </button>
                ) : (
                  'Chat'
                )}
              </h2>
            </header>
            <ChatsList getProps={chatsListGetProps} users={users} chats={chats} user={user} messages={messages}/>
          </div>
        )}
        {chatting && (
          <section
            ref={el => el && simpleScrollbar.initEl(el)}
            className="below-top-bar"
          >
          <header className="py-3 text-center bg-blue-lighter">
            <button onClick={() => this.stateSetChatting(false)} className="float-left ml-4">
              <div className="text-white font-normal text-xl">
                <span>
                  <i className="ion-arrow-left-c" />
                </span>                
              </div>
            </button>
            {!!users.entities.users[chattingWith].profileImage ? (
              <img className="w-6 h-6 rounded-full mr-2" src={users.entities.users[chattingWith].profileImage} alt="Avatar" />
            ) :
            <img className="w-6 h-6 rounded-full mr-2" src="/static/images/011-woman-5.svg" alt="Avatar" />
            }
              <h2 className="text-white font-normal text-base inline-block">
                {users.entities.users[chattingWith].companyName}
              </h2>
              <button
            onClick={() => {
              this.stateSetExpanded(false)
              this.stateSetChatting(false)
            }}
            className="float-right mr-4"
          >
            <i className="text-white ion-close-round" />
          </button>
            </header>
            <div className="below-top-bar flex flex-col justify-end">
              <div className="p-4">
                {isLoaded(chats) ? (
                  !isEmpty(chats) ? (
                    <Chats
                      chattingWith={chattingWith}
                      chats={chats}
                      messages={messages}
                      user={user}
                      users={users}
                    />
                  ) : (
                    'Start chatting'
                  )
                ) : null}
              </div>
              <div className="">
                <Formik
                  initialValues={{ message: '' }}
                  onSubmit={(values, { setFieldValue }) => {
                    // console.log(values)
                    this.submitNewChatMessage(
                      values.message,
                      chattingWith
                    ).then(() => {
                      // console.log('got here')
                      setFieldValue('message', '')
                    })
                  }}
                  render={({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    values,
                  }) => {
                    return (
                      <form action="" className="p-4" onSubmit={handleSubmit}>
                        <input
                          id="message"
                          type="text"
                          placeholder="Type here"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.message}
                          className="w-full px-8 py-4 rounded-full shadow border border-grey-light text-sm"
                        />
                      </form>
                    )
                  }}
                />
              </div>
            </div>
          </section>
        )}
        {/* 
         */}

        {/* <button className="w-12 h-12 rounded-full bg-red-light text-white">
          <i className="ion-chatboxes" />
        </button> */}
        {!chatting && (
          <div className="absolute pin-b pin-r mb-8 mr-8 z-40">
          <button
            onClick={() => {
              this.stateSetExpanded(false)
              this.stateSetChatting(false)
            }}
            className="w-16 h-16 rounded-full bg-red-light lg:lt-shadow text-lg"
          >
            <i className="text-white ion-close-round" />
          </button>
        </div>
        )}        
      </div>
    ) : (
      <div>
        <button
          onClick={() => this.stateSetExpanded(true)}
          className="w-16 h-16 mb-8 mr-8 rounded-full bg-blue-lighter lg:lt-shadow text-lg"
        >
          <i className="text-white ion-chatbubbles" />
        </button>
      </div>
    )
  }
}

const Chats = ({ chats, chattingWith, messages, user: { id, profileImage }, users }) => {
  console.log('chatting with', chattingWith)
  const chatted = chats[id]
  console.log(chatted)
  if (!chatted) return <p className="text-xs italic text-grey ml-4">Type your message and send to start chatting!</p>
  if (chatted[chattingWith] === undefined) return <p className="text-xs italic text-grey ml-4">Type your message and send to start chatting!</p>
  const myChats = chatted[chattingWith].messages
  const chatsArray = Object.values(myChats).map(value => messages[value])
  console.log('chatsArray', chatsArray)
  return (
    <ul className="list-reset">
      {chatsArray.map(mes => {
        if (!mes) return null
        const { content, by, id: messageId } = mes
        const fromMe = id === by
        return (
          <li
            key={messageId}
            className={`flex mt-4 ${fromMe ? 'justify-end' : 'justify-start'}`}
          > <div>            
              {!!profileImage && fromMe ? (
              <img className="w-10 h-10 rounded-full mr-4 inline-block" src={profileImage} alt="Avatar" />
            ) : users.entities.users[chattingWith].profileImage && !fromMe ? (
              <img className="w-10 h-10 rounded-full mr-4" src={users.entities.users[chattingWith].profileImage} alt="Avatar" />
            ) :
            <img className="w-10 h-10 rounded-full mr-4" src="/static/images/011-woman-5.svg" alt="Avatar" />
            }
          </div>
            <div
              className={`rounded-lg lg:w-3/4 p-4 ${
                fromMe ? 'bg-grey-lighter' : 'lg:lt-shadow bg-pink-lightest'
              }`}
            >
              <p className="inline-block break-words">{content}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

const mapStateToProps = ({
  fbDb: { data: { chats, messages } },
  user,
  users,
}) => ({
  chats,
  messages,
  user,
  users,
})

const glueTo = compose(withFirebase, connect(mapStateToProps, null))

export default glueTo(Chat)
