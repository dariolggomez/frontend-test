import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchChannels, postChannel, updateChannel, fetchChannelById, fetchUsers, deleteChannel } from "./api";

const initialState = {
  channels: [],
  channelId: null,
  channel : null,
  user: null,
  users: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const fetchChannelsAsync = createAsyncThunk(
  "counter/fetchChannels",
  async () => {
    const response = await fetchChannels();
    return response.data;
  }
);

export const postChannelAsync = createAsyncThunk(
  "counter/postChannel",
  async (data) => {
    const response = await postChannel(data);
    return response.data;
  }
);

export const pushMessageToChannelAsync = createAsyncThunk(
  "counter/pushMessageToChannel",
  async (data) => {
    let channel = await fetchChannelById(data.id);
    channel.data.messages.push(data.message);
    const response = await updateChannel(channel.data.id, channel.data);
    return [response.data, channel.data];
  }
);

export const updateChannelAsync = createAsyncThunk(
  "counter/updateChannel",
  async (data) => {
    const response = await updateChannel(data.id, data.channel);
    return [response.data, data.channel];
  }
);

export const fetchChannelByIdAsync = createAsyncThunk(
  "counter/fetchChannelById",
  async (data) => {
    const response = await fetchChannelById(data);
    return response.data;
  }
);

export const deleteChannelAsync = createAsyncThunk(
  "counter/deleteChannel",
  async (data) => {
    const response = await deleteChannel(data);
    return response.data;
  }
);

export const fetchUsersAsync = createAsyncThunk(
  "counter/fetchUsers",
  async () => {
    const response = await fetchUsers();
    return response.data;
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    enterChannel: (state, action) => {
      state.channelId = action.payload;
    },
    loginUser: (state, action) => {
      state.user = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelsAsync.fulfilled, (state, action) => {
        state.channels = action.payload;
      })
      .addCase(postChannelAsync.fulfilled, (state, action) => {
        state.channels = action.payload;
      })
      .addCase(pushMessageToChannelAsync.fulfilled, (state, action) => {
        state.channels = action.payload[0];
        state.channel = action.payload[1];
      })
      .addCase(fetchChannelByIdAsync.fulfilled, (state, action) => {
        state.channel = action.payload;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(deleteChannelAsync.fulfilled, (state, action) => {
        state.channels = action.payload;
        state.channel = null;
      })
      .addCase(updateChannelAsync.fulfilled, (state, action) => {
        state.channels = action.payload[0];
        state.channel = action.payload[1];
      });
  },
});

export const { enterChannel, loginUser } = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectChannels = (state) => state.app.channels;

export const selectChannelId = (state) => state.app.channelId;

export const selectChannel = (state) => state.app.channel;

export const selectUser = (state) => state.app.user;

export const selectUsers = (state) => state.app.users;

export default appSlice.reducer;
