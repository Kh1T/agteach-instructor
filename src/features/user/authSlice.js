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
      const { IsAuthenticated, IsVerify } = action.payload;  
      state.isAuthenticated = IsAuthenticated;
      state.isVerify = IsVerify;
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
