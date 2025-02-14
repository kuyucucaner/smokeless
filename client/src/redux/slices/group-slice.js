import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createGroup = createAsyncThunk(
  "group/createGroup",
  async (group_name, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/group/cresate-group",
        { group_name },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const joinGroup = createAsyncThunk(
  "group/joinGroup",
  async (group_id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/group/join-group",
        { group_id },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const groupSlice = createSlice({
  name: "group",
  initialState: {
    groups: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(createGroup.rejected , (state,action) => {
        state.loading = false;
        state.error = action.payload;
      }) 
      .addCase(joinGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(joinGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(joinGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default groupSlice.reducer;