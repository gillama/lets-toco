import React from "react";
import avatar from '../../assets/avatar.png'

import './MessageReceived.css';

const MessageReceived = (props) => {
  const getLocalTime = (seconds) => {
    const localDate = new Date(0);
    localDate.setUTCSeconds(seconds);
    return localDate.getHours() + ":" + localDate.getMinutes();
  };

  return (
    <div className="chat-message chat-message-received">
      <div className="chat-message-avatar"><img src={ avatar } width="40px" height="40px"></img></div>
      <div className="chat-message-text" style={{ backgroundColor: props.color }}><b>{props.name}</b> <br/>{props.message}</div>
      <div></div>
      <div className="chat-message-time chat-message-time-received">{ getLocalTime(props.time) }</div>
    </div>
  )
};

export default MessageReceived;

