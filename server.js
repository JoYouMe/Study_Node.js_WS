const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 3003;
const server = http.createServer(express);
const wss = new WebSocket.Server({server}) // 웹소켓 서버 생성

wss.on('connection', function connection(ws) { // 웹소켓 서버 실행
    ws.on('message', function incoming(data) { // 데이터 수신 
        wss.clients.forEach(function each(client){
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(data); // 클라이언트에게 답장
            }
        })
    })
})

server.listen(port, function() {
    console.log(`Server is Listening on ${port}!`);
})