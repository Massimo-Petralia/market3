import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../../navigation/routes';
import { AuthStackNavigationProp } from '../../../navigation/navigation-types';

export const UserSignin = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  return (
    <View>
      <Text>If you are new</Text>
      <Button
        mode="text"
        onPress={() =>
          navigation.navigate(Routes.Auth.Signup)
        }>
        Go to Signup
      </Button>
      <Button
        onPress={() => navigation.navigate('MainTabs', { screen: Routes.MainTabs.HomeStack.index, params: { screen: Routes.MainTabs.HomeStack.Home } })}
      >
        login success
      </Button>
    </View>
  );
};
