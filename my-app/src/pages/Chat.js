import React from 'react';
import avatar from '../assets/avatar.png';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Message from '../components/Chat/Mesage';
import Footer from '../components/Chat/Footer';
import Contact from '../components/Chat/Contact';
import Header from '../components/Chat/Header';
import MessageSent from '../components/Chat/MessageSent';
import MessageReceived from '../components/Chat/MessageReceived';
import { useState } from 'react';

import './Chat.css';


const Chat = (props) => {

  const [displayedMessages, setDisplayedMessages] = useState();
  const [displayedContacts, setDisplayedContacts] = useState();


  const deleteMessage = () => {
    console.log('delete message');
  };

  return (
    <div className="cacatu">
    <Header />
    <div className="chat-app">
      <div className="messages-window">
        <h3>Messages</h3>
        <Message deleteMessage={deleteMessage}/>
        <Message deleteMessage={deleteMessage}/>
        <Message deleteMessage={deleteMessage}/>
      </div>
      <div className="chat-window">
        <div className="chat-recipient">
          <img src={avatar} width="40px" height="40px"></img>
          <h4>Recipient</h4>
        </div>
        <div className="chat-conversation">
          <MessageSent />
          <MessageReceived />
          <MessageSent />
          <MessageReceived />
          <MessageSent />
        </div>
        <div className="send">
          <input type="text" placeholder="Type your message"></input>
          <button type="button">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className="contacts-window">
        <div className="contacts-header">
          <h3>Contacts</h3>
          <div className='searchbar'>
            <i className="bi bi-search"></i>
            <input
              type="search"
              placeholder='Search contact'/>
            </div>
        </div>
        <Contact name={props.contacts[0].username} status='online' />
        <Contact name={props.contacts[1].username} status='idle' />
        <Contact name={props.contacts[2].username} status='offline' />
      </div>
    </div>
    <Footer />
  </div>
  )
};

export default Chat;