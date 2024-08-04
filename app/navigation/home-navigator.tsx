import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParamList} from './navigation-types';
import Routes from './routes';
import {ProductsListPage} from '../features/products-list/products-list-page';
import {ProductDetailPage} from '../features/product/product-detail/product-detail-page';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName={Routes.MainTabs.HomeStack.Home}
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen
        name={Routes.MainTabs.HomeStack.Home}
        component={ProductsListPage}
      />
      <HomeStack.Screen
        name={Routes.MainTabs.HomeStack.ProductDetail}
        component={ProductDetailPage}
      />
    </HomeStack.Navigator>
  );
};
