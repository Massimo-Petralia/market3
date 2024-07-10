import {View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

export const TestComp = () => {
  const theme = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}><Text>Hello I m test component !</Text></View>
  );
};
