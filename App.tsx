import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from './app/store/store';
import {ToggleTheme} from './app/components/toggle-theme';
import {PaperProviderWrapper} from './app/components/paper-provider-wrapper';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <PaperProviderWrapper>
          <ToggleTheme />
        </PaperProviderWrapper>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
