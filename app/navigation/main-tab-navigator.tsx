import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {useTheme, Badge} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeNavigator} from './home-navigator';
import Routes from './routes';
import {StyleSheet} from 'react-native';

import {CartPage} from '../features/cart/cart-page';
import {MainTabsParamList} from './navigation-types';
import {FormProductPage} from '../features/product/form-product/form-product-page';
import {UserNavigator} from './user-navigator';
import {useEffect, useState} from 'react';
import {selectCart} from '../store/selectors/user-selectors';
import {useSelector} from 'react-redux';
import {View} from 'react-native';

const Tab = createMaterialBottomTabNavigator<MainTabsParamList>();

export const MainTabNavigator = () => {
  const theme = useTheme();
  const cart = useSelector(selectCart);
  const [badge, setBadge] = useState<{
    cartItems: number | undefined;
    isVisible: boolean;
  }>({cartItems: undefined, isVisible: false});
  useEffect(() => {
    if (cart) {
      const cartLength = Object.values(cart).length;
      if (cartLength !== 0) {
        setBadge({cartItems: cartLength, isVisible: true});
      } else setBadge({cartItems: undefined, isVisible: false});
    }
  }, [cart]);

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
            <View style={style.iconContainer}>
              {route.name === 'Cart' ? (
                <Badge visible={badge.isVisible} size={15} style={style.badge}>
                  {badge.cartItems}
                </Badge>
              ) : null}
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            </View>
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="User" component={UserNavigator} />
      <Tab.Screen name="Sell" component={FormProductPage} />
      <Tab.Screen name="Cart" component={CartPage} />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    zIndex: 1,
    right: -5,
    top: -3,
  },
});
