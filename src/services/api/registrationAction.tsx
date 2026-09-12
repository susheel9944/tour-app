import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from './axios';

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegistrationData,
  { rejectValue: string }
>('register/registerUser', async (registrationData, { rejectWithValue }) => {
  try {
    const response = await api.post<RegisterResponse>(
      '/api/auth/register',
      registrationData,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed',
      );
    }

    return rejectWithValue('Something went wrong. Please try again.');
  }
});
