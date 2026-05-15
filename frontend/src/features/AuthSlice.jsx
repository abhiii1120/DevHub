import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./actions/authAction";

let authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  },
  reducers: {
    removeUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const pendingReducer = (state) => {
      state.isLoading = true;
      state.error = null;
    };

    const fulfilledReducer = (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    };

    const rejectedReducer = (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.payload;
    };

    builder
      .addCase(loginUser.pending, pendingReducer)
      .addCase(loginUser.fulfilled, fulfilledReducer)
      .addCase(loginUser.rejected, rejectedReducer)

      .addCase(signupUser.pending, pendingReducer)
      .addCase(signupUser.fulfilled, fulfilledReducer)
      .addCase(signupUser.rejected, rejectedReducer);
  },
});

export const { removeUser } = authSlice.actions;

export default authSlice.reducer;
