import {useSelector, useDispatch} from 'react-redux';
import {ProductRouteProp} from '../../../navigation/navigation-types';
import {ProductDetail} from './product-detail-view';
import {useRoute} from '@react-navigation/native';
import {selectProducts} from '../../../store/selectors/product-list-selectors';
import {Product} from '../../../../models/models';
import {AppDispatch} from '../../../store/store';
import {userThunks} from '../../../store/slices/user-slice';
import {
  selectUserId,
  selectCart,
} from '../../../store/selectors/user-selectors';

export const ProductDetailPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const route = useRoute<ProductRouteProp>();
  const {productId, viewMode} = route.params;
  const products = useSelector(selectProducts);
  const userId = useSelector(selectUserId);
  const cart = useSelector(selectCart);
 const onAddToCart = () => {
    if (userId && productId) {
      const convertedCart = Object.values(cart);
      const newCart = [...convertedCart, products[productId]];
      dispatch(userThunks.updateCartThunk(userId, newCart));
    }
  };
  return (
    <>
      <ProductDetail onAddToCart={onAddToCart} product={products[productId!]} viewMode={viewMode} />
    </>
  );
};
