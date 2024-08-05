import { useEffect } from 'react';
import { selectCurrentPage, selectProducts } from '../../store/selectors/product-list-selectors';
import { AppDispatch } from '../../store/store';
import {ProductsList} from './product-list-view';
import { useDispatch, useSelector } from 'react-redux';
import { incrementPage, productListThunks } from '../../store/slices/product-list-slice';

export const ProductsListPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const currentPage = useSelector(selectCurrentPage)
  const productList = useSelector(selectProducts)

const handleNextPage = () => {
  const page = currentPage +1
  dispatch(incrementPage())
  dispatch(productListThunks.getProductList(page))
  console.log('page: ', page,)
}

  useEffect(()=>{
    dispatch(productListThunks.getProductList(currentPage))
  },[])

  return (
    <>
      <ProductsList currentPage={currentPage} productList={productList} handleNextPage={handleNextPage}/>
    </>
  );
};
