import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DefaultUser} from '../../../models/default-values';
import {
  LoadingState,
  Notification,
  Product,
  ProductList,
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
    patchSuccess : false
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
    logoutUser: state => {
      return {...state, accessToken: '', user: DefaultUser};
    },

    patchUserProperty: (state, action) => {
      console.log('Action', action.type);
      if (state.loadingState === 'idle') {
        return {...state, loadingState: 'loading', patchSuccess: false};
      }
    },
    patchUserPropertySuccess: (
      state,
      action: PayloadAction<{key: keyof User; property: Partial<User>}>,
    ) => {
      const {key, property} = action.payload;
      return {...state, user: {...state.user, [key]: property}, patchSuccess: true};
    },
    patchUserPropertyFailed: (state, action: PayloadAction<string>) => {
      if (state.loadingState === 'loading') {
        return {...state, loadingState: 'idle', patchSuccess: false};
      }
    },
    resetPatchSuccess : (state)=> {
      return {...state, patchSuccess: false}
    },
    updateCart : (state, action)=>{
      console.log('Action: ', action.type)
      if(state.loadingState === 'idle'){
        return {...state, loadingState: 'loading'}
      }
    },
    updateCartSuccess : (state, action: PayloadAction<Product[]>)=>{
      const newCart:{[id: number]: Product} = action.payload.reduce((collection: {[id: number]: Product}, product) => {
        collection[product.id!] = product;
        return collection;
      },{})
      return {...state, user:  {...state.user, cart: newCart}, loadingState:'idle'}
    },
    updateCartFailed : (state, action: PayloadAction<string>)=>{
      if (state.loadingState === 'loading') {
        return {...state, loadingState: 'idle', patchSuccess: false};
      }
    }
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
  logoutUser,
  patchUserProperty,
  patchUserPropertySuccess,
  patchUserPropertyFailed,
  resetPatchSuccess,
  updateCart,
  updateCartSuccess,
  updateCartFailed
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
          };
          dispatch(creteUserFailed(notification.text));
          dispatch(setNotification(notification));
          dispatch(toggleNotification());
        } else {
          const notification: Notification = {
            type: 'info',
            text: 'Registration was successful, you can signin !',
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
            };
            dispatch(creteUserFailed(notification.text));
            dispatch(setNotification(notification));
            dispatch(toggleNotification());
          } else {
            const userData: UserAuth = data;
            const notification: Notification = {
              type: 'info',
              text: 'You are signed in !',
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
  patchUserPropertyThunk =
    (id: number, key: keyof User, property: Partial<User>) =>
     
    async (dispatch: Dispatch) => {
      dispatch(patchUserProperty(null));
      userService
        .updateUserProperty(id, key, property)
        .then(async response => {
          const notification: Notification = {
            type: 'info',
            text: `${key} updated !`,
          };
          dispatch(patchUserPropertySuccess({key, property}));
          dispatch(setNotification(notification));
          dispatch(toggleNotification());
        })
        .catch((error: Error) =>
          dispatch(patchUserPropertyFailed(error.message)),
        );
    };

    updateCartThunk = (id: number, cart: Product[])=>async (dispatch: Dispatch) =>{
      dispatch(updateCart(null)),
      userService.updateCart(id, cart).then(async response =>{
        const data = await response.json()
        const notification: Notification = {
          type: 'info',
          text: 'cart updated !',
        };
        dispatch(updateCartSuccess(data.cart as Product[]))
        dispatch(setNotification(notification))
        dispatch(toggleNotification())

      }).catch((error: Error)=> dispatch(updateCartFailed(error.message)))
    }
}

export const userThunks = new UserThunks();
