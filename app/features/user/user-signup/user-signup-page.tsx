import {UserSignup} from './user-signup-view';
import {User} from '../../../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import {createUserThunk} from '../../../store/slices/user-slice';
import {AppDispatch} from '../../../store/store';
import {
  selectIsVisible,
  selectNotification
} from '../../../store/selectors/alerts-selectors';
import { selectLoadingState, selectIsCreated } from '../../../store/selectors/user-selectors';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthStackNavigationProp } from '../../../navigation/navigation-types';
import Routes from '../../../navigation/routes';
export const UserSignupPage = () => {
  const navigation = useNavigation<AuthStackNavigationProp>()
  const dispatch: AppDispatch = useDispatch();
  const loadingState = useSelector(selectLoadingState)
  const isCreated = useSelector(selectIsCreated)
  const isVisible = useSelector(selectIsVisible);
  const notification = useSelector(selectNotification);

  const onSignup = (user: User) => {
    dispatch(createUserThunk(user));
  };

useEffect(()=> {
  if(isCreated){
    navigation.navigate(Routes.Auth.Signin)
  }
}, [isCreated])

  return (
    <>
      <UserSignup
        onSignup={onSignup}
        loadingState={loadingState}
        isVisible={isVisible}
        notification={notification}
      />
    </>
  );
};
