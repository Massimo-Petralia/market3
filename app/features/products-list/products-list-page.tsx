import React, {useEffect, useState} from 'react';
import {
  selectProducts,
  selectFilteredProducts,
  selectLoadingState,
} from '../../store/selectors/product-list-selectors';
import {AppDispatch} from '../../store/store';
import {ProductsList} from './product-list-view';
import {useDispatch, useSelector} from 'react-redux';
import {Product} from '../../../models/models';
import {productListThunks} from '../../store/slices/product-list-slice';

export const ProductsListPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const loadingState = useSelector(selectLoadingState);
  const productList = useSelector(selectProducts);
  const filteredProductsResult = useSelector(selectFilteredProducts);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setfilteredProducts] = useState<Product[]>([]);

  const onFilteredSearch = (name: string) => {
    dispatch(productListThunks.getFilteredProducts(name));
  };

  useEffect(() => {
    dispatch(productListThunks.getProductList());
  }, []);
  useEffect(() => {
    setProducts(Object.values(productList));
  }, [productList]);
  useEffect(() => {
    setfilteredProducts(Object.values(filteredProductsResult));
  }, [filteredProductsResult]);
  return (
    <>
      <ProductsList
        products={products}
        onFilteredSearch={onFilteredSearch}
        filteredProducts={filteredProducts}
        loadingState={loadingState}
      />
    </>
  );
};
