import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { cartReducer } from '../utils/cartUtils';
const CartContext = createContext();
const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
  paymentMethod: localStorage.getItem('paymentMethod') || '',
};
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [discount, setDiscount] = React.useState(0);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
    localStorage.setItem('paymentMethod', state.paymentMethod);
  }, [state]);
  const addToCart = (product, qty) => dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, product: product._id, qty } });
  const removeFromCart = (id) => dispatch({ type: 'CART_REMOVE_ITEM', payload: id });
  const saveShippingAddress = (data) => dispatch({ type: 'CART_SAVE_SHIPPING_ADDRESS', payload: data });
  const savePaymentMethod = (method) => dispatch({ type: 'CART_SAVE_PAYMENT_METHOD', payload: method });
  const clearCartItems = () => dispatch({ type: 'CART_CLEAR_ITEMS' });
  const itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const subtotal = itemsPrice;
  const taxPrice = 0.15 * subtotal;
  const shippingPrice = subtotal > 0 && subtotal > 100 ? 0 : (subtotal > 0 ? 10 : 0);
  const totalBeforeDiscount = subtotal + shippingPrice + taxPrice;
  const discountAmount = (totalBeforeDiscount * discount) / 100;
  const totalPrice = totalBeforeDiscount - discountAmount;

  const applyDiscount = (code) => {
    if (code.toUpperCase() === 'SAVE10') {
      setDiscount(10);
      return true;
    }
    setDiscount(0);
    return false;
  };

  return <CartContext.Provider value={{ ...state, itemsPrice, shippingPrice, taxPrice, totalPrice, discountAmount, addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems, applyDiscount }}>{children}</CartContext.Provider>;
};
export const useCart = () => useContext(CartContext);
