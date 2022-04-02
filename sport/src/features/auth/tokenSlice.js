// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import authService from './authService';

// // Get user from localStorage
// const token = JSON.parse(localStorage.getItem('token'));

// const initialState = {
//   token: token ? token : null,
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: '',
// };

// // Register user
// export const verification = createAsyncThunk(
//   'auth/token',
//   async (token, thunkAPI) => {
//     try {
//       return await authService.verification(token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const tokenSlice = createSlice({
//   name: 'token',
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.isError = false;
//       state.message = '';
//     },
//   },
// });

// export const { reset } = tokenSlice.actions;
// export default tokenSlice.reducer;
