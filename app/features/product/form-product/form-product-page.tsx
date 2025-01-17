import {FormProduct} from './form-product-view';
import {
  productThunks,
  resetIsDeleted,
} from '../../../store/slices/product-slice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../store/store';
import {
  selectUserId,
  selectAccessToken,
} from '../../../store/selectors/user-selectors';
import {Product} from '../../../models/models';
import {
  selectProductDetail,
  selectLoadingState,
  selectIsDeleted,
} from '../../../store/selectors/product-selectors';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  HomeStackNavigationProp,
  ProductRouteProp,
} from '../../../navigation/navigation-types';
import {useRoute} from '@react-navigation/native';

export const FormProductPage = () => {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const dispatch: AppDispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const accessToken = useSelector(selectAccessToken);
  const product = useSelector(selectProductDetail);
  const loadingState = useSelector(selectLoadingState);
  const isDeleted = useSelector(selectIsDeleted);
  const route = useRoute<ProductRouteProp>();
  const {productId, viewMode} = route.params || {
    productId: null,
    viewMode: 'edit',
  };
  const onCreateProduct = (product: Product) => {
    dispatch(productThunks.createProductThunk({...product, userId}));
  };
  const onUpdateProduct = (product: Product) => {
    dispatch(productThunks.updateProductThunk(accessToken, product));
  };

  const onResetIsDeleted = () => {
    dispatch(resetIsDeleted(null));
  };
  


  return (
    <>
      <FormProduct
        onCreateProduct={onCreateProduct}
        onUpdateProduct={onUpdateProduct}
        product={product}
        loadingState={loadingState}
        isDeleted={isDeleted}
        onResetIsDeleted={onResetIsDeleted}
        params={{productId, viewMode}}
      />
    </>
  );
};
