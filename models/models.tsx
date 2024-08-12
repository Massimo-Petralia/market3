export interface User {
  id?: number;
  favoriteTheme: 'light' | 'dark';
  name: string;
  avatar: {type: string; uri: string};
  email: string;
  password: string;
  cart: Product[];
  address: Address;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export type Product = {
  id?: number;
  name: string;
  description: string;
  price: string;
  currency: Currency;
  images: string[];
  userId?: number;
};
export type Currency = '€' | '$';

export type NotificationType = 'info' | 'warning' ;

export interface Notification {
  type: NotificationType;
  text: string;
}

export interface UserAuth {
  accessToken: string;
  user: User;
}

export type LoadingState = 'idle' | 'loading';

export type ProductList = {[id: number]: Product}
