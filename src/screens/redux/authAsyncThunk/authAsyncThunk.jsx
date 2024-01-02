import {createAsyncThunk} from '@reduxjs/toolkit';
import {ASYNC_ROUTES} from '../constants/redux.constant';
import {
  getAllCarsService,
  loginService,
  signUpService,
} from '../services/auth_services';
//loginThunk
export const loginAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.LOGIN,
  async (payload, {rejectWithValue}) => {
    console.log(payload, '...payload from signUp');
    try {
      const response = await loginService(payload);

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
//getAllCarsAsyncThunk
export const getAllCarsAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.GET_ALL_CARS,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await getAllCarsService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
