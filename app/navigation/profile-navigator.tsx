import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './routes';
import { UserProfilePage } from '../features/user/user-profile/user-profile-page';
import { FormUserAddressPage } from '../features/user/form-user-address/form-user-address-page';
import { ProfileStackParamList } from './navigation-types';
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>()

export const ProfileNavigator = () => {
    return (
        <ProfileStack.Navigator initialRouteName={Routes.MainTabs.ProfileStack.User}>
            <ProfileStack.Screen name={Routes.MainTabs.ProfileStack.User} component={UserProfilePage} />
            <ProfileStack.Screen name={Routes.MainTabs.ProfileStack.Address} component={FormUserAddressPage} />
        </ProfileStack.Navigator>
    )
}