/*
      This is the handler for the chat options.
      The chat options are the options that are available in the chat room.

      Both Video and Text chat rooms will use this handler.
*/
const chat_options = (socket, io) => {
      const { roomId } = socket.handshake.query;
      socket.join(roomId);

      socket.on("newMessage", (data) => {
            io.in(roomId).emit("newMessage", data);
      });

      socket.on("disconnect", () => {
            socket.leave(roomId);
      });

      socket.on("joinRoom", (data) => {
            socket.to(roomId).emit("joinRoom", data);
      });

      socket.on("message", (data) => {
            io.in(roomId).emit("message", data);
      });

      socket.on("sdp", (data) => {
            socket.to(roomId).emit("sdp", data);
      });

      socket.on("name", (data) => {
            socket.to(roomId).emit("name", data);
      });
      
      socket.on("candidate", (data) => {
            socket.to(roomId).emit("candidate", data);
      });

};

export default chat_options;