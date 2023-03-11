import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
  },
});

export const { addPost } = feedSlice.actions;
export default feedSlice.reducer;