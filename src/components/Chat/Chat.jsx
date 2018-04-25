import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import { isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'
import { Formik } from 'formik'
import simpleScrollbar from 'fixed/simpleScrollbar'
import {
  updateNotification,
} from 'redux/action_creators'

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
      read: false,
    }
    // firebase.set(firebasePaths.chats(id, to, 0), messageUID)
    return Promise.all([
      firebase.push(firebasePaths.chatsFrom(id, to), messageUID),
      firebase.push(firebasePaths.chatsFrom(to, id), messageUID),
      firebase.set(firebasePaths.messages(messageUID), message).then(res => {
        // console.log(res)
      }),
    ])
  }

  updateReadState = (messageUID) => { // mark chat as read
    const { firebase } = this.props
    console.log(firebase.database().ref().child('messages').push().key)
    const path = `messages/${messageUID}/read`;
    let update = {}
    update[path] = true;
    firebase.database().ref().update(update)
  }

  componentWillReceiveProps(nextProps) { // update chat notifications
    // console.log('will receive props')
    // console.log(nextProps)
    const { chats, messages, user } = nextProps
    if (messages === this.props.messages) return null
    if (isLoaded(chats) && !isEmpty(chats)) {
      let newChats = [];
      for (var key in messages) {
        if (messages.hasOwnProperty(key)) {
          if (messages[key].to === user.id && messages[key].read != undefined && !messages[key].read) {
            // console.log(messages[key].read)
            newChats.push(messages[key].by)
            //this.props.updateNotification({type: 'chat', message: messages[key].by})
          }          
        }
      }
      this.props.updateNotification({type: 'chat', message: newChats})      
    }
  }

  render() {
    const { chats, firebase, messages, user, users, chatNotifications } = this.props
    const { chatting, chattingWith, expanded } = this.state
    
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
            <header className="fixed z-50 py-4 -mt-2 text-center bg-blue-lighter" style={{ width: '20rem' }}>
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
            <ChatsList getProps={chatsListGetProps} users={users} chats={chats} user={user} messages={messages} chatNotifications={chatNotifications} />
          </div>
        )}
        {chatting && (
          <section
            ref={el => el && simpleScrollbar.initEl(el)}
            className="below-top-bar"
          >
          <header className="py-3 text-center bg-blue-lighter fixed -mt-2 border-grey-lighter border-t-4" style={{width: '20.6rem'}}>
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
            <i className="text-white ion-close-round mr-4" />
          </button>
            </header>
              <div className="p-4 h-full overflow-y-scroll">
                {isLoaded(chats) ? (
                  !isEmpty(chats) ? (
                    <Chats
                      chattingWith={chattingWith}
                      chats={chats}
                      messages={messages}
                      user={user}
                      users={users}
                      chatNotifications={chatNotifications}
                      updateNotification={this.props.updateNotification}
                      updateReadState={this.updateReadState}
                    />
                  ) : (
                    'Start chatting'
                  )
                ) : null}
              </div>
              <div className="fixed pin-b bg-white" style={{ width: '20rem' }}>
                <Formik
                  initialValues={{ message: '' }}
                  onSubmit={(values, { setFieldValue }) => {
                    let sendText = values.message;                    
                    if (sendText.replace(/\s/g,'').length < 1) { // empty text
                      return null;
                    } else {
                      // console.log(values)
                      this.submitNewChatMessage(
                        values.message,
                        chattingWith
                      ).then(() => {
                      // console.log('got here')
                        setFieldValue('message', '')
                      })
                    }                    
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
                          className="w-full pl-4 py-4 rounded-full shadow border border-grey-light text-sm"
                          style={{ paddingRight: '3.5rem' }}
                        />
                        <button type="submit" className="absolute pin-r pin-b mb-4 mr-4 bg-blue-lighter text-white w-12" style={{
                            display: 'inherit',
                            height: '3.1rem',
                            borderBottomRightRadius: '100px',
                            borderTopRightRadius: '100px',
                            WebkitBoxSizing: 'border-box',
                            MozBoxSizing: 'border-box',
                            boxSizing: 'border-box',
                          }}><span className="text-lg"><i className="ion-android-send"></i></span></button>
                      </form>
                    )
                  }}
                />                
              </div>
          </section>
        )}
        {/* 
         */}

        {/* <button className="w-12 h-12 rounded-full bg-red-light text-white">
          <i className="ion-chatboxes" />
        </button> */}
        {!chatting && (
          <div className="fixed pin-b pin-r mb-8 mr-8 z-40">
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
      <div className="fixed pin-b pin-r   z-40">
        {chatNotifications.length > 0 ? 
          <span className="pin-t pin-l bg-red absolute rounded-full text-white text-sm w-4 h-4 text-center">{chatNotifications.length}</span>
          :
          null      
        }
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

const Chats = ({ chats, chattingWith, messages, user: { id, profileImage }, users, chatNotifications, updateNotification, updateReadState }) => {
  // console.log('chatting with', chattingWith)
  const chatted = chats[id]
  // console.log('chatted', chatted)
  // console.log('chatNotifications', chatNotifications)
  // console.log('filtered', chatNotifications.filter(value => value != chattingWith))
  if (chatNotifications.indexOf(chattingWith) > -1) {
    updateNotification({type: 'chat', message: chatNotifications.filter(value => value != chattingWith)})
    //updateReadState()
  }  
  if (!chatted) return <p style={{ marginTop: '5rem' }} className="text-xs italic text-grey px-2">Type your message and send to start chatting!</p>
  if (chatted[chattingWith] === undefined) return <p style={{ marginTop: '5rem' }} className="text-xs italic text-grey px-2">Type your message and send to start chatting!</p>
  const myChats = chatted[chattingWith].messages
  const chatsArray = Object.values(myChats).map(value => {
    if (!messages[value].read && messages[value].by != id) {
      console.log('setting read state', id);
      updateReadState(value)
    }    
    return messages[value]
  })
  console.log('chatsArray', chatsArray)
  return (
    <ul className="list-reset" style={{width: '17.5rem', marginBottom: '5rem', marginTop: '5rem'}}>
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
              className={`rounded-lg w-3/4 p-4 ${
                fromMe ? 'bg-grey-lighter' : 'lt-shadow bg-pink-lightest'
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
  myNotifications: {chatNotifications,}
}) => ({
  chats,
  messages,
  user,
  users,
  chatNotifications,
})

const mapDispatchToProps = dispatch => ({
  updateNotification: (obj) => {
    dispatch(updateNotification(obj))
  }
})

const glueTo = compose(withFirebase, connect(mapStateToProps, mapDispatchToProps))

export default glueTo(Chat)
