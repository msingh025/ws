let Socket  = require('socket.io');
const server = require('http').createServer();
const io = Socket(server,  { serveClient: false });
let connectedUser={};
io.on('connection', (socket)=>{
    console.log('connection done');
    socket.on('login', (data)=>{
      
        connectedUser[data.id]= socket;
        socket.userId= data.id;
        console.log(data.id);
       // socket.emit('login', data)
        //socket.broadcast.emit('login', Object.keys(connectedUser));
        io.sockets.emit('login', Object.keys(connectedUser));
    })
    socket.on('chat',(data)=>{
        io.sockets.emit('chat', data);
    });
    socket.on('typing', (data)=>{
         console.log('typing')
         io.sockets.emit('typing', data);
       // socket.broadcast.emit('typing', 'hello')
    })
    
    socket.on('disconnect', (data)=> {
        delete connectedUser[socket.userId];
        console.log(`deleted ${socket.userId}`);
    });
});


server.listen(3000);