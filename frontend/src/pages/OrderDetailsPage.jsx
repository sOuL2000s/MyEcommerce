import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useAuth } from '../context/AuthContext';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/api/orders/${id}`);
      setOrder(data);
      setLoading(false);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const deliverHandler = async () => {
    try {
      await api.put(`/api/orders/${id}/deliver`);
      toast.success('Order delivered');
      fetchOrder();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const payHandler = async () => {
    try {
      await api.put(`/api/orders/${id}/pay`, {
        id: 'PAYMENT_ID_SIMULATED',
        status: 'COMPLETED',
        update_time: new Date().toISOString(),
        email_address: order.user.email
      });
      toast.success('Payment successful');
      fetchOrder();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <Loader />;
  if (!order) return <Message variant='danger'>Order not found</Message>;

  return (
    <div className='space-y-8'>
      <h1 className="text-3xl font-bold">Order {order._id}</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className='text-xl font-bold mb-4'>Shipping</h2>
            <p className='mb-2'><strong>Name: </strong> {order.user.name}</p>
            <p className='mb-2'><strong>Email: </strong> {order.user.email}</p>
            <p className='mb-4'>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant='success'>Delivered on {order.deliveredAt.substring(0, 10)}</Message>
            ) : (
              <Message variant='danger'>Not Delivered</Message>
            )}
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className='text-xl font-bold mb-4'>Payment Method</h2>
            <p className='mb-4'><strong>Method: </strong> {order.paymentMethod}</p>
            {order.isPaid ? (
              <Message variant='success'>Paid on {order.paidAt.substring(0, 10)}</Message>
            ) : (
              <Message variant='danger'>Not Paid</Message>
            )}
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className='text-xl font-bold mb-4'>Order Items</h2>
            <div className='space-y-4'>
              {order.orderItems.map((item, index) => (
                <div key={index} className='flex justify-between items-center border-b pb-4 last:border-0 last:pb-0'>
                  <div className='flex items-center gap-4'>
                    <img src={item.image} alt={item.name} className='w-12 h-12 object-cover rounded' />
                    <Link to={`/product/${item.product}`} className='hover:underline font-medium'>{item.name}</Link>
                  </div>
                  <div className='text-gray-700'>
                    {item.qty} x ${item.price} = <span className='font-bold'>${(item.qty * item.price).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className='text-xl font-bold mb-6'>Order Summary</h2>
            <div className='space-y-4 text-lg'>
              <div className='flex justify-between'>
                <span>Items</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Shipping</span>
                <span>${order.shippingPrice.toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Tax</span>
                <span>${order.taxPrice.toFixed(2)}</span>
              </div>
              <div className='flex justify-between font-bold text-2xl border-t pt-4'>
                <span>Total</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {!order.isPaid && (
              <div className='mt-8'>
                <button 
                  onClick={payHandler}
                  className='w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition mb-2'
                >
                  Pay Now (Simulated)
                </button>
              </div>
            )}

            {user && user.isAdmin && order.isPaid && !order.isDelivered && (
              <div className='mt-8'>
                <button 
                  onClick={deliverHandler}
                  className='w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 transition'
                >
                  Mark As Delivered
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
