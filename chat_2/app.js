const express = require("express")
const http = require('http');
const WebSocket = require('ws')

const port = 8000;
const server = http.createServer(express);
const wss = new WebSocket.Server({server})

server.listen(port, function(){
    console.log(`Server is listening on ${port}!`);
})

// broadcast 메소드
wss.broadcast = (message) => {
    wss.clients.forEach((client) => {
        client.send(message);
    });
};

wss.on("connection", function (ws) {
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

    // wss.clients.forEach(function each(client) {
    //     if (client !== ws && client.readyState === WebSocket.OPEN) {
    //       client.send(data);
    //     }
    //   })

    // // 메세지 전송
    function sendMessage() {
        const nickname = document.getElementById("nickname").value
        const message = document.getElementById("message").value
        const fullMessage = `${nickname}: ${message}`
    
        ws.send(fullMessage)
        clearMessage()
    }

    ws.onmessage = sendMessage

    // // 메세지 수신
    function receiveMessage(event) {
        const chat = document.createElement("div")
        const message = document.createTextNode(event.data)
        chat.appendChild(message)

        const chatLog = document.getElementById("chat-log")
        chatLog.appendChild(chat)
    }
    
    ws.onmessage = receiveMessage

    // // input 비우기
    function clearMessage() {
        document.getElementById("message").value = '';
    }
})