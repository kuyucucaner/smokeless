import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const addFriendship = createAsyncThunk(
    "friendship/addFriendship" , 
    async(friend_id , {rejectWithValue} ) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/friendship/add-friendship" ,
                {friend_id} ,
                {withCredentials: true}
            );
            return response.data;
        }
        catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
);

export const getUserFriendships = createAsyncThunk(
    "friendship/getUserFriendships" ,
    async(_ , {rejectWithValue} ) => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/friendship/get-friendship" , 
                {withCredentials: true}
            );
            return response.data;
        }
        catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
);

const friendshipSlice = createSlice({
    name: "friendship",
    initialState:{
        loading: false,
        error: null,
        friendships: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addFriendship.pending, (state) => {
            state.loading = true;
        })
        .addCase(addFriendship.fulfilled, (state, action) => {
            state.loading = false;
            state.friendships.push(action.payload);
        })
        .addCase(addFriendship.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getUserFriendships.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUserFriendships.fulfilled, (state, action) => {
            state.loading = false;
            console.log('Received friendships:', action.payload); // Ensure payload is correct
            state.friendships = action.payload.friendships ; // Update the state with the fetched data
        })
        
        .addCase(getUserFriendships.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default friendshipSlice.reducer;