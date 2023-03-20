import { createSlice } from '@reduxjs/toolkit';

export const socketMiddleware = (socket) => (params) => (next) => (action) => {
  const { dispatch, getState } = params;
  const { type, payload } = action;

  switch (type) {
    case 'chat/connect':
      console.log('connecting to socket');
      console.log(payload);
      socket.connect(payload.url);

      socket.on('connect', (data) => {
        console.log('connected to socket');
        console.log(payload);
        socket.emit('joinQueue', {
          name: payload.who,
        });
      });

      socket.on('joinQueue', (data) => {
        console.log('joined queue');
        console.log(data);
        socket.emit('getQueueStatus', {
          name: payload.who,
        });
      });

      socket.on('getQueueStatus', (data) => {
        console.log('queue status');
        console.log(data);
      });

      socket.on('join', (data) => {
        console.log(`[Frontend ⚡️]: ${data.username} joined.`);
        let init = {
          username: data.username,
          message: 'joined the room',
        };
        dispatch(addMessage(init));
      });

      break;

    case 'chat/join':
      console.log(`${payload.username} joining room`);

      socket.emit('join', {
        username: payload.username,
        room: payload.room,
      });

      break;

    case 'chat/disconnect':
      socket.disconnect();
      break;

    default:
      break;
  }
  return next(action);
};

const initialState = {
  messages: [],
  status: 'idle',
  error: null,
  users: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
