import { createSlice } from '@reduxjs/toolkit'

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
            state.messages.push(action.payload)
        },
    },
})

export const { addMessage } = chatSlice.actions
export default chatSlice.reducer
