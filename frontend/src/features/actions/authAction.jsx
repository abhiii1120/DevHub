import { createAsyncThunk } from "@reduxjs/toolkit";

export let loginUser = createAsyncThunk(
  "auth/login",
  async (Credential, thunkAPI) => {
    try {
      let res = await axios.post(
        "https://dummyjson.com/auth/login",
        Credential,
      );
      localStorage.setItem("accessToken", res.data.accessToken);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "signup failed",
      );
    }
  },
);

export let signupUser = createAsyncThunk(
  "auth/signup",
  async (Credential, thunkAPI) => {
    try {
      const res = await axios.post("https:dummyjson.com/users/add", Credential);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "signup failed",
      );
    }
  },
);
