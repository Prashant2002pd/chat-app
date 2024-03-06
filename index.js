const express=require('express');
const  app = express();
const http= require("http")
const server=http.createServer(app);
const { Server }= require("socket.io");
const io=new Server(server);

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) =>{
    const  username='User' + Math.floor(Math.random()*100).toString();
    socket.broadcast.emit('chat message',username+' connected');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message',username+': ' + msg);
      });

   socket.on('disconnect',()=>{
       console.log('user disconnected');
   });
});

server.listen(3000)
