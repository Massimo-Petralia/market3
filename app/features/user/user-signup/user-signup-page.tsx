import {UserSignup} from './user-signup-view';
import {useSignupMutation} from '../../../store/slices/api-services-slice';
import {User} from '../../../../models/models';

export const UserSignupPage = () => {
  const [signup, {isLoading, isSuccess, error}] = useSignupMutation();

  const onSignup = (user: User) => {
    signup(user);
  };
  return (
    <>
      <UserSignup
        onSignup={onSignup}
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error}
      />
    </>
  );
};
