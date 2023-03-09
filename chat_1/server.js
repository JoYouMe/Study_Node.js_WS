const net = require('net');
const WebSocket = require('ws');
const port = 3001;
const tcpSockets = [];
// const TcpClient = require('./tcpClient');

// const tcp_client = new TcpClient('localhost', 5000);

// const wss = new WebSocket.Server({ port: 3002 });

// const tcpClient = new net.Socket()

// const tcpServer = net.createServer(socket => {
//   console.log('TCP 연결');
//   tcpSockets.push(socket);

//   socket.write('TCP server🙌\r\n');

//   socket.on('data', data => {
//     console.log(`TCP data : ${data}`);
//     socket.write(data);
//   });

//   socket.on('end', () => {
//     console.log('TCP 연결끊기');
//     const index = tcpSockets.indexOf(socket);
//     if (index > -1) {
//       tcpSockets.splice(index, 1);
//     }
//   });
// });

// tcpServer.listen(port, () => {
//   console.log('TCP server listening on port 3001');
// });
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


const wss = new WebSocket.Server({ port: 3002 });

wss.on('connection', ws => {
  console.log('WebSocket 연결');
  ws.send(`Hi user 😝 현재 ${wss.clients.size} 명`);

  ws.on('message', message => {
    console.log(`WebSocket message: ${message}`);
    client.write(message);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    ws.send(`Goodbye user 😭 현재 ${wss.clients.size} 명`);
  });
});




























// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');

// const port = 3001;
// const server = http.createServer(express);
// const wss = new WebSocket.Server({ server })

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(data) {
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     })
//   })
// })

// server.listen(port, function() {
//   console.log(`Server is listening on ${port}!`)
// })