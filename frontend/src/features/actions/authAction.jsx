import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/lib/axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await API.post("/auth/login", credentials);

      localStorage.setItem("token", res.data.data.token);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (credentials, thunkAPI) => {
    try {
      const res = await API.post("/auth/register", credentials);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Signup failed"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",

  async (email, thunkAPI) => {
    try {
      const res = await API.post("/auth/forgot-password", {
        email,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to send OTP",
      );
    }
  },
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",

  async ({ email, otp }, thunkAPI) => {
    try {
      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "OTP verification failed",
      );
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",

  async ({ email, otp, newPassword }, thunkAPI) => {
    try {
      const res = await API.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Password reset failed",
      );
    }
  },
);