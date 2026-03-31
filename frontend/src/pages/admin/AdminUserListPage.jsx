import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';
import Loader from '../../components/Loader';

export default function AdminUserListPage() {
  const [users, setUsers] = useState([]); const [loading, setLoading] = useState(true);
  const fetchUsers = async () => {
    try { const { data } = await api.get('/api/users'); setUsers(data); setLoading(false); } 
    catch (err) { toast.error(err.response?.data?.message || err.message); setLoading(false); }
  };
  useEffect(() => { fetchUsers(); }, []);
  const deleteHandler = async (id) => {
    if (window.confirm('Delete user?')) {
      try { await api.delete(`/api/users/${id}`); toast.success('User deleted'); fetchUsers(); } 
      catch (err) { toast.error(err.response?.data?.message || err.message); }
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      {loading ? <Loader /> : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-gray-100 border-b"><th className="p-4 font-semibold">ID</th><th className="p-4 font-semibold">NAME</th><th className="p-4 font-semibold">EMAIL</th><th className="p-4 font-semibold">ADMIN</th><th className="p-4 font-semibold">ACTIONS</th></tr></thead>
            <tbody>{users.map((user) => (<tr key={user._id} className="border-b hover:bg-gray-50"><td className="p-4">{user._id}</td><td className="p-4">{user.name}</td><td className="p-4"><a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">{user.email}</a></td><td className="p-4">{user.isAdmin ? '✔' : '✖'}</td><td className="p-4 flex gap-4"><Link to={`/admin/user/${user._id}/edit`} className="bg-blue-100 text-blue-600 px-3 py-1 rounded">Edit</Link><button onClick={() => deleteHandler(user._id)} className="bg-red-100 text-red-600 px-3 py-1 rounded">Delete</button></td></tr>))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
