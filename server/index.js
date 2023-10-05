const express  = require("express");
const app = express();
const http = require("node:http");
const {Server} = require("socket.io");
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
});

io.on("connection",(socket)=>{
    socket.on("join_room",(room)=>{
        socket.join(room)
    })
    socket.on("send_message",(msg)=>{
        socket.to(msg.room).emit("receive_msg",msg);
    });
    socket.on("broadcast_msg",(msg)=>{
        socket.broadcast.emit("receive_msg",msg);
    });
});

server.listen(5001,()=>{
    console.log("Server is listening on port 5001");
})