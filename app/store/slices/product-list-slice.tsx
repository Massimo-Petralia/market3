import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {LoadingState, Product, ProductList} from '../../../models/models';
import {productService} from '../../services/product-service';

const defaultProductList: ProductList = {};

const productListSlice = createSlice({
  name: 'product-list',
  initialState: {
    loadingState: 'idle' as LoadingState,
    productList: defaultProductList,
  },
  reducers: {
    getProductList: (state, action) => {
      console.log('Action: ', action.type);
      if (state.loadingState === 'idle') {
        return {...state, loadingState: 'loading'};
      }
    },
    getProductListSuccess: (
      state,
      action: PayloadAction<{products: Product[]}>,
    ) => {
      const productList: {[id: number]: Product} =
        action.payload.products.reduce(
          (collection: {[id: number]: Product}, product) => {
            collection[product.id!] = product;
            return collection;
          },
          {},
        );
      return {
        ...state,
        productList,
        loadingState: 'idle',
      };
    },
    getProductListFailed: (state, action: PayloadAction<string>) => {
      if (state.loadingState === 'loading') {
        return {...state, loadingState: 'idle'};
      }
    },
 
  setIsLastElementTrue :(state)=>{
    return {...state, isLastElement: true}
  },
 
  }
});

export const {
  getProductList,
  getProductListSuccess,
  getProductListFailed,
} = productListSlice.actions;
export const productListReducer = productListSlice.reducer;

class ProductListThunks {
  getProductList = () => async (dispatch: Dispatch) => {
    dispatch(getProductList(null));
    productService
      .getProductList()
      .then(async response => {
        const data: Product[] = await response.json();
        dispatch(getProductListSuccess({products: data}));
      })
      .catch((error: Error) => dispatch(getProductListFailed(error.message)));
  };
}

export const productListThunks = new ProductListThunks();
