import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isVerify: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkLoginStatus: (state, action) => {
      state.isAuthenticated = action.payload;
      state.isVerify = action.payload;
      state.isLoading = false;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },

    getInstructorId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { checkLoginStatus, startLoading, getInstructorId } =
  authSlice.actions;
export default authSlice.reducer;
