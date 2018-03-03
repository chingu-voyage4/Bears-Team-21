import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4444');

function subscribeToTimer () {
  socket.on('bazingatesttime', timestamp => {
    this.setState({
      timestamp
    })
  });
  socket.emit('bazingatest', {test: 'amazing data!'});
}

function stopTimer () {
  socket.emit('stopTimer');
}

export { 
  subscribeToTimer,
  stopTimer
};
