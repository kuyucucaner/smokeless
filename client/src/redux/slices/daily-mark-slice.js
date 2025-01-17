import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addOrUpdateMark = createAsyncThunk(
  "mark/addOrUpdateMark",
  async (date, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/daily-mark/add-or-update-mark",
        date,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMarks = createAsyncThunk(
    "mark/getMarks", 
    async(_, { rejectWithValue}) => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/v1/daily-mark/get-marks",
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dailyMarksSlice = createSlice({
    name : "dailyMarks",
    initialState : { marks : [] , error: null , loading : false},
    reducers  : {},
    extraReducers : (builder) => {
        builder
        .addCase(addOrUpdateMark.pending, (state) => {
            state.loading = true;
        })
        .addCase(addOrUpdateMark.fulfilled, (state, action) => {
            state.loading = false;
            state.marks.push(action.payload);
        })
        .addCase(addOrUpdateMark.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getMarks.pending, (state) => {
            state.loading = true;
        })
        .addCase(getMarks.fulfilled, (state, action) => {
            state.loading = false;
            state.marks = action.payload;
        })
        .addCase(getMarks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});
export default dailyMarksSlice.reducer;