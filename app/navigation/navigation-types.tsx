import Routes from './routes';
import {NavigatorScreenParams} from '@react-navigation/native';

export type TabStackParamList = {
  [Routes.tab.home.index]: NavigatorScreenParams<HomeStackParamList>;
  [Routes.tab.user.index]: NavigatorScreenParams<UserStackParamList>;
  [Routes.tab.sell]: undefined; //??
  [Routes.tab.cart]: undefined;
};

export type HomeStackParamList = {
  [Routes.tab.home.products]: undefined;
  [Routes.tab.home.productDetail]: {id: number | null};
};

export type UserStackParamList = {
  [Routes.tab.user.signup]: undefined;
  [Routes.tab.user.signin]: undefined;
  [Routes.tab.user.address]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TabStackParamList {}
  }
}
