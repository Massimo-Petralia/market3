import React, {useEffect, useState} from 'react';
import {selectProducts} from '../../store/selectors/product-list-selectors';
import {AppDispatch} from '../../store/store';
import {ProductsList} from './product-list-view';
import {useDispatch, useSelector} from 'react-redux';
import {Product} from '../../../models/models';
import {productListThunks} from '../../store/slices/product-list-slice';

export const ProductsListPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const productList = useSelector(selectProducts);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(productListThunks.getProductList());
  }, []);
  useEffect(() => {
    setProducts(Object.values(productList));
  }, [productList]);

  return (
    <>
      <ProductsList products={products} />
    </>
  );
};
