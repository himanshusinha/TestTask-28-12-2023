// authResponseSlice.js
import {createSlice} from '@reduxjs/toolkit';

// Initial state
const initialState = {
  status: null,
  message: null,
  token: null,
  error: null,
};

// Slice
const authResponseSlice = createSlice({
  name: 'authResponse',
  initialState,
  reducers: {
    setAuthResponse: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.token = action.payload.token;
      state.error = null;
    },
    setError: (state, action) => {
      state.status = null;
      state.message = null;
      state.token = null;
      state.error = action.payload;
    },
    clearResponse: state => {
      state.status = null;
      state.message = null;
      state.token = null;
      state.error = null;
    },
  },
});

// Actions
export const {setAuthResponse, setError, clearResponse} =
  authResponseSlice.actions;

// Reducer
export default authResponseSlice.reducer;
