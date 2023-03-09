const net = require('net');
const EventEmitter = require('events');

class TcpClient extends EventEmitter{
        constructor(host, port){
                super();
                this.host = host;
                this.port = port;
                this.init();

                this.on('hi',(data)=>{
                        console.log('resp::', data.message);
                })
        }

        async init(){

                this.sock = new net.Socket();
                this.sock.on('connect', ()=>{
                        console.log('socket connected!');
                })

                this.sock.on('close', ()=> {
                        console.log('socket closed!');

                        // reconnect
                        this.init();
                        setTimeout(()=>{
                                this.connect();
                        },1000);
                })

                this.sock.on('data',(buf)=>{
                        //buffer to string
                        const str = buf.toString();
                        
                        // string to json
                        const json = JSON.parse(str);

                        // const json = JSON.parse(buf.toString());
                        this.emit(json.handle, json)
                })

                this.sock.on('error',()=>{
                        this.sock.destroy();
                })

        }

        async connect(){
                return new Promise(resolve => {
                        this.sock.connect(this.port, this.host);
                        resolve();
                })
        }

        send(data){
                this.sock.write(Buffer.from(JSON.stringify(data)));
        }
}


module.exports =TcpClient

(async()=>{
    const client = new TcpClient('localhost', 5000);
    await client.connect();
    client.send({handle:"hi", name: "trump"});
    client.send({handle:"hi", name: "biden"});
})();