import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DefaultUser} from '../../models/default-values';
import {AuthState} from './models';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    user: DefaultUser,
  },
  reducers: {
    setCredential: (state, action: PayloadAction<AuthState>) => {
      const {accessToken, user} = action.payload;
      return {...state, accessToken, user};
    },
    logOut: state => ({...state, accessToken: '', user: DefaultUser}),
  },
});

export const {setCredential, logOut} = authSlice.actions;
const {reducer} = authSlice;
export const authReducer = reducer;
