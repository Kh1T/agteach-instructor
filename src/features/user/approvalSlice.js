import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isApproved: false,
  isRejected: false,
  isFormSubmitted: false,
  isLoading: true,
};

const approvalSlice = createSlice({
  name: "approval",
  initialState,
  reducers: {
    setInstructorVerificationStatus: (state, action) => {
      const { IsApproved, IsRejected, IsFormSubmitted, IsLoading } = action.payload;
      state.isApproved = IsApproved;
      state.isRejected = IsRejected;
      state.isFormSubmitted = IsFormSubmitted;
      state.isLoading = IsLoading;
    },
  },
});

export const { setInstructorVerificationStatus } = approvalSlice.actions;
export default approvalSlice.reducer;
