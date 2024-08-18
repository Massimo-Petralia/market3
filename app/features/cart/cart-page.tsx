import { useState, useEffect } from 'react';
import {Cart} from './cart-view';
import { selectCart } from '../../store/selectors/user-selectors';
import { useSelector, useDispatch } from 'react-redux';
import { ProductList } from '../../../models/models';
export const CartPage = () => {
  const cart = useSelector(selectCart)
    const [cartValue, setCartValue]= useState<ProductList>({})
useEffect(()=>{
  setCartValue(cart)
},[cart])
  return (
    <>
      <Cart cart={Object.values(cartValue)}/>
    </>
  );
};
