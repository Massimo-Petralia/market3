import {Appbar, Text, useTheme} from 'react-native-paper';
import {ToggleTheme} from './toggle-theme';

export const MainAppBar = () => {
  const theme = useTheme();
  return (
    <Appbar.Header>
      <Appbar.Content
        color={theme.colors.primary}
        titleStyle={{fontStyle: 'italic', fontWeight: 'bold'}}
        title="Market3"
      />
      <ToggleTheme />
    </Appbar.Header>
  );
};
