// import Room from '../../models/Chat/Room.js'
import client from "../../models/prisma/prisma.js"
import roomOptions from './room_options.js'
/*
      This is the handler for the queue options.
      This will be called when a user enters the queue.
      (deprecated)
*/
var queue = []
var room = []
const queueOptions = (socket, io) => {
    roomOptions(socket, io)

    socket.on('joinQueue', async (data) => {
        console.log(`[Backend ⚡️]: ${data.name} joined the queue`)
        if (queue.length >= 1) {
            try {
                room.push(queue.pop())
                room.push(data)
                const newRoom = await  client.Room.create({
                    ata: {
                        users: {
                            connect: [
                                { name: room[0].name },
                                { name: room[1].name }
                            ]
                        },
                        messages: [],
                        isVideo: false,
                        name: `${room[0].name} and ${room[1].name}'s room`,
                    }
                })
               

                socket.join(newRoom.id.toString())


                io.emit('joinQueue', newRoom)
            } catch (err) {
                console.log(err)
            }
        } else {
            queue.push(data)
            io.emit('joinQueue', data)
        }

        console.log(queue)
    })

    socket.on('leaveQueue', (data) => {
        console.log(`[Backend ⚡️]: ${data.name} left the queue`)
        queue = queue.filter((user) => user.name !== data.name)
        io.emit('leaveQueue', data)
    })

    socket.on('getQueueStatus', (data) => {
        console.log(`[Backend ⚡️]: ${data.name} requested the queue status`)
        io.emit('getQueueStatus', {
            queue: queue,
            queueSize: queue.length,
            queuePosition: queue.findIndex((user) => user.name === data.name),
        })
    })

    socket.on('clearQueue', (data) => {
        console.log(`[Backend ⚡️]: ${data.name} cleared the queue`)
        queue = []
        io.emit('clearQueue', { data, queue })
    })
}

export default queueOptions
