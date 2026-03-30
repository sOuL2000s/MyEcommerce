import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
export default function AdminProductEditPage() {
  const { id } = useParams(); const navigate = useNavigate();
  const [name, setName] = useState(''); const [price, setPrice] = useState(0);
  useEffect(() => { api.get(`/api/products/${id}`).then(({data}) => {setName(data.name); setPrice(data.price);}); }, [id]);
  const submitHandler = async (e) => { e.preventDefault(); await api.put(`/api/products/${id}`, { name, price }); navigate('/admin/productlist'); };
  return (
    <form onSubmit={submitHandler} className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <input placeholder="Name" className="w-full p-2 border mb-4" value={name} onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Price" className="w-full p-2 border mb-4" value={price} onChange={e => setPrice(e.target.value)} />
      <button className="w-full bg-blue-600 text-white py-2 rounded">Update</button>
    </form>
  );
}
