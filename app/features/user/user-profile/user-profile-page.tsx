import {UserProfile} from './user-profile-view';
import {useSelector, UseSelector} from 'react-redux';
import {UserAuth} from '../../../../models/models';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../../store/slices/user-slice';
import {
  selectUserDetail,
  selectAccessToken,
} from '../../../store/selectors/user-selectors';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavigationProp} from '../../../navigation/navigation-types';
import Routes from '../../../navigation/routes';

export const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<AuthStackNavigationProp>();
  const accessToken = useSelector(selectAccessToken);
  const userDetail = useSelector(selectUserDetail);

  const onLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (!accessToken && !userDetail.id) {
      navigation.navigate(Routes.Auth.Signin);
    }
  }, [accessToken, userDetail]);

  return (
    <>
      <UserProfile onLogout={onLogout} userDetail={userDetail} />
    </>
  );
};
