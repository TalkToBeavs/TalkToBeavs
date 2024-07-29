import client from "../../models/prisma/prisma.js"

const roomOptions = (socket, io) => {
    socket.on('joinRoom', async (data) => {
        console.log(`[Backend ⚡️]: ${data.name} joined room ${data.room}`);
        
        try {
            // Find or create the room
            let room = await prisma.room.findUnique({
                where: { id: parseInt(data.room) },
                include: { users: true }
            });

            if (!room) {
                room = await prisma.room.create({
                    data: { id: parseInt(data.room), name: `Room ${data.room}` },
                    include: { users: true }
                });
            }

            // Add user to the room
            await prisma.room.update({
                where: { id: parseInt(data.room) },
                data: { users: { connect: { name: data.name } } }
            });

            socket.join(data.room);

            let message = {
                name: 'Admin',
                message: `${data.name} has joined the room`,
                time: new Date().toLocaleTimeString(),
            };

            await prisma.message.create({
                data: {
                    content: message.message,
                    roomId: parseInt(data.room),
                    senderName: message.name
                }
            });

            io.to(data.room).emit('message', message);
            io.emit('joinRoom', data);
        } catch (error) {
            console.error(`Error in joinRoom: ${error}`);
        }
    });

    socket.on('leaveRoom', async (data) => {
        console.log(`[Backend ⚡️]: ${data.name} left room ${data.room}`);
        try {
            await prisma.room.update({
                where: { id: parseInt(data.room) },
                data: { users: { disconnect: { name: data.name } } }
            });
            io.emit('leaveRoom', data);
        } catch (error) {
            console.error(`Error in leaveRoom: ${error}`);
        }
    });

    socket.on('getRoom', async (data) => {
        console.log(`[Backend ⚡️]: ${data.name} requested room ${data.room}`);
        try {
            const room = await prisma.room.findUnique({
                where: { id: parseInt(data.room) },
                include: { users: true, messages: true }
            });
            io.emit('getRoom', room);
        } catch (error) {
            console.error(`Error in getRoom: ${error}`);
        }
    });

    socket.on('getRoomUsers', async (data) => {
        console.log(`[Backend ⚡️]: ${data.name} requested the room users`);
        try {
            const room = await prisma.room.findUnique({
                where: { id: parseInt(data.room) },
                include: { users: true }
            });
            io.emit('getRoomUsers', room.users);
        } catch (error) {
            console.error(`Error in getRoomUsers: ${error}`);
        }
    });

    socket.on('getRoomMessages', async (data) => {
        console.log(`[Backend ⚡️]: ${data.name} requested the room messages`);
        try {
            const messages = await prisma.message.findMany({
                where: { roomId: parseInt(data.room) },
                orderBy: { createdAt: 'asc' }
            });
            io.emit('getRoomMessages', messages);
        } catch (error) {
            console.error(`Error in getRoomMessages: ${error}`);
        }
    });

    socket.on('getRoomStatus', async (data) => {
        console.log(`[Backend ⚡️]: ${data.name} requested the room status`);
        try {
            const room = await prisma.room.findUnique({
                where: { id: parseInt(data.room) },
                include: { users: true, messages: true }
            });
            io.emit('getRoomStatus', room);
        } catch (error) {
            console.error(`Error in getRoomStatus: ${error}`);
        }
    });

    socket.on('sendMessage', async (data) => {
        console.log(`[Backend ⚡️]: ${data.name} sent a message`);
        try {
            const message = await prisma.message.create({
                data: {
                    content: data.message,
                    roomId: parseInt(data.room),
                    senderName: data.name
                }
            });
            io.emit('sendMessage', message);
        } catch (error) {
            console.error(`Error in sendMessage: ${error}`);
        }
    });

    socket.on('deleteRoom', async (data) => {
        console.log(`[Backend ⚡️]: ${data.name} deleted room ${data.room}`);
        try {
            await prisma.room.delete({
                where: { id: parseInt(data.room) }
            });
            io.emit('deleteRoom', data);
        } catch (error) {
            console.error(`Error in deleteRoom: ${error}`);
        }
    });
}

export default roomOptions;