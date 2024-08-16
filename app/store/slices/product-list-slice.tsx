import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {
  LoadingState,
  Notification,
  Product,
  ProductList,
} from '../../../models/models';
import {productService} from '../../services/product-service';
import {setNotification, toggleNotification} from './alerts-slice';

const defaultProductList: ProductList = {};

const productListSlice = createSlice({
  name: 'product-list',
  initialState: {
    loadingState: 'idle' as LoadingState,
    productList: defaultProductList,
    filteredProducts: defaultProductList,
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

    setIsLastElementTrue: state => {
      return {...state, isLastElement: true};
    },

    getFilteredProducts: (state, action) => {
      console.log('Action: ', action.type);
      if (state.loadingState === 'idle') {
        return {...state, loadingState: 'loading'};
      }
    },
    getFilteredProductsSuccess: (
      state,
      action: PayloadAction<{products: Product[]}>,
    ) => {
      const filteredProducts: {[id: number]: Product} =
        action.payload.products.reduce(
          (collection: {[id: number]: Product}, product) => {
            collection[product.id!] = product;
            return collection;
          },
          {},
        );
      return {...state, filteredProducts, loadingState: 'idle'};
    },
    getFilteredProductsFailed: (state, action: PayloadAction<string>) => {
      if (state.loadingState === 'loading') {
        return {...state, loadingState: 'idle'};
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      console.log('Action: ', action.type)
      const newProductList: ProductList = {...state.productList};
      delete newProductList[action.payload];
      return {...state, productList: newProductList};
    },
  },
});

export const {
  getProductList,
  getProductListSuccess,
  getProductListFailed,
  getFilteredProducts,
  getFilteredProductsSuccess,
  getFilteredProductsFailed,
  removeProduct
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
  getFilteredProducts = (name: string) => async (dispatch: Dispatch) => {
    dispatch(getFilteredProducts(null));
    productService
      .getFilteredProducts(name)
      .then(async response => {
        const data: Product[] = await response.json();
        if (data.length === 0) {
          const notification: Notification = {
            type: 'info',
            text: 'No results !',
          };
          dispatch(getFilteredProductsFailed(notification.text));
          dispatch(setNotification(notification)),
            dispatch(toggleNotification());
        } else {
          dispatch(getFilteredProductsSuccess({products: data}));
        }
      })
      .catch((error: Error) =>
        dispatch(getFilteredProductsFailed(error.message)),
      );
  };
}

export const productListThunks = new ProductListThunks();
