import * as queue_options from './queue_options.js'
import * as chat_options from './chat_options.js'
/*
      This is the handler for a new connection.
      It will be called when a new connection is made to the server.

      We can use this to log the connection and disconnect events.
*/
var textQueue = [];
var videoQueue = [];
const newConnection = (socket, io) => {
    chat_options.default(socket, io)

    socket.on('joinTextQueue', (data) => {
        console.log(`[Backend ⚡️]: ${data.name} joined the text queue`);
        textQueue.push(socket);
        if (textQueue.length >= 2) {
            const peer1 = textQueue.shift();
            const peer2 = textQueue.shift();
            const roomId = socket.id;
            peer1.join(roomId);
            peer2.join(roomId);
            console.log(`[Backend ⚡️]: Peers joined room ${roomId}`);
            io.to(peer1.id).emit('matched', { message: `You have been matched! Room ID: ${roomId}`, room: roomId });
            io.to(peer2.id).emit('matched', { message: `You have been matched! Room ID: ${roomId}`, room: roomId });
        }
    });

    socket.on('joinVideoQueue', (data) => {
        console.log(`[Backend ⚡️]: ${data.name} joined the video queue`);
        videoQueue.push(socket);
        if (videoQueue.length >= 2) {
            const peer1 = videoQueue.shift();
            const peer2 = videoQueue.shift();
            const roomId = socket.id;
            peer1.join(roomId);
            peer2.join(roomId);
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
        io.to(roomId).emit('joinRoom', data)
    })

    socket.on('disconnect', () => {
        const text_index = textQueue.indexOf(socket);
        const video_index = videoQueue.indexOf(socket);

        if (video_index !== -1) {
            videoQueue.splice(video_index, 1);
        } else {
            textQueue.splice(text_index, 1);
        }
    })

}

export default newConnection
