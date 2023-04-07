import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './Room.css';



const Room = (props) => {
  
  return (
    <div className="message" onClick={ () => props.onClick(props.name)}>
      <div className="message-data">
        <h4>{props.name}</h4>
      </div>
  </div>
  )
};


export default Room;