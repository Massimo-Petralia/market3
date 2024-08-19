import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './routes';
import { UserProfilePage } from '../features/user/user-profile/user-profile-page';
import { FormUserAddressPage } from '../features/user/form-user-address/form-user-address-page';
import { UserStackParamList } from './navigation-types';
import { MyProductsPage } from '../features/user/my-products/my-products-page';
const UserStack = createNativeStackNavigator<UserStackParamList>()

export const UserNavigator = () => {
    return (
        <UserStack.Navigator initialRouteName={Routes.MainTabs.UserStack.Profile}>
            <UserStack.Screen name={Routes.MainTabs.UserStack.Profile} component={UserProfilePage} options={{headerShown:false}}/>
            <UserStack.Screen name={Routes.MainTabs.UserStack.Address} component={FormUserAddressPage} options={{headerShown: true}}/>
            <UserStack.Screen name={Routes.MainTabs.UserStack.MyProducts} component={MyProductsPage} options={{headerShown: true}}/>
        </UserStack.Navigator>
    )
}