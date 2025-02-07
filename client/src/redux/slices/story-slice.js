import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getStories = createAsyncThunk(
  "story/getStories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/story/get-stories",
        {
          withCredentials: true, // enable cookies for authenticated requests
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addStory = createAsyncThunk(
  "story/addStory",
  async (storyText, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/story/add-story",
        { story_text : storyText },
        { withCredentials: true }
      );
    return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const storySlice = createSlice({
    name: "story",
    initialState:{
        stories: [],
        loading: false,
        error: null,
    },
    reducers: {} , 
    extraReducers: (builder) => {
        builder
        .addCase(getStories.pending , (state) => {
            state.loading = true;
        })
        .addCase(getStories.fulfilled, (state, action) => {
          state.loading = false;
          state.stories = action.payload.stories; // Extract the stories array
        })
        .addCase(getStories.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addStory.pending ,(state) => {
            state.loading = true;
        })
        .addCase(addStory.fulfilled ,(state , action) => {
            state.loading = false;
            state.addedStory = action.payload;
        })
        .addCase(addStory.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }

})

export default storySlice.reducer;