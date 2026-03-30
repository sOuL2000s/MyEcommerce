import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || ''); const [email, setEmail] = useState(user?.email || ''); const [password, setPassword] = useState('');
  const submitHandler = (e) => { e.preventDefault(); updateProfile({ name, email, password }); };
  return (
    <form onSubmit={submitHandler} className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <input placeholder="Name" className="w-full p-2 border mb-4" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" className="w-full p-2 border mb-4" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="New Password" className="w-full p-2 border mb-4" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="w-full bg-blue-600 text-white py-2 rounded">Update</button>
    </form>
  );
}
