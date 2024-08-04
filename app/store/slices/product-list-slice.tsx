import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {LoadingState, Product} from '../../../models/models';

const productListSlice = createSlice({
  name: 'product-list',
  initialState: {
    loadingState: 'idle' as LoadingState,
    productList: {},
    //page ??
  },
  reducers: {
    getProductList: (state, action) => {
      console.log('Action: ', action.type);
      if (state.loadingState === 'idle') {
        return {...state, loadingState: 'loading'};
      }
    },
    getProductListSuccess: (state, action: PayloadAction<Product[]>) => {
      const productList: {[id: number]: Product} = action.payload.reduce(
        (collection: {[id: number]: Product}, product) => {
          collection[product.id!] = product;
          return collection;
        },
        {},
      );
      return {...state, productList, loadingState: 'idle'};
    },
    getProductListFailed: (state, action: PayloadAction<string>)=> {
        if(state.loadingState === 'loading'){
            return {...state, loadingState: 'idle'}
        }
    }
  },
});
