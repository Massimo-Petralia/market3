import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const selectProductList = (state: RootState) => state.productList;

export const selectLoadingState = createSelector(
  [selectProductList],
  productList => productList.loadingState,
);

export const selectProducts = createSelector(
  [selectProductList],
  ({productList}) => productList,
);

export const selectFilteredProducts = createSelector(
  [selectProductList],
  productList => productList.filteredProducts,
);

export const selectMyProducts = createSelector(
  [selectProductList],
  ({myProducts}) => myProducts,
);
