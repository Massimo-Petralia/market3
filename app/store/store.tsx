import {configureStore} from '@reduxjs/toolkit';
import {themeReducer} from './slices/theme-slice';
import { modalAlertsReducer} from './slices/alerts-slice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    modalAlerts: modalAlertsReducer,
  
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
