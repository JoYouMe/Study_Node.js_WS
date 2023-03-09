const net = require('net');
const EventEmitter = require('events');

class TcpServer{
        constructor(port){        

                this.port = port
                this.server = net.createServer(client => {
                        client = new Client(client);
                });

                this.server.on('connection', () => {
                    console.log('someone connected!');
            })


        }
        listen(){
                this.server.listen(this.port, ()=> {
                        console.log(`Hello TCP Server: ${this.port}`)
                })
        }
}

class Client extends EventEmitter{
        constructor(socket){
                super();
                this.socket = socket;

                this.socket.on('connect',()=>{
                        console.log('socket connect')
                })

                this.socket.on('data', data =>{
                        console.log('recv buffer::\n', data)
                        console.log('===================================')
                        const str_data = data.toString();
                        console.log('recv string::\n', str_data);
                        console.log('===================================')
                        const json_data = JSON.parse(data.toString());
                        console.log('recv json::\n',json_data);
                        console.log('===================================')
                       
                        this.emit(json_data.handle, json_data);
                })

                this.socket.on('error', e => {
                        console.log(e);
                })

                this.socket.on('end', ()=>{
                        console.log(`socket end`);
                })

                this.socket.on('close', ()=>{
                        console.log('socket close');
                })

                this.on('hi',(data)=>{
                        this.socket.write(Buffer.from(JSON.stringify({handle:'hi', message:`hi ${data.name}. nice to meet you`})));
                })
        }
}


const server = new TcpServer(5000);
server.listen();