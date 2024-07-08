import {View} from 'react-native';
import {useTheme} from 'react-native-paper';

export const TestComp = () => {
  const theme = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}></View>
  );
};
