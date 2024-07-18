import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const selectUserAuth = (state: RootState) => state.auth;

export const selectAccessToken = createSelector(
  [selectUserAuth],
  auth => auth.accessToken,
);
