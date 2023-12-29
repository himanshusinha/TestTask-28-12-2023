import {createAsyncThunk} from '@reduxjs/toolkit';
import {ASYNC_ROUTES} from '../constants/redux.constant';
import {signUpService} from '../services/auth_services';
//loginThunk
export const loginAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.LOGIN,
  async (payload, {rejectWithValues}) => {
    console.log(payload, '...payload from login');

    try {
      const response = await loginService(payload);
      return response;
    } catch (error) {
      return rejectWithValues;
    }
  },
);
//signUpThunk
export const signUpAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.SIGN_UP,
  async (payload, {rejectWithValue}) => {
    console.log(payload, '...payload from signUp');
    try {
      const response = await signUpService(payload);

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
