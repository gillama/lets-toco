import React from "react";
import avatar from '../../assets/avatar.png'

import './MessageSent.css';


const MessageSent = () => {
  return (
    <div className="chat-message message-send">
      <p><b>Name</b> <br/>Hello! How are you?</p>
      <img src={avatar} width="40px" height="40px"></img>
    </div>
  )
};

export default MessageSent;