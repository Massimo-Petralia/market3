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
    ProfileStack: {
      index: 'ProfileStack',
      Address: 'Address',
      User: 'User',
    },
    
    Sell: 'Sell',
    Cart: 'Cart'
  },

} as const


export default Routes;