import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {LoadingState, Notification, Product} from '../../../models/models';
import {DefaultProduct} from '../../../models/default-values';
import {productService} from '../../services/product-service';
import {setNotification, toggleNotification} from './alerts-slice';
import { removeProduct } from './product-list-slice';
import {selectProducts} from '../selectors/product-list-selectors';
import {useSelector} from 'react-redux';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    loadingState: 'idle' as LoadingState,
    product: DefaultProduct,
  },
  reducers: {
    createProduct: (state, action) => {
      console.log('Action: ', action.type);
      if (state.loadingState === 'idle') {
        return {...state, loadingState: 'loading'};
      }
    },
    createProductSuccess: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      return {...state, product, loadingState: 'idle'};
    },
    createProductFailed: (state, action: PayloadAction<string>) => {
      if (state.loadingState === 'loading') {
        return {...state, loadingState: 'idle'};
      }
    },
    updateProduct: (state, action) => {
      console.log('Action: ', action.type);
      if (state.loadingState === 'idle') {
        return {...state, loadingState: 'loading'};
      }
    },
    updateProductSuccess: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      return {...state, product, loadingState: 'idle'};
    },
    updateProductFailed: (state, action: PayloadAction<string>) => {
      if (state.loadingState === 'loading') {
        return {...state, loadingState: 'idle'};
      }
    },
    deleteProduct: (state, action) => {
      console.log('Action: ', action.type);
      if (state.loadingState === 'idle') {
        return {...state, loadingState: 'loading'};
      }
    },
    deleteProductSuccess: (state, action) => {
      console.log('Action: ', action.type);
      return {...state, loadingState: 'idle'};
    },
    deleteProductFailed: (state, action: PayloadAction<string>) => {
      if (state.loadingState === 'loading') {
        return {...state, loadingState: 'idle'};
      }
    },
  },
});
export const {
  createProduct,
  createProductSuccess,
  createProductFailed,
  updateProduct,
  updateProductSuccess,
  updateProductFailed,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailed
} = productSlice.actions;
export const productReducer = productSlice.reducer;

class ProductThuks {
  createProductThunk = (product: Product) => async (dispatch: Dispatch) => {
    dispatch(createProduct(null));
    productService
      .createProduct(product)
      .then(async response => {
        const product: Product = await response.json();
        const notification: Notification = {
          type: 'info',
          text: 'Product created !',
          compType: 'snackbar',
        };
        dispatch(createProductSuccess(product));
        dispatch(setNotification(notification));
        dispatch(toggleNotification());
      })
      .catch((error: Error) => dispatch(createProductFailed(error.message)));
  };
  updateProductThunk =
    (accessToken: string, product: Product) => async (dispatch: Dispatch) => {
      dispatch(updateProduct(null));
      productService
        .updateProduct(accessToken, product)
        .then(async response => {
          const data = await response.json();
          if (typeof data === 'string') {
            const notification: Notification = {
              type: 'warning',
              text: data,
              compType: 'snackbar',
            };
            dispatch(updateProductFailed(notification.text));
            dispatch(setNotification(notification));
            dispatch(toggleNotification());
          } else {
            const product: Product = data;
            const notification: Notification = {
              type: 'info',
              text: 'Product updated !',
              compType: 'snackbar',
            };
            dispatch(updateProductSuccess(product));
            dispatch(setNotification(notification));
            dispatch(toggleNotification());
          }
        })
        .catch((error: Error) => dispatch(updateProductFailed(error.message)));
    };
  deleteProductThunk = (accessToken:string,id: number) => async (dispatch: Dispatch) => {
    dispatch(deleteProduct(null))
    productService.deleteProduct(accessToken, id).then(async response => {
      const data = await response.json()
      if(typeof data === 'string'){
        const notification: Notification = {
          type: 'warning',
          text: data,
          compType: 'snackbar'
        };
        dispatch(deleteProductFailed(notification.text))
        dispatch(setNotification(notification))
        dispatch(toggleNotification())
      }else{
        const notification: Notification = {
          type: 'info',
          text: 'Product deleted !',
          compType: 'snackbar'
        };
        dispatch(deleteProductSuccess(null))
        dispatch(removeProduct(id))
        dispatch(setNotification(notification))
        dispatch(toggleNotification())
      }
    })
  };
}

export const productThunks = new ProductThuks();
