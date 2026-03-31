import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';
import Loader from '../../components/Loader';

export default function AdminUserEditPage() {
  const { id } = useParams(); const navigate = useNavigate();
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [isAdmin, setIsAdmin] = useState(false); const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`/api/users/${id}`).then(({ data }) => { setName(data.name); setEmail(data.email); setIsAdmin(data.isAdmin); setLoading(false); })
    .catch(err => { toast.error(err.response?.data?.message || err.message); setLoading(false); });
  }, [id]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try { await api.put(`/api/users/${id}`, { name, email, isAdmin }); toast.success('User updated'); navigate('/admin/userlist'); } 
    catch (err) { toast.error(err.response?.data?.message || err.message); }
  };
  return (
    <div className="max-w-lg mx-auto">
      <Link to="/admin/userlist" className="bg-gray-200 px-4 py-2 rounded mb-6 inline-block">Go Back</Link>
      <form onSubmit={submitHandler} className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Edit User</h1>
        {loading ? <Loader /> : (<>
          <div className="mb-4"><label className="block text-gray-700 mb-2">Name</label><input type="text" className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="mb-4"><label className="block text-gray-700 mb-2">Email Address</label><input type="email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="mb-6 flex items-center"><input type="checkbox" id="isAdmin" className="w-4 h-4" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} /><label htmlFor="isAdmin" className="ml-2 block text-gray-700">Is Admin</label></div>
          <button className="w-full bg-blue-600 text-white py-2 rounded">Update</button>
        </>)}
      </form>
    </div>
  );
}
