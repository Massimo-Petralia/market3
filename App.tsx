import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import store from './app/store/store';
import {ToggleTheme} from './app/components/toggle-theme';
import {PaperProviderWrapper} from './app/components/paper-provider-wrapper';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {RootNavigator} from './app/navigation/root-navigator';
import {adaptNavigationTheme} from 'react-native-paper';
import {selectIsDarkTheme} from './app/store/selectors/theme-selectors';
const {LightTheme} = adaptNavigationTheme({reactNavigationLight: DefaultTheme});
const {DarkTheme} = adaptNavigationTheme({reactNavigationDark: DefaultTheme});

function AppContent(): React.JSX.Element {
  const isDarkTheme = useSelector(selectIsDarkTheme);
  return (
    <PaperProviderWrapper>
      <StatusBar
        backgroundColor={
          !isDarkTheme
            ? LightTheme.colors.background
            : DarkTheme.colors.background
        }
        barStyle={!isDarkTheme ? 'dark-content' : 'light-content'}
      />
      <NavigationContainer theme={!isDarkTheme ? LightTheme : DarkTheme}>
        <RootNavigator />
      </NavigationContainer>
      <ToggleTheme />
    </PaperProviderWrapper>
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
