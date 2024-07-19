import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const selectRequestIdList = (state: RootState) => state.requestIdList;

export const selectSigninRequestId = createSelector(
  [selectRequestIdList],
  requestIdList => requestIdList.signinRequestId,
);
