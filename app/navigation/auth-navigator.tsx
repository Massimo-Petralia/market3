import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Routes from './routes';
import {UserSigninPage} from '../features/user/user-signin/user-signin-page';
import {UserSignupPage} from '../features/user/user-signup/user-signup-page';
import { AuthStackParamList } from './navigation-types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={Routes.Auth.Signin}
        component={UserSigninPage}
      />
      <AuthStack.Screen
        name={Routes.Auth.Signup}
        component={UserSignupPage}
      />
    </AuthStack.Navigator>
  );
};
