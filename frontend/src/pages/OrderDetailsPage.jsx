import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import Loader from '../components/Loader';
export default function OrderDetailsPage() {
  const { id } = useParams(); const [order, setOrder] = useState(null);
  useEffect(() => { api.get(`/api/orders/${id}`).then(({data}) => setOrder(data)); }, [id]);
  if (!order) return <Loader />;
  return <div className="bg-white p-8 rounded shadow"><h1 className="text-2xl font-bold mb-4">Order {order._id}</h1><p>Status: {order.isPaid ? 'Paid' : 'Not Paid'}</p><p>Delivery: {order.isDelivered ? 'Delivered' : 'Not Delivered'}</p><p className="mt-4 font-bold">Total: ${order.totalPrice}</p></div>;
}
