import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  dob: "",
  name: "",
  image: "",
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
    setUser: (state, action) => {
      state.name = action.payload;
      state.image = action.payload;
    },
    clearUser: (state) => {
      state.email = "";
      state.dob = "";
    },
  },
});

export const { setEmail, setDob, clearUser, setUser } = userSlice.actions;
export default userSlice.reducer;
