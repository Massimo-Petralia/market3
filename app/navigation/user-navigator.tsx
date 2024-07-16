import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserStackParamList} from './navigation-types';
import Routes from './routes';
import {UserSigninPage} from '../features/user/user-signin/user-signin-page';
import {UserSignupPage} from '../features/user/user-signup/user-signup-page';

const UserStack = createNativeStackNavigator<UserStackParamList>();

export const UserNavigator = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name={Routes.tab.user.signin}
        component={UserSigninPage}
      />
      <UserStack.Screen
        name={Routes.tab.user.signup}
        component={UserSignupPage}
      />
    </UserStack.Navigator>
  );
};
