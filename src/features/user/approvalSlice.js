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
    /**
     * Set the instructor verification status.
     * @param {Object} state - the current state
     * @param {Object} action - the action containing the new status
     * @prop {Boolean} IsApproved - whether the instructor is approved
     * @prop {Boolean} IsRejected - whether the instructor is rejected
     * @prop {Boolean} IsFormSubmitted - whether the instructor has submitted the form
     * @prop {Boolean} IsApprovalLoading - whether the approval is loading
     */
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
