import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';
export default function ShippingPage() {
  const { shippingAddress, saveShippingAddress } = useCart(); const navigate = useNavigate();
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  const submitHandler = (e) => { e.preventDefault(); saveShippingAddress({ address, city, postalCode, country }); navigate('/payment'); };
  return (
    <div className="max-w-md mx-auto">
      <CheckoutSteps step1 step2 />
      <form onSubmit={submitHandler} className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Shipping</h1>
        <input placeholder="Address" className="w-full p-2 border mb-4" value={address} onChange={e => setAddress(e.target.value)} required />
        <input placeholder="City" className="w-full p-2 border mb-4" value={city} onChange={e => setCity(e.target.value)} required />
        <input placeholder="Postal Code" className="w-full p-2 border mb-4" value={postalCode} onChange={e => setPostalCode(e.target.value)} required />
        <input placeholder="Country" className="w-full p-2 border mb-4" value={country} onChange={e => setCountry(e.target.value)} required />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Continue</button>
      </form>
    </div>
  );
}
