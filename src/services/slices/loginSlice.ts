import { createSlice } from '@reduxjs/toolkit';
import { LoginResponse, loginUser } from '../api/loginAction';

interface LoginState {
  user: LoginResponse['data'] | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: LoginState = {
  user: null,
  loading: false,
  success: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',

  initialState,

  reducers: {
    clearLogin: state => {
      state.user = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },

    clearLoginError: state => {
      state.error = null;
    },

    clearLoginSuccess: state => {
      state.success = false;
    },
  },

  extraReducers: builder => {
    builder

      // Request started
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      // Login successful
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload.data || null;
      })

      // Login failed
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { clearLogin, clearLoginError, clearLoginSuccess } =
  loginSlice.actions;

export default loginSlice.reducer;
