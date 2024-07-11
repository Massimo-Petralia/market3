import store from '../store/store';
import {View} from 'react-native';
import {ToggleButton, useTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {setIsDarkTheme} from '../store/slices/theme-slice';

export const ToggleTheme = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
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
          // setBottomNavColor(color);
        }}
        size={20}
      />
    </View>
  );
};
