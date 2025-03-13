import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: JSON.parse(localStorage.getItem("user")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      state.userData = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser(state) {
      state.userData = null;
      localStorage.removeItem("user");
    },
  },
});

export const { updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
