import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';
export default function ShippingPage() {
  const { shippingAddress, saveShippingAddress } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    navigate('/payment');
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <CheckoutSteps step1 step2 />
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-slate-100 overflow-hidden mt-8">
        <div className="p-8 lg:p-12">
          <h1 className="text-3xl font-black text-slate-900 mb-8 tracking-tight flex items-center gap-4">
            <span className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl">1</span>
            Shipping Details
          </h1>
          
          <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Street Address</label>
              <input 
                placeholder="123 tech Street" 
                className="input-field" 
                value={address} 
                onChange={e => setAddress(e.target.value)} 
                required 
              />
            </div>
            
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">City</label>
              <input 
                placeholder="Silicon Valley" 
                className="input-field" 
                value={city} 
                onChange={e => setCity(e.target.value)} 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Postal Code</label>
              <input 
                placeholder="10001" 
                className="input-field" 
                value={postalCode} 
                onChange={e => setPostalCode(e.target.value)} 
                required 
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Country</label>
              <input 
                placeholder="United States" 
                className="input-field" 
                value={country} 
                onChange={e => setCountry(e.target.value)} 
                required 
              />
            </div>

            <div className="md:col-span-2 pt-6">
              <button className="w-full btn-primary py-4 text-lg">
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
