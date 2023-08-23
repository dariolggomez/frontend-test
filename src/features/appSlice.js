import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchChannels, postChannel } from "./api";

const initialState = {
  channels: [],
  channelId: null,
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

export const appSlice = createSlice({
  name: "app",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    enterChannel: (state, action) => {
      state.channelId = action.payload;
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
      });
  },
});

export const { enterChannel } = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectChannels = (state) => state.app.channels;

export const selectChannelId = (state) => state.app.channelId;

export default appSlice.reducer;