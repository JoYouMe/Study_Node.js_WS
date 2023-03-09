// Tcp S
const net = require('net');
const server = net.createServer((socket) => {
    console.log('TCP client랑 연결');
  
    socket.on('data', (data) => {
      const str = data.toString();
      console.log(str);

      const resp = '잘 받았습니다.'
      socket.write(Buffer.from(resp));
    });
  
    socket.on('end', () => {
      console.log('서버쪽 연결 종료');
    });
  });
  
  server.listen(8080, () => {
    console.log('Server listening on port 8080');
  });
  