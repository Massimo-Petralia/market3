const Routes = {
  tab: {
    home: {
      index: 'Home',
      products: 'Products',
      productDetail: 'Product detail',
    },
    user: {
      index: 'User',
      signup: 'Signup',
      signin: 'Signin',
      address: 'Address',
    },
    sell: 'Sell',
    cart: 'Cart',
  },
} as const;

export default Routes;
