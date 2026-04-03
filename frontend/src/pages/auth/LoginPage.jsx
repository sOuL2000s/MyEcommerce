import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const submitHandler = async (e) => {
    e.preventDefault();
    if (await login(email, password)) navigate(redirect);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl shadow-indigo-100 overflow-hidden border border-slate-100">
        <div className="bg-indigo-600 p-8 text-white text-center">
          <h1 className="text-3xl font-black uppercase tracking-tighter">Welcome Back</h1>
          <p className="text-indigo-100 mt-2 font-medium">Log in to your MERNShop account</p>
        </div>
        
        <form onSubmit={submitHandler} className="p-6 md:p-8 space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              className="input-field" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="input-field" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button className="w-full btn-primary py-4 mt-2">
            Sign In
          </button>
          
          <div className="pt-4 text-center">
            <p className="text-slate-500 text-sm font-medium">
              New to MERNShop? {' '}
              <Link to={`/register?redirect=${redirect}`} className="text-indigo-600 font-bold hover:underline decoration-2 underline-offset-4">
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
