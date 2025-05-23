import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './redux/slices/auth-slice';
import DailyMarkReducer from './redux/slices/daily-mark-slice';
import SuccessReducer from './redux/slices/success-slice';
import StoryReducer from './redux/slices/story-slice';
import FriendshipReducer from './redux/slices/friendship-slice';
import GroupReducer from './redux/slices/group-slice';

const store = configureStore({
  reducer: {
    auth : AuthReducer,
    dailyMarks : DailyMarkReducer,
    success: SuccessReducer,
    story : StoryReducer,
    friendship : FriendshipReducer,
    group : GroupReducer
  },
});

export default store;