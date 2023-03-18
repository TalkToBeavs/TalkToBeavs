import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    video: null,
    status: 'idle',
    error: null,
}

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {},
})

export default videoSlice.reducer;