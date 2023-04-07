import React from 'react';
import avatar from '../../assets/avatar.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './User.css';

const User = (props) => {
  return (
    <div className="contact">
      <img src={avatar} width="40px" height="40px"></img>
      <div className="contact-status">
        <h4>{props.name}</h4>
        <p><span className={ "dot " + props.status }></span><i>{props.status}</i></p>
      </div>
  </div>
  )
};

export default User;