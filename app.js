let app = new Vue({
  el: '#app',
  data: {
    id: '',
    connected: false
  }
});

let peer = new Peer();
peer.on('open', id => {
  app.id = id;
});
peer.on('connection', handleConnection);

const connect = document.querySelector('#connect');
const peerInput = document.querySelector('#peer-input');
const chatInput = document.querySelector('#chat-input');
const chat = document.querySelector('#chat');

connect.addEventListener('click', (e) => {
  handleConnection(peer.connect(peerInput.value));
});

function handleConnection(connection) {
  connection.on('data', (data) => {
    chat.innerHTML += `<p><b>Peer: </b>${data}</p>`;
  });
  connection.on('open', () => {
    app.connected = true;
  });
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      chat.innerHTML += `<p><b>You: </b>${chatInput.value}</p>`;
      connection.send(chatInput.value);
      chatInput.value = '';
    }
  });
}