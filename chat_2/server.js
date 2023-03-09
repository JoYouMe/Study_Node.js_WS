const net = require('net');
const WebSocket = require('ws');

// Create an array to hold all TCP sockets
const tcpSockets = [];

// Create a TCP server and listen on port 8080
const tcpServer = net.createServer((socket) => {
  console.log('TCP client connected');

  // Add the new TCP socket to the array
  tcpSockets.push(socket);

  // Handle incoming data from TCP client
  socket.on('data', (data) => {
    console.log(`Received data from TCP client: ${data}`);

    // Send data to all WebSocket clients
    if (wsServer) {
      wsServer.clients.forEach((client) => {
        client.send(data);
      });
    }
  });

  // Remove the TCP socket from the array when it closes
  socket.on('close', () => {
    console.log('TCP client disconnected');
    const index = tcpSockets.indexOf(socket);
    if (index > -1) {
      tcpSockets.splice(index, 1);
    }
  });
});

tcpServer.listen(8080, () => {
  console.log('TCP server listening on port 8080');
});

// Create a WebSocket server and listen on port 8081
const wsServer = new WebSocket.Server({ port: 8081 });

wsServer.on('connection', (ws) => {
  console.log('WebSocket client connected');

  // Handle incoming data from WebSocket client
  ws.on('message', (message) => {
    console.log(`Received data from WebSocket client: ${message}`);

    // Send data to all TCP clients
    tcpSockets.forEach((socket) => {
      socket.write(message);
    });
  });
});