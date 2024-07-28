import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const selectAlerts = (state: RootState) => state.alerts;

export const selectNotification = createSelector(
  [selectAlerts],
  alerts => alerts.notification,
);

export const selectIsVisible = createSelector(
  [selectAlerts],
  alerts => alerts.isVisible,
);

export const selectCompType = createSelector(
  [selectAlerts],
  alerts => alerts.notification.compType
)
