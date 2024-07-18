import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: '',
  },
  reducers: {
    setCredential: (state, action: PayloadAction<{accessToken: string}>) => {
      const {accessToken} = action.payload;
      return {...state, accessToken};
    },
    clearToken: state => ({...state, accessToken: ''}),
  },
});

export const {setCredential, clearToken} = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;
