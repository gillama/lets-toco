import React from 'react';
import avatar from '../../assets/avatar.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './Contact.css';

const Contact = (props) => {
  return (
    <div className="contact">
      <img src={avatar} width="40px" height="40px"></img>
      <div className="contact-status">
        <h4>{props.name}</h4>
        <p><span className={ "dot " + props.status }></span><i>{props.status}</i></p>
      </div>
      <i className="bi bi-chat-text"></i>
  </div>
  )
};

export default Contact;