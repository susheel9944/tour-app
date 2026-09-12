import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from './axios';

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}
console.log('api++');
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginData,
  { rejectValue: string }
>('login/loginUser', async (loginData, { rejectWithValue }) => {
  console.log('action data', loginData);
  try {
    const response = await api.post<LoginResponse>(
      '/api/auth/login',
      loginData,
    );
    console.log('response action', response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error action', error);
      return rejectWithValue(
        error.response?.data?.message || 'Invalid email or password',
      );
    }

    return rejectWithValue('Something went wrong. Please try again.');
  }
});
