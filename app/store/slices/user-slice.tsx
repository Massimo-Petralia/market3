import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DefaultUser} from '../../../models/default-values';
import {LoadingState, User, UserAuth} from '../../../models/models';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loadingState: 'idle',
    accessToken: '',
    user: DefaultUser,
  },
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      console.log('[User Component]: ', action.type);
      if (state.loadingState === 'idle') {
        return {...state, loadingState: 'loading'};
      }
    },
    createUserSuccess: (state, action: PayloadAction<UserAuth>) => {
      if (state.loadingState === 'loading') {
        return {
          ...state,
          loadingState: 'idle',
          accessToken: action.payload.accessToken,
          user: action.payload.user,
        };
      }
    },
    creteUserFailed: (state, action: PayloadAction<any>) => {
      console.log('create user failed: ', action.payload);
    },
  },
});
