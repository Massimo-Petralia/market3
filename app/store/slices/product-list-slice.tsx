import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {LoadingState, Product, ProductList} from '../../../models/models';
import {productService} from '../../services/product-service';

const defaultProductList: ProductList = {};

const productListSlice = createSlice({
  name: 'product-list',
  initialState: {
    loadingState: 'idle' as LoadingState,
    productList: defaultProductList,
    currentPage: 1,
    totalProducts: 0,
    isLastElement: false,
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
      action: PayloadAction<{products: Product[]; total: number}>,
    ) => {
      const productList: {[id: number]: Product} =
        action.payload.products.reduce(
          (collection: {[id: number]: Product}, product) => {
            collection[product.id!] = product;
            return collection;
          },
          {},
        );
      const totalProducts = action.payload.total;
      return {
        ...state,
        productList,
        totalProducts,
        isLastElement: false,
        loadingState: 'idle',
      };
    },
    getProductListFailed: (state, action: PayloadAction<string>) => {
      if (state.loadingState === 'loading') {
        return {...state, loadingState: 'idle'};
      }
    },
    incrementPage: state => {
      const page = state.currentPage + 1;
      return {...state, currentPage: page};
    },
  setIsLastElementTrue :(state)=>{
    return {...state, isLastElement: true}
  },
    // decrementPage: (state, acion) => {
    //   const page = state.currentPage - 1;
    //   return {...state, currentPage: page};
    // },
  },
});

export const {
  getProductList,
  getProductListSuccess,
  getProductListFailed,
  incrementPage,
  setIsLastElementTrue
} = productListSlice.actions;
export const productListReducer = productListSlice.reducer;

class ProductListThunks {
  getProductList = (page: number) => async (dispatch: Dispatch) => {
    dispatch(getProductList(null));
    productService
      .getProductList(page)
      .then(async response => {
       // console.log('response: ', response.headers.get('link'));
        const total: number = Number(response.headers.get('X-Total-Count'));
        const data: Product[] = await response.json();
        dispatch(getProductListSuccess({products: data, total}));
      })
      .catch((error: Error) => dispatch(getProductListFailed(error.message)));
  };
}

export const productListThunks = new ProductListThunks();
