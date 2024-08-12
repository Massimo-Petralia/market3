import {FormProduct} from './form-product-view';
import {productThunks} from '../../../store/slices/product-slice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../store/store';
import {
  selectUserId,
  selectAccessToken,
} from '../../../store/selectors/user-selectors';
import {Product} from '../../../../models/models';
import {
  selectProductDetail,
  selectLoadingState,
  selectIsDeleted,
} from '../../../store/selectors/product-selectors';
import React, {useEffect} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {HomeStackNavigationProp} from '../../../navigation/navigation-types';
export const FormProductPage = () => {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const dispatch: AppDispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const accessToken = useSelector(selectAccessToken);
  const product = useSelector(selectProductDetail);
  const loadingState = useSelector(selectLoadingState);
  const isDeleted = useSelector(selectIsDeleted);
  const onCreateProduct = (product: Product) => {
    dispatch(productThunks.createProductThunk({...product, userId}));
  };
  const onUpdateProduct = (product: Product) => {
    dispatch(productThunks.updateProductThunk(accessToken, product));
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isDeleted === true) {
        navigation.navigate('Home');
      }
    }, [isDeleted]),
  );
  return (
    <>
      <FormProduct
        onCreateProduct={onCreateProduct}
        onUpdateProduct={onUpdateProduct}
        product={product}
        loadingState={loadingState}
      />
    </>
  );
};
