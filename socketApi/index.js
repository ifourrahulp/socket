const app = require('express')();
let http = require("http").Server(app);
const {Server} = require("socket.io");
console.log('checked');
const io = new Server(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

app.get('/', (req, res) => {
    console.log('hello');
    res.send("GET Request Called");
})

io.on("connection", socket => {
    // Log Whenever a user connect
    console.log("user connected");
    io.emit("message", {type: "inital", text: 'Hello'});
    socket.on("disconnect", function() {
        console.log("user disconnected");  
    });

    socket.on("message", message => {
        console.log("message Recieved:" + message);
        io.emit("message", {type: "new message", text: message});
    });
});

http.listen(7000, () => {
    console.log("started on port 7000");
})