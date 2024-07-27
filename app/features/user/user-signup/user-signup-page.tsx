import {UserSignup} from './user-signup-view';
import {User} from '../../../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import {createUserThunk} from '../../../store/slices/user-slice';
import {AppDispatch} from '../../../store/store';
import {
  selectIsVisible,
  selectNotification,
} from '../../../store/selectors/alerts-selectors';
import { selectLoadingState } from '../../../store/selectors/user-selectors';

export const UserSignupPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const loadingState = useSelector(selectLoadingState)
  const isVisible = useSelector(selectIsVisible);
  const notification = useSelector(selectNotification);

  const onSignup = (user: User) => {
    dispatch(createUserThunk(user));
  };
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
