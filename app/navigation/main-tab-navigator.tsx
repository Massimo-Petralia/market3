import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeNavigator} from './home-navigator';
import Routes from './routes';
import {TabStackParamList} from './navigation-types';
import {UserNavigator} from './user-navigator';
import {ProductDetailPage} from '../features/product-detail/product-detail-page';
import {CartPage} from '../features/cart/cart-page';

const Tab = createMaterialBottomTabNavigator<TabStackParamList>();

export const MainTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const size = 26;
          let iconName = '';
          let color = '';
          if (route.name === Routes.tab.home.index) {
            iconName = focused ? 'home-circle' : 'home-circle-outline';
            color = focused ? theme.colors.primary : theme.colors.secondary;
          } else if (route.name === Routes.tab.user.index) {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
            color = focused ? theme.colors.primary : theme.colors.secondary;
          } else if (route.name === Routes.tab.sell) {
            iconName = focused ? 'storefront' : 'storefront-outline';
            color = focused ? theme.colors.primary : theme.colors.secondary;
          } else if (route.name === Routes.tab.cart) {
            iconName = focused ? 'cart' : 'cart-outline';
            color = focused ? theme.colors.primary : theme.colors.secondary;
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}>
      <Tab.Screen name={Routes.tab.home.index} component={HomeNavigator} />
      <Tab.Screen name={Routes.tab.user.index} component={UserNavigator} />
      <Tab.Screen name={Routes.tab.sell} component={ProductDetailPage} />
      <Tab.Screen name={Routes.tab.cart} component={CartPage} />
    </Tab.Navigator>
  );
};
