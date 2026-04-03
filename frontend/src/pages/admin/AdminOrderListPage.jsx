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
      {loading ? <Loader /> : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-100">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-xs font-black uppercase tracking-widest text-slate-400">ID</th>
                <th className="p-4 text-xs font-black uppercase tracking-widest text-slate-400">Date</th>
                <th className="p-4 text-xs font-black uppercase tracking-widest text-slate-400">Total</th>
                <th className="p-4 text-xs font-black uppercase tracking-widest text-slate-400">Paid</th>
                <th className="p-4 text-xs font-black uppercase tracking-widest text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-sm font-medium text-slate-600">{o._id}</td>
                  <td className="p-4 text-sm text-slate-500">{o.createdAt.substring(0, 10)}</td>
                  <td className="p-4 text-sm font-black text-slate-900">${o.totalPrice.toFixed(2)}</td>
                  <td className="p-4">
                    {o.isPaid ? (
                      <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">Paid</span>
                    ) : (
                      <span className="bg-red-100 text-red-700 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">Unpaid</span>
                    )}
                  </td>
                  <td className="p-4">
                    <Link to={`/order/${o._id}`} className="text-indigo-600 font-bold text-sm hover:underline">Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
