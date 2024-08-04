import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeNavigator} from './home-navigator';
import Routes from './routes';

import {AuthNavigator} from './auth-navigator';
import {ProductDetailPage} from '../features/product/product-detail/product-detail-page';
import {CartPage} from '../features/cart/cart-page';
import {MainTabsParamList} from './navigation-types';
import {UserProfilePage} from '../features/user/user-profile/user-profile-page';
import {FormProductPage} from '../features/product/form-product/form-product-page';
import {UserNavigator} from './user-navigator';

const Tab = createMaterialBottomTabNavigator<MainTabsParamList>();

export const MainTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const size = 26;
          let iconName = '';
          let color = '';
          if (route.name === Routes.MainTabs.HomeStack.index) {
            iconName = focused ? 'home-circle' : 'home-circle-outline';
            color = focused ? theme.colors.primary : theme.colors.secondary;
          } else if (route.name === Routes.MainTabs.UserStack.index) {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
            color = focused ? theme.colors.primary : theme.colors.secondary;
          } else if (route.name === Routes.MainTabs.Sell) {
            iconName = focused ? 'storefront' : 'storefront-outline';
            color = focused ? theme.colors.primary : theme.colors.secondary;
          } else if (route.name === Routes.MainTabs.Cart) {
            iconName = focused ? 'cart' : 'cart-outline';
            color = focused ? theme.colors.primary : theme.colors.secondary;
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}>
      <Tab.Screen
        name={Routes.MainTabs.HomeStack.index}
        component={HomeNavigator}
      />
      <Tab.Screen
        name={Routes.MainTabs.UserStack.index}
        component={UserNavigator}
      />
      <Tab.Screen name={Routes.MainTabs.Sell} component={FormProductPage} />
      <Tab.Screen name={Routes.MainTabs.Cart} component={CartPage} />
    </Tab.Navigator>
  );
};
