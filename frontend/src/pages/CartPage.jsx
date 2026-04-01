import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Message from '../components/Message';

import { useState } from 'react';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart, totalPrice, itemsPrice, shippingPrice, taxPrice, discountAmount, applyDiscount } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/" className="text-blue-600 hover:underline">Go Back</Link>
          </Message>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.product} className="flex items-center gap-4 border-b pb-4 bg-white p-4 rounded shadow-sm">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-grow">
                  <Link to={`/product/${item.product}`} className="font-bold hover:underline">{item.name}</Link>
                  <div className="text-gray-600">${item.price}</div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={item.qty}
                    onChange={(e) => addToCart(item, Number(e.target.value))}
                    className="p-1 border rounded"
                  >
                    {[...Array(item.countInStock).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                  <button 
                    onClick={() => removeFromCart(item.product)} 
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Remove item"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 p-6 rounded shadow h-fit">
        <h2 className="text-xl font-bold mb-6 border-b pb-2">Order Summary</h2>
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 block mb-2">Apply Coupon (try SAVE10)</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Coupon Code" 
              className="flex-grow p-2 border rounded outline-none focus:ring-1 focus:ring-blue-500" 
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button 
              onClick={() => {
                if(applyDiscount(couponCode)) {
                  toast.success('Coupon applied!');
                } else {
                  toast.error('Invalid coupon');
                }
              }}
              className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-black transition"
            >
              Apply
            </button>
          </div>
        </div>
        <div className="space-y-3 mb-6 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${itemsPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>${shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>${taxPrice.toFixed(2)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-green-600 font-bold">
              <span>Discount</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-3 border-t text-lg font-bold">
            <span>Total</span>
            <span className="text-indigo-600">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <button 
          onClick={checkoutHandler} 
          disabled={cartItems.length === 0} 
          className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
