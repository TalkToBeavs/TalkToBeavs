import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  video: null,
  options: null,
  status: 'idle',
  error: null,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideo: (state, action) => {},
  },
});

export default videoSlice.reducer;
