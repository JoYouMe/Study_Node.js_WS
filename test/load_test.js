// load_test를 위한 ws

const ws = require("ws");

class WebSocket {
  constructor(socketUrl) {
    this.socketUrl = socketUrl;
    this.socket = new ws(socketUrl);
    this.TR11001 = {
      tr_code: 11001
    };
    this.TR823 = {
      tr_code: 823,
    };

    this.socket.on("open", this.handleOpen.bind(this));
    this.socket.on("message", this.handleMessage.bind(this));
    this.socket.on("close", this.handleClose.bind(this));
    this.socket.on("error", this.handleError.bind(this));
  }

  handleOpen(event) {
    console.log("WebSocket open");
    // this.messageInterval = setInterval(() => {
    // const message = JSON.stringify(this.TR823);
    // this.socket.send("ping");
    // }, 10);
  }

  handleMessage(event) {
    const response = event.toString();
    const message = JSON.stringify(this.TR823);
    if (response) this.socket.send(message);
  }

  handleClose(event) {
    console.log("WebSocket close");
    //   clearInterval(this.messageInterval);
  }

  handleError(error) {
    console.error("WebSocket error:", error);
  }
}

const socketUrl = "wss://api.n-pik.com";
// const ws1 = new WebSocket(socketUrl);
const maxSockets = 1000;
let count = 0;

while (count < maxSockets) {
  this.messageInterval = setTimeout(() => {
    const wsInstance = new WebSocket(socketUrl);
  }, 10);
  count++;
}
