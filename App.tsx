import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import store from './app/store/store';
import {PaperProviderWrapper} from './app/components/paper-provider-wrapper';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {adaptNavigationTheme} from 'react-native-paper';
import {selectIsDarkTheme} from './app/store/selectors/theme-selectors';
import {ModalNotification} from './app/components/modal-notification';
import {MainTabNavigator} from './app/navigation/main-tab-navigator';
import {MainAppBar} from './app/components/main-app-bar';
import { RootNavigator } from './app/navigation/root-navigator';
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
      <MainAppBar />
      <NavigationContainer theme={!isDarkTheme ? LightTheme : DarkTheme}>
        <RootNavigator/>
      </NavigationContainer>
      <ModalNotification />
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
