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
  async (_, { rejectWithValue }) => {
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

export const calculateStats = createAsyncThunk(
  "mark/calculateStats",
  async (cigarettesPerDay, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/v1/daily-mark/calculate-stats",
        { cigarettesPerDay }, // Veriyi obje olarak gönderiyoruz
        { withCredentials: true } // Cookie-based authentication
      );
      return response.data; // API'den dönen veriyi direkt al
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An unexpected error occurred"
      );
    }
  }
);
export const setGoal = createAsyncThunk(
  "mark/setGoal",
   async(targetDays , {rejectWithValue}) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/daily-mark/set-goal",
         targetDays , // Veriyi obje olarak gönderiyoruz
        { withCredentials: true } // Cookie-based authentication
      );
      return response.data; // API'den dönen veriyi direkt al
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An unexpected error occurred"
      );
    }
   }
);

const dailyMarksSlice = createSlice({
  name: "dailyMarks",
  initialState: {
    marks: [],
    targetDays : null, //
    error: null,
    loading: false,
    stats: {
      nonSmokingDays: 0,
      savedMoney: 0,
      healthBenefits: {
        improvedLungCapacity: "",
        reducedHeartAttackRisk: "",
        otherHealthRisks: "",
      },
    },
  },
  reducers: {},
  extraReducers: (builder) => {
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
      })
      .addCase(calculateStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(calculateStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(calculateStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Hata durumunu state'e kaydet
      })
      .addCase(setGoal.pending, (state) => {
        state.loading = true;
      })
      .addCase(setGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.targetDays = action.payload; // Gelen değeri direkt ata
      })
      
      .addCase(setGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Hata durumunu state'e kaydet
      });
  },
});
export default dailyMarksSlice.reducer;
