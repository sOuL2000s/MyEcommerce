import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
const CartPage = () => {
  const { cartItems, removeFromCart, totalPrice } = useCart(); const navigate = useNavigate();
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? <p>Cart is empty <Link to="/">Go Back</Link></p> : (
          cartItems.map(item => (
            <div key={item.product} className="flex justify-between items-center border-b py-4">
              <div className="flex items-center gap-4"><img src={item.image} className="w-16 h-16 object-cover" /><span>{item.name}</span></div>
              <div className="flex items-center gap-4"><span>${item.price}</span><button onClick={() => removeFromCart(item.product)} className="text-red-500">Remove</button></div>
            </div>
          ))
        )}
      </div>
      <div className="bg-gray-100 p-6 rounded">
        <h2 className="text-xl font-bold mb-4">Summary</h2>
        <div className="flex justify-between mb-4"><span>Total:</span><span>${totalPrice.toFixed(2)}</span></div>
        <button onClick={() => navigate('/login?redirect=/shipping')} disabled={cartItems.length === 0} className="w-full bg-blue-600 text-white py-2 rounded">Checkout</button>
      </div>
    </div>
  );
};
export default CartPage;
