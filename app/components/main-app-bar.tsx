import {Appbar, Text} from 'react-native-paper';
import {ToggleTheme} from './toggle-theme';
import {apiServices} from '../store/slices/api-services-slice';
import {useSelector} from 'react-redux';

export const MainAppBar = () => {
  return (
    <Appbar.Header>
      <Appbar.Content title="Market3" />
      <ToggleTheme />
    </Appbar.Header>
  );
};
