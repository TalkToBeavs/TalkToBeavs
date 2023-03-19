import Room from '../../models/Chat/Room.js'
import roomOptions from './room_options.js'
/*
      This is the handler for the queue options.
      This will be called when a user enters the queue.
      
      The handlers for the queue options are:
      - joinQueue
      - leaveQueue
      - getQueue
      - getQueueSize
      - getQueuePosition
      - getQueueStatus
*/

const queueOptions = (socket, io) => {
    var queue = []
    roomOptions(socket, io)

    socket.on('joinQueue', async (data) => {
        console.log(`[Backend ⚡️]: ${data.name} joined the queue`)
        if (queue[0] && queue[0].name !== data.name) {
            try {
                io.emit('joinRoom', {
                    name: queue[0].name,
                })
                queue = []
                console.log('Room created: ')
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
