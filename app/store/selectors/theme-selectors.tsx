import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const selectTheme = (state: RootState) => state.theme;

export const selectIsDarkTheme = createSelector(
  [selectTheme],
  theme => theme.isDarkTheme,
);
