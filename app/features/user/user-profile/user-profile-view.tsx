import {View} from 'react-native';
import {Text, Button} from 'react-native-paper';

export const UserProfile = ({onLogout}: {onLogout: () => void}) => {
  //userDetail state var
  return (
    <View>
      <Button
        style={{alignSelf: 'center'}}
        mode="contained"
        onPress={() => onLogout()}>
        Logout
      </Button>
    </View>
  );
};
