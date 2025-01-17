import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './redux/slices/auth-slice';
import DailyMarkReducer from './redux/slices/daily-mark-slice';

const store = configureStore({
  reducer: {
    auth : AuthReducer,
    dailyMarks : DailyMarkReducer,
  },
});

export default store;