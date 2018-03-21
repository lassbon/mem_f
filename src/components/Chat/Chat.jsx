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
    sendingMessage: false,
  }
  stateSetChatting = chatting =>
    this.setState(state => ({ ...state, chatting }))
  stateSetChattingWith = chattingWith =>
    this.setState(state => ({ ...state, chattingWith }))
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
    const { chatting, chattingWith } = this.state
    // console.log('firebase', firebase)
    const chatsListGetProps = () => ({
      openChat: this.openChat,
    })
    return (
      <div className="chat lg:h-full  z-50 ">
        <header className="py-6 text-center">
          <h2 className="text-grey-dark text-sm font-normal">
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
        {!chatting && (
          <div
            ref={el => el && simpleScrollbar.initEl(el)}
            className="below-top-bar bg-grey-lighter overflow-y-scroll"
          >
            <ChatsList getProps={chatsListGetProps} users={users} />
          </div>
        )}
        {chatting && (
          <section
            ref={el => el && simpleScrollbar.initEl(el)}
            className="below-top-bar"
          >
            <div className="below-top-bar flex flex-col justify-end">
              <div className="p-4">
                {isLoaded(chats) ? (
                  !isEmpty(chats) ? (
                    <Chats
                      chattingWith={chattingWith}
                      chats={chats}
                      messages={messages}
                      user={user}
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
      </div>
    )
  }
}

const Chats = ({ chats, chattingWith, messages, user: { id } }) => {
  console.log('chatting with', chattingWith)
  const chatted = chats[id]
  if (!chatted) return 'Start chatting'
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
          >
            <div
              className={`lg:w-3/4 p-4 ${
                fromMe ? 'bg-grey-lighter' : 'lg:lt-shadow'
              }`}
            >
              <p>{content}</p>
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
