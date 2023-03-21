
const video_options = (socket, io) => {
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    socket.on("sdp", (data) => {
          io.in(roomId).emit("sdp", data);
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
          socket.leave(roomId);
    });

};

export default chat_options;