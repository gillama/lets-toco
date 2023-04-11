import React from 'react';
import avatar from '../../assets/avatar.png';

import './User.css';

const User = (props) => {
  return (
    <div className="user">
      <img src={avatar} width="40px" height="40px"></img>
      <div className="user-status">
        <h4>{props.name}</h4>
        <p><span className={ "dot " + props.status }></span><i>{props.status}</i></p>
      </div>
  </div>
  )
};

export default User;