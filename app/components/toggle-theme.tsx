import {View} from 'react-native';
import {ToggleButton, useTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {setIsDarkTheme} from '../store/slices/theme-slice';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import tinycolor2 from 'tinycolor2';

export const ToggleTheme = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const bottomNavColor: string = tinycolor2(
    theme.colors.onBackground,
  ).toHexString();
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        alignItems: 'flex-end',
      }}>
      <ToggleButton
        style={{borderRadius: 50}}
        icon="theme-light-dark"
        onPress={() => {
          dispatch(setIsDarkTheme());
          changeNavigationBarColor(bottomNavColor, undefined, false);
        }}
        size={20}
      />
    </View>
  );
};
