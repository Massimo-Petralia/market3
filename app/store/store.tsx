import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './auth-slice';
import {themeReducer} from './theme-slice';
import {api} from './api-slice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    theme: themeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
