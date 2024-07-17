import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_PROD_BACKEND_URL;

if (!BASE_URL) throw new Error('Missing backend URL');

const initialState = {
  posts: [],
};

export const loadPosts = createAsyncThunk('feed/loadPosts', async () => {
  const response = await axios.get(`${BASE_URL}/api/feed/get_posts`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data.posts;
});

export const createPost = createAsyncThunk('feed/createPost', async (post, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/feed/create_post`, post, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
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
        `${BASE_URL}/api/feed/upvote_post/`,
        { isUpvoted, isDownvoted, postId, onid },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      return response.data.post;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const downvotePostAsync = createAsyncThunk(
  'feed/downvotePost',
  async ({ postId, isUpvoted, isDownvoted, onid }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/feed/downvote_post/`,
        { isUpvoted, isDownvoted, postId, onid },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      return response.data.post;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const editPost = createAsyncThunk(
  'feed/editPost',
  async ({ postId, content }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/feed/edit_post/`,
        { postId, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      return response.data.post;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const deletePost = createAsyncThunk(
  'feed/deletePost',
  async ({ postId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/feed/delete_post/`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      if (action.payload) {
        state.posts = action.payload[0]?.posts;
      } else {
        state.posts = [];
      }
      // state.posts = action.payload ? action.payload[0]?.posts
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state?.posts?.unshift(action.payload);
    });
    builder.addCase(upvotePostAsync.fulfilled, (state, action) => {
      const postIndex = state.posts.findIndex((post) => post._id === action.payload._id);
      if (postIndex !== -1) {
        state.posts[postIndex].upvotes = action.payload.upvotes;
        state.posts[postIndex].downvotes = action.payload.downvotes;
      }
    });
    builder.addCase(downvotePostAsync.fulfilled, (state, action) => {
      const postIndex = state.posts.findIndex((post) => post._id === action.payload._id);
      if (postIndex !== -1) {
        state.posts[postIndex].downvotes = action.payload.downvotes;
        state.posts[postIndex].upvotes = action.payload.upvotes;
      }
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      const postIndex = state.posts.findIndex((post) => post._id === action.payload._id);
      if (postIndex !== -1) {
        state.posts[postIndex].content = action.payload.content;
      }
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
    });
  },
});

export const selectAllPosts = (state) => state.feed.posts;

export default feedSlice.reducer;
