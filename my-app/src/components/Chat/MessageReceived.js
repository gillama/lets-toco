import React from "react";
import avatar from '../../assets/avatar.png'

import './MessageReceived.css';


const MessageReceived = (props) => {
  return (
    <div className="chat-message message-received">
    <img src={avatar} width="40px" height="40px"></img>
    <p><b>{props.name}</b> <br/>{props.message}</p>
  </div>
  )
};

export default MessageReceived;

