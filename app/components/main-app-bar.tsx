import {Appbar} from 'react-native-paper';
import {ToggleTheme} from './toggle-theme';

export const MainAppBar = () => {
  return (
    <Appbar.Header>
      <Appbar.Content title="Market3" />
      <ToggleTheme />
    </Appbar.Header>
  );
};
