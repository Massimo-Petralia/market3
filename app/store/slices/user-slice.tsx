import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DefaultUser} from '../../../models/default-values';
import {
  LoadingState,
  Notification,
  User,
  UserAuth,
} from '../../../models/models';
import {Dispatch} from '@reduxjs/toolkit';
import {userService} from '../../services/user-service';
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
    createUser: (state, action) => {
      console.log('Action: ', action.type);
      if (state.loadingState === 'idle') {
        return {...state, loadingState: 'loading', isCreated: false};
      }
    },
    createUserSuccess: state => {
      if (state.isCreated === false) {
        return {
          ...state,
          loadingState: 'idle',
          isCreated: true,
        };
      }
    },
    creteUserFailed: (state, action: PayloadAction<string>) => {
      if (state.loadingState === 'loading') {
        return {...state, loadingState: 'idle'};
      }
    },
    resetIsCreated: state => {
      if (state.isCreated === true) {
        return {...state, isCreated: false};
      }
    },
    signinUser: (state, action) => {
      console.log('Action: ', action.type);
      if (state.loadingState === 'idle') {
        return {...state, loadingState: 'loading'};
      }
    },
    signinUserSuccess: (
      state,
      action: PayloadAction<{accessToken: string; user: User}>,
    ) => {
      if (state.loadingState === 'loading') {
        const {accessToken, user} = action.payload;
        return {...state, accessToken, user, loadingState: 'idle'};
      }
    },
    signinUserFailed: (state, action: PayloadAction<string>) => {
      if (state.loadingState === 'loading') {
        return {...state, loadingState: 'idle'};
      }
    },
  },
});

export const {
  createUser,
  createUserSuccess,
  creteUserFailed,
  resetIsCreated,
  signinUser,
  signinUserSuccess,
  signinUserFailed,
} = userSlice.actions;
export const userReducer = userSlice.reducer;

class UserThunks {
  createUserThunk = (user: User) => async (dispatch: Dispatch) => {
    dispatch(createUser(null));
    userService
      .createUser(user)
      .then(async response => {
        const data = await response.json();
        if (typeof data === 'string') {
          const notification: Notification = {
            type: 'warning',
            text: data,
            compType: 'snackbar',
          };
          dispatch(creteUserFailed(notification.text));
          dispatch(setNotification(notification));
          dispatch(toggleNotification());
        } else {
          const notification: Notification = {
            type: 'info',
            text: 'Registration was successful, you can signin !',
            compType: 'snackbar',
          };
          dispatch(createUserSuccess());
          dispatch(setNotification(notification));
          dispatch(toggleNotification());
        }
      })
      .catch((error: Error) => {
        dispatch(creteUserFailed(error.message));
      });
  };
  signinUserThunk =
    ({email, password}: {email: string; password: string}) =>
    async (dispatch: Dispatch) => {
      dispatch(signinUser(null));
      userService
        .signinUser({email, password})
        .then(async response => {
          const data = await response.json();
          if (typeof data === 'string') {
            const notification: Notification = {
              type: 'warning',
              text: data,
              compType: 'snackbar',
            };
            dispatch(creteUserFailed(notification.text));
            dispatch(setNotification(notification));
            dispatch(toggleNotification());
          } else {
            const userData: UserAuth = data;
            const notification: Notification = {
              type: 'info',
              text: 'You are signed in !',
              compType: 'snackbar',
            };
            dispatch(
              signinUserSuccess({
                accessToken: userData.accessToken,
                user: userData.user,
              }),
            );
            dispatch(setNotification(notification));
            dispatch(toggleNotification());
          }
        })
        .catch((error: Error) => dispatch(signinUserFailed(error.message)));
    };
}

export const userThunks = new UserThunks();
