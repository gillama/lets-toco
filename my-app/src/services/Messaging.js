const channelID = 'R0spbCwXL47urqIi';
const sd = new window.Scaledrone(channelID);

export const getRooms = async () => {
  let rooms = await fetch(`http://api2.scaledrone.com/${channelID}/rooms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'mode':'same-origin'
    }
  })
  .then(response => {
    return response;
  })
  .catch(error => {
    console.log(error);
  });
  return ['room'];
};

export const sendMessage = (room, message) => {
  sd.publish({
    room: room,
    message: message
  });
}

export const subscribe = (roomName, onNewMessage) => {
  const room = sd.subscribe(roomName);
  room.on('message', onNewMessage);
};