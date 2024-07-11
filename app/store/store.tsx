import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './slices/auth-slice';
import {themeReducer} from './slices/theme-slice';
import {api} from './slices/api-slice';

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
