import { Link } from 'react-router-dom';
export default function CheckoutSteps({ step1, step2, step3, step4 }) {
  return <div className="flex justify-center gap-4 mb-4">
    {step1 ? <Link to="/login">Sign In</Link> : <span className="text-gray-400">Sign In</span>}
    {step2 ? <Link to="/shipping">Shipping</Link> : <span className="text-gray-400">Shipping</span>}
    {step3 ? <Link to="/payment">Payment</Link> : <span className="text-gray-400">Payment</span>}
    {step4 ? <Link to="/placeorder">Place Order</Link> : <span className="text-gray-400">Place Order</span>}
  </div>;
}
