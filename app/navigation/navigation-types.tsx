import { NavigatorScreenParams, CompositeNavigationProp } from "@react-navigation/native";
import Routes from './routes'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialBottomTabNavigationProp } from "react-native-paper";

export type AuthStackParamList = {
    [Routes.Auth.Signin]: undefined;
    [Routes.Auth.Signup]: undefined
}

export type ProfileStackParamList = {
    [Routes.MainTabs.ProfileStack.User]: undefined;
    [Routes.MainTabs.ProfileStack.Address]: undefined
}

export type MainTabsParamList = {
    [Routes.MainTabs.HomeStack.index]: NavigatorScreenParams<HomeStackParamList>;

    [Routes.MainTabs.ProfileStack.index]: NavigatorScreenParams<ProfileStackParamList>;
    [Routes.MainTabs.Sell]: undefined;
    [Routes.MainTabs.Cart]: undefined;
};
export type HomeStackParamList = {

    [Routes.MainTabs.HomeStack.Home]: undefined;
    [Routes.MainTabs.HomeStack.ProductDetail]: { productId: string }
}

export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    MainTabs: NavigatorScreenParams<MainTabsParamList>;
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

export type AuthStackNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<AuthStackParamList, 'Signin'>,
    NativeStackNavigationProp<RootStackParamList>
>

export type MainTabsNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<MainTabsParamList, 'HomeStack'>,
    MaterialBottomTabNavigationProp<MainTabsParamList>
>

export type HomeStackNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<HomeStackParamList, 'Home'>,
    NativeStackNavigationProp<HomeStackParamList>
>

export type ProfileStackNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<ProfileStackParamList, 'User'>,
NativeStackNavigationProp<ProfileStackParamList>
>

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;