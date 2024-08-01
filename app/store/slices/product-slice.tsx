import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {LoadingState, Notification, Product} from '../../../models/models';
import {DefaultProduct} from '../../../models/default-values';
import { productService } from '../../services/product-service';
import { setNotification, toggleNotification } from './alerts-slice';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    loadingState: 'idle' as LoadingState,
    product: DefaultProduct,
  },
  reducers: {
    createProduct: (state, action) => {//con userId
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
  },
});
export const {createProduct, createProductSuccess, createProductFailed} =
  productSlice.actions;
export const productReducer = productSlice.reducer;

class ProductThuks {
    createProductThunks = (product: Product) => async (dispatch: Dispatch)=>{
        dispatch(createProduct(null))
        productService.createProduct(product).then(async response =>{
            const product: Product = await response.json()
            const notification : Notification = {
                type: 'info',
                text: 'Product created !',
                compType: 'snackbar'
            }
            dispatch(createProductSuccess(product))
            dispatch(setNotification(notification))
            dispatch(toggleNotification())


        }).catch((error: Error)=> dispatch(createProductFailed(error.message)))
    } 
}

export const productThunks = new ProductThuks()