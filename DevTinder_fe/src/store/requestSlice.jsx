import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addrequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const newArr = state.filter((request) => request._id !== action.payload);
      return newArr;
    },
  },
});

export const { addrequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
