const net = require('net');

// Tcp C

const client = new net.Socket();

client.connect(8080, 'localhost', () => {
  console.log('TCP server랑 연결');
  
});

client.on('data', (data) => {
  console.log(data.toString());
  client.destroy(); // close the connection
});

client.on('close', () => {
  console.log('클라이언트 연결 종료');
});
