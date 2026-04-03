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
          <div className="bg-white rounded-[2rem] p-12 text-center border-2 border-dashed border-slate-100">
             <div className="text-5xl mb-4">🛒</div>
             <h3 className="text-xl font-bold text-slate-900 mb-2">Your cart is empty</h3>
             <p className="text-slate-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
             <Link to="/" className="btn-primary inline-block">Continue Shopping</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.product} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 bg-white p-4 md:p-6 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full sm:w-24 h-48 sm:h-24 flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden">
                   <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                </div>
                
                <div className="flex-grow min-w-0 w-full sm:w-auto">
                  <div className="flex justify-between items-start gap-4">
                    <Link to={`/product/${item.product}`} className="font-black text-slate-900 hover:text-indigo-600 transition-colors truncate block">
                      {item.name}
                    </Link>
                    <button 
                      onClick={() => removeFromCart(item.product)} 
                      className="text-slate-300 hover:text-red-500 transition-colors p-1"
                      title="Remove item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between">
                     <div className="text-indigo-600 font-bold">${item.price.toFixed(2)}</div>
                     <div className="flex items-center gap-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</label>
                        <select
                          value={item.qty}
                          onChange={(e) => addToCart(item, Number(e.target.value))}
                          className="bg-slate-100 border-none rounded-lg px-3 py-1 font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none text-sm cursor-pointer"
                        >
                          {[...Array(item.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          ))}
                        </select>
                     </div>
                  </div>
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
          <div className="flex justify-between items-center pt-5 border-t-2 border-dashed border-slate-200 text-2xl font-black">
            <span className="text-slate-900">Total</span>
            <span className="text-indigo-600">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <button 
          onClick={checkoutHandler} 
          disabled={cartItems.length === 0} 
          className="w-full btn-primary py-4 text-lg mt-4 group"
        >
          <span>Secure Checkout</span>
          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
        </button>
        <div className="mt-6 flex flex-col items-center gap-4">
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">We Accept</p>
           <div className="flex gap-4 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
              <span className="text-2xl font-bold italic">VISA</span>
              <span className="text-2xl font-bold italic">PayTM</span>
              <span className="text-2xl font-bold italic">PayPal</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
