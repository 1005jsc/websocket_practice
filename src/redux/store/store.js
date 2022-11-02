import { configureStore } from '@reduxjs/toolkit';
import { chatReducer } from '../modules/chatSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});
