import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Room from '../components/Chat/Room';
import Footer from '../components/Chat/Footer';
import User from '../components/Chat/User';
import Header from '../components/Chat/Header';
import MessageSent from '../components/Chat/MessageSent';
import MessageReceived from '../components/Chat/MessageReceived';
import { useState, useEffect } from 'react';

import notification from '../assets/notification.mp3';

import './Chat.css';
import { getRooms, sendMessage, subscribe } from '../services/Messaging';


const Chat = (props) => {
  const [activeRooms, setActiveRooms] = useState([]);

  const [filteredRooms, setFilteredRooms] = useState(activeRooms);

  const [currentRoom, setCurrentRoom] = useState('');
  const [messageToSend, setMessageToSend] = useState('');

  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);

  const [users, setUsers] = useState(['ana', 'petar','mate']);

  const onNewMessage = (message) => {
    if (message.data.username === props.username) {
      return;
    }

    const sound = new Audio(notification);
    sound.play();
    setReceivedMessages([...receivedMessages, message.data]);
  }

  useEffect(() => {
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
    subscribe(room, onNewMessage);
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
    if (currentRoom === '') {
      alert("Please pick the room before sending your message!");
      return;
    }

    const message = {
      username: props.username,
      data: messageToSend
    };

    setSentMessages([...sentMessages, message]);
    sendMessage(currentRoom, message);
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
        { filteredRooms && filteredRooms.map((room, i) => <Room name={room} key={i} onClick={ onSubscribeRoom }/>)}
        { !filteredRooms && <p>No room found</p> }
      </div>
      <div className="chat-window">
        <div className="chat-room">
          <h4>{currentRoom}</h4>
        </div>
        <div className="chat-conversation">
          {
            sentMessages.map((message) => <MessageSent name={props.username} message={message.data}/>)
          }
          {
            receivedMessages.map((message) => <MessageReceived name={message.username} message={message.data}/>)
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
      </div>
    </div>
    <Footer />
  </div>
  )
};

export default Chat;