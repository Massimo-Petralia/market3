import {Button} from 'react-native-paper';
import {DefaultUser} from '../../../../models/default-values';
import {useSigninMutation} from '../../../store/slices/api-services-slice';
import {UserSignin} from './user-signin-view';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../../navigation/routes';
import {useEffect} from 'react';
import { setCredential } from '../../../store/slices/auth-slice';

export const UserSigninPage = () => {
  const navigation = useNavigation();
  const [signin, {data, isLoading, isSuccess, error}] =
    useSigninMutation();
  const onSignin = ({email, password}: {email: string; password: string}) => {
    signin({email, password});
  };
  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('MainTabs', {
        screen: Routes.MainTabs.HomeStack.index,
        params: {screen: Routes.MainTabs.HomeStack.Home},
      });
    }
  }, [isSuccess, navigation]);

  return (
    <>
      {/* <Button onPress={() => console.log('data: ', data)}>read data</Button> */}
      <UserSignin onSignin={onSignin} isLoading={isLoading} />
    </>
  );
};
