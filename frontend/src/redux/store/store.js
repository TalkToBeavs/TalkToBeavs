import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';

import VideoSlice from '../slices/VideoSlice';
import ChatSlice, { socketMiddleware } from '../slices/ChatSlice';
import UserSlice from '../slices/UserSlice';
import FeedSlice from '../slices/FeedSlice';
import { Socket } from '../../lib/socket';

const rootReducer = combineReducers({
  video: VideoSlice,
  chat: ChatSlice,
  user: UserSlice,
  feed: FeedSlice,
});

// const socket = new Socket();

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
    // }).concat(socketMiddleware(socket)),
});

export default store;
