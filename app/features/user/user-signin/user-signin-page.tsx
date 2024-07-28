import Routes from '../../../navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {UserSignin} from './user-signin-view';
import {userThunks} from '../../../store/slices/user-slice';
import {AppDispatch} from '../../../store/store';
import {useEffect} from 'react';
import {
  selectUserDetail,
  selectAccessToken,
  selectLoadingState,
} from '../../../store/selectors/user-selectors';

export const UserSigninPage = () => {
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const user = useSelector(selectUserDetail);
  const loadingState = useSelector(selectLoadingState);

  const onSignin = ({email, password}: {email: string; password: string}) => {
    dispatch(userThunks.signinUserThunk({email, password}));
  };

  useEffect(() => {
    if (accessToken && user.id) {
      navigation.navigate(Routes.MainTabs.index, {
        screen: Routes.MainTabs.HomeStack.index,
        params: {screen: Routes.MainTabs.HomeStack.Home},
      });
      console.log('user signin name: ', user.name)
    }
  }, [accessToken, user]);

  return (
    <>
      <UserSignin onSignin={onSignin} loadingState={loadingState} />
    </>
  );
};
