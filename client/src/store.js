import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './redux/slices/auth-slice';
import DailyMarkReducer from './redux/slices/daily-mark-slice';
import SuccessReducer from './redux/slices/success-slice';

const store = configureStore({
  reducer: {
    auth : AuthReducer,
    dailyMarks : DailyMarkReducer,
    success: SuccessReducer
  },
});

export default store;