import React from "react";
import avatar from '../../assets/avatar.png'

import './MessageReceived.css';


const MessageReceived = () => {
  return (
    <div className="chat-message message-received">
    <img src={avatar} width="40px" height="40px"></img>
    <p><b>Name</b><br/>Hello!</p>
  </div>
  )
};

export default MessageReceived;

