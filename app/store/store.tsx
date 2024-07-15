import {configureStore} from '@reduxjs/toolkit';
import {userAuthReducer} from './slices/user-auth-slice';
import {themeReducer} from './slices/theme-slice';
import {apiServices} from './slices/api-services-slice';
import {alertsReducer} from './slices/alerts-slice';

const store = configureStore({
  reducer: {
    [apiServices.reducerPath]: apiServices.reducer,
    userAuth: userAuthReducer,
    theme: themeReducer,
    alerts: alertsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiServices.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
