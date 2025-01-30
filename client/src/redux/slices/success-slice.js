import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const checkAchievements = createAsyncThunk(
  "success/checkAchievements",
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/achievement/check",
        user_id,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getMotivationMessage = createAsyncThunk(
  "succes/getMotivationMessage",
  async (day, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/achievement/motivation/${day}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const successSlice = createSlice({
  name: "success",
  initialState: {
    achievements: [],
    motivationMessage: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAchievements.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAchievements.fulfilled, (state, action) => {
        state.loading = false;
        state.achievements = action.payload;
        state.error = null;
      })
      .addCase(checkAchievements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMotivationMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMotivationMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.motivationMessage = action.payload;
        state.error = null;
      })
      .addCase(getMotivationMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default successSlice.reducer;