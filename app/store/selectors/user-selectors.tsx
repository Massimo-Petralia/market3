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

export const selectIsCreated = createSelector(
    [selectUser],
    (user) => user.isCreated
)

export const selectPatchSuccess = createSelector(
    [selectUser],
    (user)=> user.patchSuccess
)

export const selectAccessToken = createSelector(
    [selectUser],
    ({accessToken})=> accessToken
)

export const selectUserId = createSelector(
    [selectUser],
    ({user})=> user.id
)
export const selectCart = createSelector(
    [selectUser],
    ({user})=> user.cart
)