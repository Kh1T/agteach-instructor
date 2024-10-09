import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  courseData: {},
  isLoading: true,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },

    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setCourse: (state, action) => {
      state.courseData = action.payload;
    },

    clearUser: (state) => {
      state.courseData = {};
    },
  },
});

export const { setId, setCourse, isLoading, clearUser } = courseSlice.actions;
export default courseSlice.reducer;
