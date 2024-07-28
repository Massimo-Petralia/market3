import {configureStore} from '@reduxjs/toolkit';
import {themeReducer} from './slices/theme-slice';
import { alertsReducer} from './slices/alerts-slice';
import { userReducer } from './slices/user-slice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    alerts: alertsReducer,
    user: userReducer
  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store;
