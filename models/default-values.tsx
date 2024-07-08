import {Address, Product, User} from './models';

export const DefaultAddress: Address = {
  address: '',
  city: '',
  state: '',
  country: '',
  zipcode: '',
};

export const DefaultUser: User = {
  id: undefined,
  //accessTokken: '',
  name: '',
  favoriteTheme: 'light',
  avatar: {type: '', uri: ''},
  email: '',
  password: '',
  cart: [],
  address: DefaultAddress,
};

export const DefaultProduct: Product = {
  id: undefined,
  name: '',
  description: '',
  price: '',
  currency: '€',
  images: [],
};
