import { configureStore, combineReducers } from '@reduxjs/toolkit';

import VideoSlice from '../slices/VideoSlice';
import ChatSlice from '../slices/ChatSlice';
import UserSlice from '../slices/UserSlice';
import FeedSlice from '../slices/FeedSlice';

const rootReducer = combineReducers({
  video: VideoSlice,
  chat: ChatSlice,
  user: UserSlice,
  feed: FeedSlice,
});


const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // }).concat(socketMiddleware(socket)),
});

export default store;
