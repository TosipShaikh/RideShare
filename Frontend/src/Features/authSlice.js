import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userType: null,
  userId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { role, userId } = action.payload;
      console.log("Role in authSlice: ",role);
      console.log("UserId in authSlice: ",userId);
      state.userType = role;
      state.userId = userId;
    },
    clearUserDetails: (state, action) => {
      state.userType = null;
      state.userId = null;
    },
  },
});

export const { setUserDetails, clearUserDetails } = authSlice.actions;

export default authSlice.reducer;
