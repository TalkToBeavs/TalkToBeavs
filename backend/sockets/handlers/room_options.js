import Room from "../../models/Room.js";
/*
      This file handles the room options.
      This will be called when a user enters a room.

      The handlers for the room options are:
      - joinRoom
      - leaveRoom
      - getRoom
      - getRoomUsers
      - getRoomMessages
      - getRoomStatus
      - sendMessage
      - deleteRoom
*/

const roomOptions = (socket, io) => {
  socket.on("joinRoom", (data) => {
    console.log(`[Backend ⚡️]: ${data.name} joined room ${data.room}`);
    // create a new room
    socket.join(data.room);
    let message = {
      name: "Admin",
      message: `${data.name} has joined the room`,
      time: new Date().toLocaleTimeString(),
    };

    io.to(data.room).emit("message", message);

    io.emit("joinRoom", data);
  });

  socket.on("leaveRoom", (data) => {
    console.log(`[Backend ⚡️]: ${data.name} left room ${data.room}`);
    io.emit("leaveRoom", data);
  });

  socket.on("getRoom", (data) => {
    console.log(`[Backend ⚡️]: ${data.name} requested room ${data.room}`);
    io.emit("getRoom", data);
  });

  socket.on("getRoomUsers", (data) => {
    console.log(`[Backend ⚡️]: ${data.name} requested the room users`);
    io.emit("getRoomUsers", data);
  });

  socket.on("getRoomMessages", (data) => {
    console.log(`[Backend ⚡️]: ${data.name} requested the room messages`);
    io.emit("getRoomMessages", data);
  });

  socket.on("getRoomStatus", (data) => {
    console.log(`[Backend ⚡️]: ${data.name} requested the room status`);
    io.emit("getRoomStatus", data);
  });

  socket.on("sendMessage", (data) => {
    console.log(`[Backend ⚡️]: ${data.name} sent a message`);
    io.emit("sendMessage", data);
  });

  socket.on("deleteRoom", (data) => {
    console.log(`[Backend ⚡️]: ${data.name} deleted room ${data.room}`);
    io.emit("deleteRoom", data);
  });
};

export default roomOptions;
