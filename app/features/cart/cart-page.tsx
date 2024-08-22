import {useState, useEffect} from 'react';
import {Cart} from './cart-view';
import {selectCart, selectUserId, selectLoadingState} from '../../store/selectors/user-selectors';
import {useSelector, useDispatch} from 'react-redux';
import {ProductList} from '../../models/models';
import {userThunks} from '../../store/slices/user-slice';
import {AppDispatch} from '../../store/store';
export const CartPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const cart = useSelector(selectCart);
  const userId = useSelector(selectUserId);
  const loadingState = useSelector(selectLoadingState)
  const [cartValue, setCartValue] = useState<ProductList>({});
  const onRemoveItem = (id: number) => {
    const newCart = {...cart};
    delete newCart[id];
    const convertedCart = Object.values(newCart);
    if (userId) {
      dispatch(userThunks.updateCartThunk(userId, convertedCart));
    }
  };
  useEffect(() => {
    setCartValue(cart);
  }, [cart]);
  return (
    <>
      <Cart loadingState={loadingState} cart={Object.values(cartValue)} onRemoveItem={onRemoveItem} />
    </>
  );
};
