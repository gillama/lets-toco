import React from "react";
import avatar from '../../assets/avatar.png'

import './MessageSent.css';


const MessageSent = (props) => {
  return (
    <div className="chat-message message-send">
      <p><b>{props.name}</b> <br/>{props.message}</p>
      <img src={avatar} width="40px" height="40px"></img>
    </div>
  )
};

export default MessageSent;