import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Loader from '../../components/Loader';
export default function AdminProductListPage() {
  const [products, setProducts] = useState([]); const [loading, setLoading] = useState(true);
  const fetchProducts = () => { api.get('/api/products').then(({data}) => {setProducts(data.products); setLoading(false);}); };
  useEffect(() => { fetchProducts(); }, []);
  const deleteHandler = async (id) => { if (window.confirm('Delete?')) { await api.delete(`/api/products/${id}`); fetchProducts(); } };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Products</h1>
      {loading ? <Loader /> : <table className="w-full bg-white rounded shadow text-left">
        <thead><tr className="border-b"><th className="p-4">Name</th><th className="p-4">Price</th><th className="p-4">Actions</th></tr></thead>
        <tbody>{products.map(p => <tr key={p._id} className="border-b"><td className="p-4">{p.name}</td><td className="p-4">${p.price}</td><td className="p-4 flex gap-4"><Link to={`/admin/product/${p._id}/edit`} className="text-blue-500">Edit</Link><button onClick={() => deleteHandler(p._id)} className="text-red-500">Delete</button></td></tr>)}</tbody>
      </table>}
    </div>
  );
}
