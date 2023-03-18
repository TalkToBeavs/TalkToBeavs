import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

export const socketMiddleware = (socket) => (params) => (next) => (action) => {
    const { dispatch, getState } = params
    const { type, payload } = action

    switch (type) {

        case 'chat/connect':
            console.log('connecting to socket')
            console.log(payload)
            console.log(type)
            socket.connect(payload.url)

            socket.on('connect', () => {
                console.log('connected to socket')
            })


            socket.on('join', (data) => {
                console.log(`[Frontend ⚡️]: ${data.username} joined.`)
                let init = {
                    username: data.username,
                    message: 'joined the room',
                }
                dispatch(addMessage(init))
                di
            })

            break

        case 'chat/join':
            console.log(`${payload.username} joining room`)

            socket.emit('join', {
                username: payload.username,
                room: payload.room,
            })

            break


        case 'chat/disconnect':
            socket.disconnect()
            break

        default:
            break

    }
    return next(action)
}


const initialState = {
    messages: [],
    status: 'idle',
    error: null,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages = [...state.messages, action.payload]
        },
    },
})

export const { addMessage } = chatSlice.actions
export default chatSlice.reducer
