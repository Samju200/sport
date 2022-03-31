import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tokenReducer from '../features/auth/tokenSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    token: tokenReducer,
  },
});
