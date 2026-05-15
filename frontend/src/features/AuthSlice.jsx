import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./actions/authAction";

let authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
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
    builder

      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { removeUser } = authSlice.actions;

export default authSlice.reducer;