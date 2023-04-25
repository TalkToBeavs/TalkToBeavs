import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import usersJson from '../../data/users.json';

const mappedUsers = usersJson.map((user) => {
  return {
    ...user,
  };
});

export const loadUserData = createAsyncThunk(
  'user/loadUserData',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://talk-to-beavs.herokuapp.com/api/auth/load_user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://talk-to-beavs.herokuapp.com/api/auth/register', values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const editUser = createAsyncThunk('user/edit', async (values, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`https://talk-to-beavs.herokuapp.com/api/profile/edit_profile`, values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const followUser = createAsyncThunk('user/follow', async (values, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://talk-to-beavs.herokuapp.com/api/social/follow_user', values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const initialState = {
  data: null,
  isLoggedIn: false,
  message: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    loadUser: (state, action) => {
      const onid = action.payload;
      let email = onid + '@oregonstate.edu';
      let user = mappedUsers.find((user) => user.email === email);
      state.data = user;
    },
    loginUser: (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
      state.message = null;
    },
    logoutUser: (state) => {
      state.data = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
      state.message = null;
    },
    editUserInfo: (state, action) => {
      state.data.standing = action.payload.standing;
      state.data.major = action.payload.major;
      state.data.bio = action.payload.bio;
      state.data.name = action.payload.name;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.message = action.payload.message;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.message = action.payload.message;
      state.isLoading = false;
      state.error = 'Register Failed';
    });
    builder.addCase(loadUserData.fulfilled, (state, action) => {
      state.data = action.payload.user;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
      state.message = null;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.data = action.payload.userWithoutPassword;
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.data = action.payload.user;
    });
  },
});

export const { setUser, loadUser, loginUser, logoutUser, editUserInfo } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state) => state.user.data;

export const selectIsFollowing = (action) => (state) => {
  let isFollowing = false;

  if (state.user.data) {
    isFollowing = state.user.data.following.find((user) => user.toString() === action.toString());
  }

  return isFollowing?.length > 0;
};
