import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Room from '../components/Chat/Room';
import Footer from '../components/Chat/Footer';
import User from '../components/Chat/User';
import Header from '../components/Chat/Header';
import MessageSent from '../components/Chat/MessageSent';
import { useState, useEffect } from 'react';

import './Chat.css';
import { getRooms, sendMessage, subscribe } from '../services/Messaging';


const Chat = (props) => {
  const [activeRooms, setActiveRooms] = useState([]);

  const [filteredRooms, setFilteredRooms] = useState(activeRooms);

  const [currentRoom, setCurrentRoom] = useState('');
  const [messageToSend, setMessageToSend] = useState('');

  const [currentMessages, setCurrentMessages] = useState([]);

  const [users, setUsers] = useState(['ana', 'petar','mate']);

  const onNewMessage = (message) => {
    setCurrentMessages([...currentMessages, message]);
    console.log(currentMessages);
  }

  useEffect(() => {
    subscribe('room', onNewMessage);
    getRooms()
      .then((rooms) => {
        setActiveRooms(rooms)
        setFilteredRooms(rooms)
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, []);

  const onSubscribeRoom = (room) => {
    setCurrentRoom(room);
  };



  const handleSearch = (e) => {
    const input = e.target.value;
    if (input === '') {
      setFilteredRooms(activeRooms);
    } else {
      setFilteredRooms(activeRooms.filter(
        (object) => {
          return object.startsWith(input);
        }
      ));
    };
  };


  const onSendMessage = () => {
    setCurrentMessages([...currentMessages, messageToSend]);
    sendMessage(currentRoom, messageToSend);
    setMessageToSend('');
  };

  return (
    <div className="toco">
    <Header />
    <div className="chat-app">
      <div className="room-window">
        <div className='room-header'>
          <h3>Rooms</h3>
          <div className='searchbar'>
              <i className="bi bi-search"></i>
              <input
                type="search"
                placeholder='Search a room'
                onChange = {handleSearch}/>
          </div>
        </div>
        { filteredRooms.map((room, i) => <Room name={room} key={i} onClick={ onSubscribeRoom }/>)}
        { filteredRooms.length === 0 && <p>No room found</p> }
      </div>
      <div className="chat-window">
        <div className="chat-room">
          <h4>{currentRoom}</h4>
        </div>
        <div className="chat-conversation">
          {
            currentMessages.map((message) => <MessageSent name={props.username} message={message}/>)
          }
        </div>
        <div className="send">
          <input type="text" placeholder="Type your message" value={messageToSend} onChange={ (e) => setMessageToSend(e.target.value) }></input>
          <button type="button" onClick={ onSendMessage }>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className="contacts-window">
        <div className="contacts-header">
          <h3>Users</h3>
        </div>
        {users.map((element,i)=> <User name={element} key={i} status='online' />)}
        {/*<Contact name={props.contacts[0].username} status='online' />
        <Contact name={props.contacts[1].username} status='idle' />
        <Contact name={props.contacts[2].username} status='offline' />*/}
      </div>
    </div>
    <Footer />
  </div>
  )
};

export default Chat;