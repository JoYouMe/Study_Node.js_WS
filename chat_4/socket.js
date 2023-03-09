const ws = require('ws');

module.exports = (server, app) => {
  const wss = new ws.Server({ server });
  // for sending a rooms data when a new room is created
  // used at app.post('newroom') on app.js
  app.set('wss', wss);

  // broadcast 메소드
  wss.broadcast = (message) => {
  wss.clients.forEach((client) => {
      client.send(message);
    });
  };

  wss.on('connection', (ws, req) => {
    ws.on("message", function (data) {
      wss.broadcast(data.toString());
  });

  // user connection
  wss.clients.forEach((client) => {
      wss.broadcast(`New User connecting 😝 현재 ${wss.clients.size} 명`)
  });

  // user close
  ws.on("close", () => {
      wss.broadcast(`Goodbye user 😭 현재 ${wss.clients.size} 명`);
  });

    if (req.url === '/rooms') {
      ws.location = 'index';
      // get a data when into index
      ws.send(JSON.stringify(app.get('db').rooms));
    } else if (req.url.startsWith('/chat/')) {
      ws.location = req.url.split('/')[2];
      ws.on('message', (message) => {
        // send message to open sockets in my room without me
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === ws.OPEN && client.location === ws.location) client.send(message.toString());
          // send message to
          // open sockets (client.readyState === ws.OPEN)
          // in my room (client.roomId === ws.roomId)
          // without me (client !== ws)
        });
      });
    }

    // 에러 처리
    ws.on('error', (error) => {
      console.error(error);
    });
  });
};