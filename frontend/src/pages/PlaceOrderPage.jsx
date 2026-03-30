import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';
import api from '../api/axios';
export default function PlaceOrderPage() {
  const cart = useCart(); const navigate = useNavigate();
  const placeOrderHandler = async () => {
    try { const { data } = await api.post('/api/orders', { orderItems: cart.cartItems, shippingAddress: cart.shippingAddress, paymentMethod: cart.paymentMethod, itemsPrice: cart.itemsPrice, shippingPrice: cart.shippingPrice, taxPrice: cart.taxPrice, totalPrice: cart.totalPrice });
    cart.clearCartItems(); navigate(`/order/${data._id}`); } catch (e) { alert(e.message); }
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded shadow"><h2 className="font-bold">Shipping</h2><p>{cart.shippingAddress.address}, {cart.shippingAddress.city}</p></div>
          <div className="bg-white p-4 rounded shadow"><h2 className="font-bold">Items</h2>{cart.cartItems.map(i => <div key={i.product}>{i.name} x {i.qty} = ${i.price * i.qty}</div>)}</div>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="font-bold mb-4">Summary</h2>
          <div className="flex justify-between border-b py-2"><span>Total:</span><span>${cart.totalPrice.toFixed(2)}</span></div>
          <button onClick={placeOrderHandler} className="w-full bg-blue-600 text-white py-2 rounded mt-4">Place Order</button>
        </div>
      </div>
    </div>
  );
}
