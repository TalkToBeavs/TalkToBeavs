import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
};

export const loadPosts = createAsyncThunk('feed/loadPosts', async () => {
  const response = await axios.get('https://talk-to-beavs.herokuapp.com/api/feed/get_posts');
  return response.data.posts;
});

export const createPost = createAsyncThunk('feed/createPost', async (post, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://talk-to-beavs.herokuapp.com/api/feed/create_post', post);
    return response.data.post;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload[0].posts;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts.unshift(action.payload);
    });
  },
});

export const selectAllPosts = (state) => state.feed.posts;

export default feedSlice.reducer;
