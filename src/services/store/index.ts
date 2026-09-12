import { configureStore } from '@reduxjs/toolkit';
import registerSlice from '../slices/registerSlice';
import loginReducer from '../slices/loginSlice';
export const store = configureStore({
  reducer: {
    registerUser: registerSlice,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
