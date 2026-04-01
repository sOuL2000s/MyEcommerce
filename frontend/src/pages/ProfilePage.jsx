import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Loader from '../components/Loader';
import Message from '../components/Message';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const { data } = await api.get('/api/orders/myorders');
        setOrders(data);
        setLoadingOrders(false);
      } catch (err) {
        setLoadingOrders(false);
      }
    };
    fetchMyOrders();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    updateProfile({ name, email, password });
  };

  return (
    <div className="grid md:grid-cols-4 gap-8">
      <div className="md:col-span-1">
        <form onSubmit={submitHandler} className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">User Profile</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input className="w-full p-2 border rounded mt-1" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input className="w-full p-2 border rounded mt-1" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" placeholder="New Password" className="w-full p-2 border rounded mt-1" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Update</button>
        </form>
      </div>

      <div className="md:col-span-3">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : orders.length === 0 ? (
          <Message>You have no orders.</Message>
        ) : (
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">DATE</th>
                  <th className="p-4 font-semibold">TOTAL</th>
                  <th className="p-4 font-semibold">PAID</th>
                  <th className="p-4 font-semibold">DELIVERED</th>
                  <th className="p-4 font-semibold">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50 text-sm">
                    <td className="p-4">{order._id.substring(0, 10)}...</td>
                    <td className="p-4">{order.createdAt.substring(0, 10)}</td>
                    <td className="p-4">${order.totalPrice.toFixed(2)}</td>
                    <td className="p-4 text-center">
                      {order.isPaid ? order.paidAt.substring(0, 10) : <span className="text-red-500">✖</span>}
                    </td>
                    <td className="p-4 text-center">
                      {order.isDelivered ? order.deliveredAt.substring(0, 10) : <span className="text-red-500">✖</span>}
                    </td>
                    <td className="p-4">
                      <Link to={`/order/${order._id}`} className="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
