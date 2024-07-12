import React from 'react';
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
  PaperProvider,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {selectIsDarkTheme} from '../store/selectors/theme-selectors';

export const PaperProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isDarkTheme = useSelector(selectIsDarkTheme);
  const theme = !isDarkTheme ? DefaultTheme : MD3DarkTheme;
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};
