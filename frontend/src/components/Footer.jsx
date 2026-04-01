import { Link } from 'react-router-dom';

import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axios';

export default function Footer() {
  const [email, setEmail] = useState('');

  const newsletterHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/newsletter', { email });
      toast.success('Thank you for subscribing!');
      setEmail('');
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <footer className="bg-gray-800 text-white p-8 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">MERNShop</h3>
          <p className="text-gray-400">Your one-stop shop for modern tech and electronics.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-400">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-4">Get the latest updates on new products and upcoming sales.</p>
          <form onSubmit={newsletterHandler} className="flex gap-2 shadow-lg rounded-lg overflow-hidden">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address" 
              className="bg-gray-700 text-white px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
            />
            <button type="submit" className="bg-blue-600 px-6 py-3 font-bold hover:bg-blue-700 transition-colors whitespace-nowrap">Join Now</button>
          </form>
          <div className="flex gap-6 mt-8">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-2xl" title="Facebook">FB</a>
            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-2xl" title="Instagram">IG</a>
            <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors text-2xl" title="Twitter">TW</a>
            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors text-2xl" title="YouTube">YT</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs uppercase tracking-widest">
        <div>MERNShop &copy; {new Date().getFullYear()} All Rights Reserved.</div>
        <div className="flex gap-6">
           <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
           <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
           <Link to="/shipping-policy" className="hover:text-white transition">Shipping Policy</Link>
        </div>
      </div>
    </footer>
  );
}
