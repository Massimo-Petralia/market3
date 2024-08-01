export const Routes = {
  Auth: {
    Signin: 'Signin',
    Signup: 'Signup'
  },
  MainTabs: {
    index: 'MainTabs',
    HomeStack: {
      index: 'HomeStack',
      Home: 'Home',
      ProductDetail: 'ProductDetail'
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