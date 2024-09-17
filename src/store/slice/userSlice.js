import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  dob: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setDob: (state, action) => {
      state.dob = action.payload;
    },
    clearUser: (state) => {
      state.email = "";
      state.dob = "";
    },
  },
});

export const { setEmail, setDob, clearUser } = userSlice.actions;
export default userSlice.reducer;
