import React from 'react';
import avatar from '../../assets/avatar.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './Message.css';

const Message = (props) => {
  return (
    <div className="message">
      <img src={avatar} width="40px" height="40px"></img>
      <div className="message-data">
        <h4>Contact Name</h4>
        <p>Last Message</p>
      </div>
      <i className="bi bi-trash3" onClick={props.deleteMessage}></i>
  </div>
  )
};


export default Message;