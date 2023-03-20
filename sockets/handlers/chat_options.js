
const chat_options = (socket, io) => {
      const { roomId } = socket.handshake.query;
      socket.join(roomId);

      socket.on("newMessage", (data) => {
            io.in(roomId).emit("newMessage", data);
      });

      // Leave the room if the user closes the socket
      socket.on("disconnect", () => {
            socket.leave(roomId);
      });

};

export default chat_options;