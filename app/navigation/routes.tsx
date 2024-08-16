export const Routes = {
  Auth: {
    Signin: 'Signin',
    Signup: 'Signup'
  },
  MainTabs: {
    index: 'MainTabs',
    HomeStack: {
      index: 'Home',
      Home: 'home',
      ProductDetail: 'Product detail'
    },
    UserStack: {
      index: 'User',
      Address: 'Address',
      Profile: 'Profile',
    },
    
    Sell: 'Sell',
    Cart: 'Cart'
  },

} as const


export default Routes;