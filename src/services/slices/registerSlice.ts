import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { registerUser, RegistrationData } from '../api/registrationAction';

interface RegisterState {
  data: RegistrationData;
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: RegisterState = {
  data: {
    name: '',
    email: '',
    password: '',
  },
  loading: false,
  success: false,
  error: null,
};

const registerSlice = createSlice({
  name: 'register',

  initialState,

  reducers: {
    setRegistrationData: (state, action: PayloadAction<RegistrationData>) => {
      state.data = action.payload;
    },

    clearRegistration: state => {
      state.data = {
        name: '',
        email: '',
        password: '',
      };

      state.loading = false;
      state.success = false;
      state.error = null;
    },

    clearRegisterError: state => {
      state.error = null;
    },

    clearRegisterSuccess: state => {
      state.success = false;
    },
  },

  extraReducers: builder => {
    builder

      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

export const {
  setRegistrationData,
  clearRegistration,
  clearRegisterError,
  clearRegisterSuccess,
} = registerSlice.actions;

export default registerSlice.reducer;
