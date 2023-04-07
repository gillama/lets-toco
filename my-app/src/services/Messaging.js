const channelID = 'R0spbCwXL47urqIi';

let sd = undefined;

export const initScaledrone = (username) => {
  sd = new window.Scaledrone(channelID, {
    data: {
      username: username
    }
  });
}

export const getRooms = async () => {
  // let rooms = await fetch(`http://api2.scaledrone.com/${channelID}/rooms`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'mode':'same-origin'
  //   }
  // })
  // .then(response => {
  //   return response;
  // })
  // .catch(error => {
  //   console.log(error);
  // });
  return ['observable-room'];
};

export const sendMessage = (room, message) => {
  if (!sd) { return; }
  sd.publish({
    room: room,
    message: message
  });
}

export const subscribe = (roomName, onNewMessage, onNewMembers, onMemberJoin, onMemberLeave) => {
  if (!sd) { return; }
  const room = sd.subscribe(roomName);
  room.on('message', onNewMessage);
  room.on('members', onNewMembers);
  room.on('member_join', onMemberJoin);
  room.on('member_leave', onMemberLeave);
  console.log(12)
};