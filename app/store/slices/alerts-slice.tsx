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
      action: PayloadAction<{notification: Notification}>,
    ) => {
      const {notification} = action.payload;
      return {...state, notification};
    },
    toggleModal: (state) => {
      const isVisible = state.isVisible;
      return {...state, isVisible: !isVisible};
    },
  },
});

export const {setNotification, toggleModal} = notificationSlice.actions
export const alertsReducer = notificationSlice.reducer