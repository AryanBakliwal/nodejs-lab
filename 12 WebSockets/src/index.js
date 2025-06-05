const io = require('socket.io')(3000, {
    cors: {
        origin: ["http://127.0.0.1:5500"], // frontend
    }
})

io.on('connection', socket => {
    console.log(socket.id);
    socket.on('send-message', (msg, room) => {
        if(room === '') {
            // now, all clients receive this message, including the one that sent the message so for them, it gets printed twice
            // io.emit('receive-message', msg) we want only others to receive the message, so  use broadcast
            socket.broadcast.emit('receive-message', msg);
        } else {
            socket.to(room).emit('receive-message', msg); // send only to the socket.id = room
        }
    })
    socket.on('join-room', (room, cb) => {
        socket.join(room);
        cb(`Joined room: ${room}`);
    })
})