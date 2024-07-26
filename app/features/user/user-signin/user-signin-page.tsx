import Routes from '../../../navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {UserSignin} from './user-signin-view';

export const UserSigninPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSignin= ({email, password}:{email:string, password: string})=> {
    dispatch
  }

  return (
    <>
      <UserSignin onSignin={onSignin} />
    </>
  );
};
