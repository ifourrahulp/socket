const app = require('express')();
let http = require("http").Server(app);
const WebSocket = require('ws');
console.log('checked');
const clients = new Map();
app.get('/', (req, res) => {
  console.log('hello');
  res.send("GET Request Called");
})

const wss = new WebSocket.Server({port: 7000}, () => {
    console.log("started on port 7071");
});


wss.on('connection', (ws) => {
  console.log('con successs');
    const id = uuidv4();
    //console.log(id);

    const color = Math.floor(Math.random() * 360);
    //console.log(color);
    const message = 'hello';
    const metadata = {  message };

    clients.set(ws, metadata);

    ws.on('message', (messageAsString) => {
      //console.log(messageAsString, 'sslsllsls');
      const metadata = clients.get(ws);
      console.log(metadata, 'sksksk');
     // const message = JSON.parse(messageAsString);
      
     

      // message.sender = metadata.id;
      // message.color = metadata.color;
      message.message = metadata.message;
      console.log(message.message, 's');
      [...clients.keys()].forEach((client) => {
        client.send(JSON.stringify(message));
      });
    }); 
    
    
});


wss.on("close", () => {
    clients.delete(ws);
});

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

console.log("wss up");


