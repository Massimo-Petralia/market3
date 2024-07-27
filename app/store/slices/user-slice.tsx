import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DefaultUser} from '../../../models/default-values';
import {LoadingState, Notification, User} from '../../../models/models';
import {Dispatch} from '@reduxjs/toolkit';
import {UserService} from '../../services/user-service';
import {setNotification, toggleNotification} from './alerts-slice';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loadingState: 'idle' as LoadingState,
    accessToken: '',
    user: DefaultUser,
    isCreated: false,
  },
  reducers: {
    createUser: state => {
      console.log('[User Component]: user/createUser');
      if (state.loadingState === 'idle') {
        return {...state, loadingState: 'loading', isCreated: false};
      }
    },
    stopLoading: state => {
      if (state.loadingState === 'loading') {
        return {...state, loadingState: 'idle'};
      }
    },
    createUserSuccess: state => {
      if (state.isCreated === false) {
        return {
          ...state,
          isCreated: true,
        };
      }
    },
    creteUserFailed: (state, action: PayloadAction<string>) => {
      console.error('create user failed: ', action.payload);
    },
  },
});

export const {createUser, stopLoading, createUserSuccess, creteUserFailed} =
  userSlice.actions;
export const userReducer = userSlice.reducer;

export const createUserThunk = (user: User) => async (dispatch: Dispatch) => {
  const userService = new UserService();
  dispatch(createUser());
  userService
    .createUser(user)
    .then(async response => {
      const data = await response.json();
      if (typeof data === 'string') {
        console.log('server error message: ', data);
        const notification: Notification = {
          type: 'warning',
          text: data,
          compType: 'snackbar',
        };
        dispatch(setNotification(notification));
        dispatch(toggleNotification());
      } else {
        dispatch(stopLoading());
        const notification: Notification = {
          type: 'info',
          text: 'Registration was successful, you can signin !',
          compType: 'snackbar',
        };
        dispatch(createUserSuccess());
        dispatch(setNotification(notification));
        dispatch(toggleNotification());
      }
      console.log('response: ', data);
    })
    .catch((error: Error) => {
      dispatch(creteUserFailed(error.message));
    });
};
