import {useState, useEffect} from 'react';
import {MyProducts} from './my-products-view';
import {Product} from '../../../../models/models';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../store/store';
import {productListThunks} from '../../../store/slices/product-list-slice';
import {selectUserId} from '../../../store/selectors/user-selectors';
import {selectMyProducts, selectLoadingState} from '../../../store/selectors/product-list-selectors';

export const MyProductsPage = () => {
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const myProductsList = useSelector(selectMyProducts);
  const loadingState = useSelector(selectLoadingState)
  useEffect(() => {
    if (userId) {
      dispatch(productListThunks.getMyProductsThunk(userId));
    }
  }, []);
  useEffect(() => {
    setMyProducts(Object.values(myProductsList));
  }, [myProductsList]);
  return (
    <>
      <MyProducts  myProducts={myProducts} loadingState={loadingState} />
    </>
  );
};
