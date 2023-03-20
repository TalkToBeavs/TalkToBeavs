import * as queue_options from './queue_options.js'
import * as chat_options from './chat_options.js'
/*
      This is the handler for a new connection.
      It will be called when a new connection is made to the server.

      We can use this to log the connection and disconnect events.
*/
var queue = []
const newConnection = (socket, io) => {
    chat_options.default(socket, io)
    
    socket.on('joinQueue', (data) => {
        console.log(`[Backend ⚡️]: ${data.name} joined the queue`);
        queue.push(socket);
        if (queue.length >= 2) {
            const peer1 = queue.shift();
            const peer2 = queue.shift();
            const roomId = socket.id;
            peer1.join(roomId);
            peer2.join(roomId);
            console.log(`[Backend ⚡️]: Peers joined room ${roomId}`);
            io.to(peer1.id).emit('matched', { message: `You have been matched! Room ID: ${roomId}`, room: roomId });
            io.to(peer2.id).emit('matched', { message: `You have been matched! Room ID: ${roomId}`, room: roomId });
        }
    });

    socket.on('getPeer', (data) => {
        const peers = io.sockets.adapter.rooms.get(data.room);
        if (peers) {
            const peerIds = Array.from(peers.keys());
            const peer = peerIds.find((id) => id !== socket.id);
            io.to(socket.id).emit('getPeer', { room: data.room, peer: peer });
        } else {
            io.to(socket.id).emit('getPeer', { room: null, peer: null });
        }
    });


    socket.on('joinRoom', (data) => {
        console.log(`[Backend ⚡️]: ${data.username} joined.`)
        io.to(roomId).emit('joinRoom', data)
    })

    socket.on('disconnect', () => {
        console.log(`[Backend ⚡️]: User disconnected with socket id ${socket.id}`);
        const index = queue.indexOf(socket);
        if (index !== -1) {
            queue.splice(index, 1);
        }
    })

    // socket.on("sdp", (data) => {
    //     socket.broadcast.emit("sdp", data)
    // })

    // socket.on("candidate", (data) => {
    //     socket.broadcast.emit("candidate", data)
    // })

    // Add the queue options handler
    // queue_options.default(socket, io)
}

export default newConnection
