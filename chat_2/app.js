const express = require("express")
const { WebSocketServer } = require("ws")
const app = express()

app.use(express.static("public"))

const httpServer = app.listen(8000, () => {
  console.log(`Example app listening on port 8000`)
})

const wss = new WebSocketServer({ server: httpServer })

// Broadcast
wss.on("connection", (ws, request) => {
    wss.clients.forEach(client => {
        client.send(`New User connecting 😝 현재 ${wss.clients.size} 명`) // wss.clients는 list가 아닌 Set이므로 length 대신 size 사용
        console.log(wss.clients.size);
    })
    
    // client에서 수신
    function receiveMessage(event) {
        const chat = document.createElement("div")
        const message = document.createTextNode(event.data)
        chat.appendChild(message)
            
        const chatLog = document.getElementById("chat-log")
        chatLog.appendChild(chat)
    }
            
    ws.onmessage = receiveMessage;
})


