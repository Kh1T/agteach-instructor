import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isApproved: false,
  isRejected: false,
  isFormSubmitted: false,
  isApprovalLoading: true,
};

const approvalSlice = createSlice({
  name: "approval",
  initialState,
  reducers: {
    setInstructorVerificationStatus: (state, action) => {
      const { IsApproved, IsRejected, IsFormSubmitted, IsApprovalLoading } =
        action.payload;
      state.isApproved = IsApproved;
      state.isRejected = IsRejected;
      state.isFormSubmitted = IsFormSubmitted;
      state.isApprovalLoading = IsApprovalLoading;
    },
  },
});

export const { setInstructorVerificationStatus } = approvalSlice.actions;
export default approvalSlice.reducer;
