import * as queue_options from './queue_options.js'
/*
      This is the handler for a new connection.
      It will be called when a new connection is made to the server.

      We can use this to log the connection and disconnect events.
*/
const newConnection = (socket, io) => {
    console.log(`[Backend ⚡️]: New Connection: ${socket.id}`)
    socket.on('disconnect', () => {
        console.log(`[Backend ⚡️]: Disconnected!`)
    })

    // Add the queue options handler
    queue_options.default(socket, io)
}

export default newConnection
