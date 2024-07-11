import Routes from './routes';
import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  [Routes.root.main]: NavigatorScreenParams<TabStackParamList>;
};

export type TabStackParamList = {
  [Routes.root.tab.home.index]: NavigatorScreenParams<HomeStackParamList>;
  [Routes.root.tab.user.index]: NavigatorScreenParams<UserStackParamList>;
  [Routes.root.tab.sell]: undefined//??
  [Routes.root.tab.cart]: undefined
};

export type HomeStackParamList = {
  [Routes.root.tab.home.products]: undefined;
  [Routes.root.tab.home.productDetail]: {id: number | null};
};

export type UserStackParamList = {
  [Routes.root.tab.user.signup]: undefined;
  [Routes.root.tab.user.signin]: undefined;
  [Routes.root.tab.user.address]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
