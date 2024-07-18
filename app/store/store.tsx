import {configureStore} from '@reduxjs/toolkit';
import {AuthReducer} from './slices/auth-slice';
import {themeReducer} from './slices/theme-slice';
import {apiServices} from './slices/api-services-slice';
import {alertsReducer} from './slices/alerts-slice';

const store = configureStore({
  reducer: {
    [apiServices.reducerPath]: apiServices.reducer,
    auth: AuthReducer,
    theme: themeReducer,
    alerts: alertsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiServices.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
