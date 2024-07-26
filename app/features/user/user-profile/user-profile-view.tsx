import {View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../../navigation/routes';
import {AuthStackNavigationProp} from '../../../navigation/navigation-types';

export const UserProfile = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  return (
    <View>
      <Text>User profile work !</Text>
    </View>
  );
};
