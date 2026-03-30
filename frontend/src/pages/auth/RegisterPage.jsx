import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
export default function RegisterPage() {
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const { register } = useAuth(); const navigate = useNavigate(); const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const submitHandler = async (e) => { e.preventDefault(); if (await register(name, email, password)) navigate(redirect); };
  return (
    <form onSubmit={submitHandler} className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <input type="text" placeholder="Name" className="w-full p-2 border mb-4" value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Email" className="w-full p-2 border mb-4" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" className="w-full p-2 border mb-4" value={password} onChange={e => setPassword(e.target.value)} required />
      <button className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
      <p className="mt-4">Have an account? <Link to={`/login?redirect=${redirect}`}>Login</Link></p>
    </form>
  );
}
