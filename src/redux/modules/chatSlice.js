import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const __

const initialState = {
  roomList: [],
  messageList: [],
  chatOnChange: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messageList.push(action.payload);
      state.chatOnChange = true;
    },
    resetChatOnChange: (state, action) => {
      state.chatOnChange = false;
    },
  },
  extraReducers: {},
});

export const chatReducer = chatSlice.reducer;
export const chatActions = chatSlice.actions;
