import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParamList} from './navigation-types';
import Routes from './routes';
import {ProductsListPage} from '../features/products-list/products-list-page';
import {ProductDetailPage} from '../features/product-detail/product-detail-page';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName={Routes.root.tab.home.products}>
      <HomeStack.Screen
        name={Routes.root.tab.home.products}
        component={ProductsListPage}
      />
      <HomeStack.Screen
        name={Routes.root.tab.home.productDetail}
        component={ProductDetailPage}
      />
    </HomeStack.Navigator>
  );
};
