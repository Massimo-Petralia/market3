import {View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../../navigation/routes';

export const UserSignin = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>If you are new</Text>
      <Button
        mode="text"
        onPress={() =>
          navigation.navigate(Routes.tab.user.index, {
            screen: Routes.tab.user.signup,
          })
        }>
        Go to Signup
      </Button>
    </View>
  );
};
