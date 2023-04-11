import React from 'react';

import './Room.css';



const Room = (props) => {
  return (
    <div className="room" onClick={ () => props.onClick(props.name)}>
      {props.name}
   </div>
  )
};


export default Room;