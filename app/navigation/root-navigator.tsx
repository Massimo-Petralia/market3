import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation-types';
import { AuthNavigator } from './auth-navigator';
import { MainTabNavigator } from './main-tab-navigator';

const RootStack = createNativeStackNavigator<RootStackParamList>()

export const RootNavigator = () => {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name='Auth' component={AuthNavigator} />
            <RootStack.Screen name='MainTabs' component={MainTabNavigator} />
        </RootStack.Navigator>
    )
}
