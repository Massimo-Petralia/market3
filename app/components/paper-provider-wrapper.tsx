import React from 'react';
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
  PaperProvider,
} from 'react-native-paper';
import {RootState} from '../store/store';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const PaperProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  const theme = !isDarkTheme ? DefaultTheme : MD3DarkTheme;
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};
