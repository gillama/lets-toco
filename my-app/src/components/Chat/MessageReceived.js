import React from "react";
import avatar from '../../assets/avatar.png'

import './MessageReceived.css';


const MessageReceived = (props) => {
  return (
    <div className="chat-message">
      <div className="message-received">
        <img src={avatar} width="40px" height="40px"></img>
        <p style={{ backgroundColor: props.color }}><b>{props.name}</b> <br/>{props.message}</p>
      </div>
  </div>
  )
};

export default MessageReceived;

