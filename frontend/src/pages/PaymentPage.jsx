import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';
export default function PaymentPage() {
  const { savePaymentMethod } = useCart(); const navigate = useNavigate();
  const [method, setMethod] = useState('PayPal');
  const submitHandler = (e) => { e.preventDefault(); savePaymentMethod(method); navigate('/placeorder'); };
  return (
    <div className="max-w-md mx-auto">
      <CheckoutSteps step1 step2 step3 />
      <form onSubmit={submitHandler} className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Payment Method</h1>
        <div className="mb-4"><input type="radio" id="PayPal" name="method" value="PayPal" checked onChange={e => setMethod(e.target.value)} /><label htmlFor="PayPal" className="ml-2">PayPal or Credit Card</label></div>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Continue</button>
      </form>
    </div>
  );
}
