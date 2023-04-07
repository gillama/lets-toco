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
  const [user, setUser] = useState(() => {
    const saved = {
      username: localStorage.getItem("username"),
      password: localStorage.getItem("password"),
      email: localStorage.getItem("email"),
      color: localStorage.getItem("color"),
    };
    return saved || props.user;
  });

  const [activeRooms, setActiveRooms] = useState([]);

  const [filteredRooms, setFilteredRooms] = useState(activeRooms);

  const [currentRoom, setCurrentRoom] = useState('');
  const [messageToSend, setMessageToSend] = useState('');

  const [messages, setMessages] = useState([]);

  const [activeUsers, setActiveUsers] = useState([]);

  const onNewMessage = (message) => {
    if (message.data.username === user.username) {
      return;
    }

    const sound = new Audio(notification);
    sound.play();
    setMessages((prevMessages) => [
      ...prevMessages, {
      ...message.data,
      timestamp: message.timestamp,
      isSent: false
    }]);
  }

  useEffect(() => {
    getRooms()
      .then((rooms) => {
        setActiveRooms(rooms)
        setFilteredRooms(rooms)
      })
      .catch((e) => {
        console.log(e.message)
      });
  }, []);

  const onSubscribeRoom = (room) => {
    setCurrentRoom(room);
    subscribe(
      room,
      onNewMessage,
      (newMembers) => {
        setActiveUsers(
          newMembers.map(m => {
            if (m.clientData) {
              return m.clientData.username;
            }
            return m.id;
          }
        ));
      },
      (newMember) => {
        setActiveUsers((prevUsers) => [
          ...prevUsers,
          newMember.clientData.username
        ]);
      },
      (oldMember) => {
        setActiveUsers((prevUsers) => prevUsers.filter((username) => {
          if (oldMember.clientData) {
            return username !== oldMember.clientData.username;
          }
          return username !== oldMember.id;
        }));
      }
    );
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

    if (messageToSend === '') {
      return;
    }

    const message = {
      username: user.username,
      color: user.color,
      data: messageToSend,
      timestamp: Math.floor((new Date()).getTime() / 1000),
      isSent: true
    };

    setMessages((prevMessages) => [...prevMessages, message]);
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
        { filteredRooms.length === 0 && <p>No room found</p> }
      </div>
      <div className="chat-window">
        <div className="chat-room">
          <h4>{currentRoom}</h4>
        </div>
        <div className="chat-conversation">
          {
            messages.sort((message) => message.timestamp).map((message, i) => {
              if (message.isSent) {
                return <MessageSent key={i} name={user.username} message={message.data} color={user.color} time={message.timestamp}/>;
              } else {
                return <MessageReceived key={i} name={message.username} message={message.data} color={message.color} time={message.timestamp}/>; 
              }
            })
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
        { activeUsers.map((username, i)=> <User name={username} key={i} status='online' />) }
      </div>
    </div>
    <Footer />
  </div>
  )
};

export default Chat;