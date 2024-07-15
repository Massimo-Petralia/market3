import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const selectUserAuth = (state: RootState) => state.userAuth;

export const selectUser = createSelector(
  [selectUserAuth],
  userAuth => userAuth.user,
);

export const selectAccessToken = createSelector(
  [selectUserAuth],
  userAuth => userAuth.accessToken,
);
