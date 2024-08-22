import React, {useEffect, useState} from 'react';
import {
  selectProducts,
  selectFilteredProducts,
  selectLoadingState,
} from '../../store/selectors/product-list-selectors';
import {AppDispatch} from '../../store/store';
import {ProductsList} from './product-list-view';
import {useDispatch, useSelector} from 'react-redux';
import {Product} from '../../models/models';
import {productListThunks} from '../../store/slices/product-list-slice';
import {selectUserId} from '../../store/selectors/user-selectors';
import {selectMainPagination} from '../../store/selectors/product-list-selectors';
import {incrementPage} from '../../store/slices/product-list-slice';
import {View, Dimensions} from 'react-native';
export const ProductsListPage = () => {
  const {width, height} = Dimensions.get('screen');
  const dispatch: AppDispatch = useDispatch();
  const loadingState = useSelector(selectLoadingState);
  const productList = useSelector(selectProducts);
  const filteredProductsResult = useSelector(selectFilteredProducts);
  const userId = useSelector(selectUserId);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setfilteredProducts] = useState<Product[]>([]);
  const {lastPage, page} = useSelector(selectMainPagination);
  const onFilteredSearch = (name: string) => {
    dispatch(productListThunks.getFilteredProducts(name));
  };

  const handleLoadMore = () => {
    if (loadingState === 'idle' && page < lastPage) {
      dispatch(incrementPage());
    } else return;
  };

  useEffect(() => {
    dispatch(productListThunks.getProductList(page));
    console.log(Object.values(productList).length)
  }, [page]);

  useEffect(() => {
    setProducts(Object.values(productList));
  }, [productList]);

  useEffect(() => {
    setfilteredProducts(Object.values(filteredProductsResult));
  }, [filteredProductsResult]);

  return (
    <View style={{width, height}}>
      <ProductsList
        handleLoadMore={handleLoadMore}
        products={products}
        onFilteredSearch={onFilteredSearch}
        filteredProducts={filteredProducts}
        loadingState={loadingState}
        userId={userId}
        page={page}
        lastPage={lastPage}
      />
    </View>
  );
};
