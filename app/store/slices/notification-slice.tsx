import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Notification} from '../../../models/models';

const notification: Notification = {
  type: 'info',
  text: '',
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    isVisible: false,
    notification,
  },
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<{notification: Notification}>,
    ) => {
      const {notification} = action.payload;
      return {...state, notification};
    },
    toggleModal: (state, action: PayloadAction<{isVisible: boolean}>) => {
      const {isVisible} = action.payload;
      return {...state, isVisible: !isVisible};
    },
  },
});

export const {setNotification, toggleModal} = notificationSlice.actions
export const notificationReducer = notificationSlice.reducer