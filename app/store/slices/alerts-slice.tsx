import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Notification} from '../../../models/models';

const notification: Notification = {
  type: 'info',
  text: '',
};

export const notificationSlice = createSlice({
  name: 'alerts',
  initialState: {
    isVisible: false,
    notification,
  },
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<Notification>,
    ) => {
      const {type, text} = action.payload;
      return {...state, notification: {type, text}};
    },
    toggleNotification: (state) => {
      const isVisible = state.isVisible;
      return {...state, isVisible: !isVisible};
    },
  },
});

export const {setNotification, toggleNotification} = notificationSlice.actions
export const  alertsReducer = notificationSlice.reducer