import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const selectUser = (state: RootState) => state.user

export const selectUserDetail = createSelector(
    [selectUser],
    ({user})=> user
)

export const selectLoadingState = createSelector(
    [selectUser],
    (user) => user.loadingState
)
