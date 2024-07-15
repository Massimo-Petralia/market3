import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DefaultUser} from '../../../models/default-values';
import { UserAuth } from '../../../models/models';

export const userAuthSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: '',
    user: DefaultUser,
  },
  reducers: {
    setCredential: (state, action: PayloadAction<UserAuth>) => {
      const {accessToken, user} = action.payload;
      return {...state, accessToken, user};
    },
    logOut: state => ({...state, accessToken: '', user: DefaultUser}),
  },
});

export const {setCredential, logOut} = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
