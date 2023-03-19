import { createSlice } from '@reduxjs/toolkit';

export const socketMiddleware = (socket) => (params) => (next) => (action) => {
  const { dispatch, getState } = params;
  const { type, payload } = action;

  switch (type) {
    case 'video/connect':
      console.log('connecting to socket');
      console.log(payload);
      console.log(type);
      socket.connect(payload.url);

      socket.on('connect', () => {
        console.log('connected to socket');
      });

      socket.on('join', (data) => {
        console.log(`[Frontend ??]: ${data.username} joined.`);
        let init = {
          username: data.username,
          message: 'joined the room',
        };
        dispatch(addMessage(init));
        di;
      });

      break;

    case 'video/join':
      console.log(`${payload.username} joining room`);

      socket.emit('join', {
        username: payload.username,
        room: payload.room,
      });

      break;

    case 'video/disconnect':
      socket.disconnect();
      break;

    default:
      break;
  }
  return next(action);
}

const initialState = {
  video: null,
  status: 'idle',
  error: null,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
});

export default videoSlice.reducer;
