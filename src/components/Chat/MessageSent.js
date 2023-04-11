import React from "react";
import avatar from '../../assets/avatar.png'

import './MessageSent.css';

const MessageSent = (props) => {
  const getLocalTime = (seconds) => {
    const localDate = new Date(0);
    localDate.setUTCSeconds(seconds);
    return localDate.getHours() + ":" + localDate.getMinutes();
  };

  return (
    <div className="chat-message chat-message-sent">
      <div className="chat-message-text" style={{ backgroundColor: props.color }}><b>{props.name}</b> <br/>{props.message}</div>
      <div className="chat-message-avatar"><img src={ avatar } width="40px" height="40px"></img></div>
      <div className="chat-message-time chat-message-time-sent">{ getLocalTime(props.time) }</div>
    </div>
  )
};

export default MessageSent;