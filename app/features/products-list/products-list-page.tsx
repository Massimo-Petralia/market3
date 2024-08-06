import {useEffect} from 'react';
import {
  selectCurrentPage,
  selectProducts,
  selectIsLastElement
} from '../../store/selectors/product-list-selectors';
import {AppDispatch} from '../../store/store';
import {ProductsList} from './product-list-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  incrementPage,
  productListThunks,
  setIsLastElementTrue,
} from '../../store/slices/product-list-slice';

export const ProductsListPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const productList = useSelector(selectProducts);
  const isLastElement = useSelector(selectIsLastElement)

const onLastElement = () => {
  dispatch(setIsLastElementTrue())
  dispatch(incrementPage())

}

const onNextPage = () => {
  dispatch(incrementPage())

}


  useEffect(() => {
    dispatch(productListThunks.getProductList(currentPage))
  }, [currentPage]);

  return (
    <>
      <ProductsList
        currentPage={currentPage}
        productList={productList}
        onLastElement={onLastElement}
        onNextPage={onNextPage}
        isLastElement={isLastElement}
      />
    </>
  );
};
