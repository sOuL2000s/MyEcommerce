import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Loader from '../../components/Loader';
export default function AdminOrderListPage() {
  const [orders, setOrders] = useState([]); const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/api/orders').then(({data}) => {setOrders(data); setLoading(false);}); }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>
      {loading ? <Loader /> : <table className="w-full bg-white rounded shadow text-left">
        <thead><tr className="border-b"><th className="p-4">ID</th><th className="p-4">Date</th><th className="p-4">Total</th><th className="p-4">Paid</th></tr></thead>
        <tbody>{orders.map(o => <tr key={o._id} className="border-b"><td className="p-4">{o._id}</td><td className="p-4">{o.createdAt.substring(0, 10)}</td><td className="p-4">${o.totalPrice}</td><td className="p-4">{o.isPaid ? 'Yes' : 'No'}</td><td className="p-4"><Link to={`/order/${o._id}`} className="text-blue-500">Details</Link></td></tr>)}</tbody>
      </table>}
    </div>
  );
}
