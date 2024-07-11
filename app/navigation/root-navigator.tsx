import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './navigation-types';
import Routes from './routes';
import {MainTabNavigator} from './main-tab-navigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName={Routes.root.main}>
      <RootStack.Screen
        name={Routes.root.main}
        component={MainTabNavigator}
        options={{}}
      />
    </RootStack.Navigator>
  );
};
