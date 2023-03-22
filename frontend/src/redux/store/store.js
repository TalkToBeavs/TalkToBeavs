import { combineReducers, configureStore } from '@reduxjs/toolkit';

import ChatSlice from '../slices/ChatSlice';
import FeedSlice from '../slices/FeedSlice';
import UserSlice from '../slices/UserSlice';

const rootReducer = combineReducers({
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
