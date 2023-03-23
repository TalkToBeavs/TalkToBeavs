import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
};

export const loadPosts = createAsyncThunk('feed/loadPosts', async () => {
  const response = await axios.get('http://localhost:8080/api/feed/get_posts');
  return response.data.posts;
});

export const createPost = createAsyncThunk('feed/createPost', async (post, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8080/api/feed/create_post', post);
    return response.data.post;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const upvotePostAsync = createAsyncThunk(
  'feed/upvotePost',
  async ({ postId, isUpvoted, isDownvoted, onid }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://talk-to-beavs.herokuapp.com/api/feed/upvote_post/`,
        { isUpvoted, isDownvoted, postId, onid }
      )
      return response.data.post
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const downvotePostAsync = createAsyncThunk(
  'feed/downvotePost',
  async ({ postId, isUpvoted, isDownvoted, onid }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://talk-to-beavs.herokuapp.com/api/feed/downvote_post/`,
        { isUpvoted, isDownvoted, postId, onid }
      )
      return response.data.post
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const editPost = createAsyncThunk(
  'feed/editPost',
  async ({ postId, content }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://talk-to-beavs.herokuapp.com/api/feed/edit_post/`,
        { postId, content }
      )
      return response.data.post
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const deletePost = createAsyncThunk(
  'feed/deletePost',
  async ({ postId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://talk-to-beavs.herokuapp.com/api/feed/delete_post/`,
        { postId }
      )
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

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
    builder.addCase(upvotePostAsync.fulfilled, (state, action) => {
      const postIndex = state.posts.findIndex(post => post._id === action.payload._id);
      if (postIndex !== -1) {
        state.posts[postIndex].upvotes = action.payload.upvotes;
        state.posts[postIndex].downvotes = action.payload.downvotes;
      }
    });
    builder.addCase(downvotePostAsync.fulfilled, (state, action) => {
      const postIndex = state.posts.findIndex(post => post._id === action.payload._id);
      if (postIndex !== -1) {
        state.posts[postIndex].downvotes = action.payload.downvotes;
        state.posts[postIndex].upvotes = action.payload.upvotes;
      }
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      const postIndex = state.posts.findIndex(post => post._id === action.payload._id);
      if (postIndex !== -1) {
        state.posts[postIndex].content = action.payload.content;
      }
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      console.log("action.payload.posts: ", action.payload.posts)
      state.posts = action.payload.posts;
    });
  },
});

export const selectAllPosts = (state) => state.feed.posts;

export default feedSlice.reducer;
