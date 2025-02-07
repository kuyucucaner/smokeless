import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './redux/slices/auth-slice';
import DailyMarkReducer from './redux/slices/daily-mark-slice';
import SuccessReducer from './redux/slices/success-slice';
import StoryReducer from './redux/slices/story-slice';

const store = configureStore({
  reducer: {
    auth : AuthReducer,
    dailyMarks : DailyMarkReducer,
    success: SuccessReducer,
    story : StoryReducer
  },
});

export default store;