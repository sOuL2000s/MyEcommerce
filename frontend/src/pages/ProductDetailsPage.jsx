import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import Rating from '../components/Rating';
import Message from '../components/Message';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/api/products/${id}`);
      setProduct(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/products/${id}/reviews`, { rating, comment });
      toast.success('Review submitted');
      setRating(0);
      setComment('');
      fetchProduct();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <Loader />;
  if (!product) return <Message variant='danger'>Product not found</Message>;

  return (
    <div className='space-y-12'>
      <Link to='/' className='bg-gray-200 px-4 py-2 rounded inline-block hover:bg-gray-300'>Go Back</Link>
      
      <div className="grid md:grid-cols-2 gap-12">
        <img src={product.image} className="w-full rounded shadow-lg object-cover h-[500px]" alt={product.name} />
        <div className='flex flex-col'>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <div className='border-y py-4 my-4'>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </div>
          <p className="text-gray-600 mb-6 text-lg">{product.description}</p>
          <div className='bg-gray-100 p-6 rounded-lg'>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-gray-700'>Price:</span>
              <span className='text-2xl font-bold'>${product.price}</span>
            </div>
            <div className='flex justify-between items-center mb-6'>
              <span className='text-gray-700'>Status:</span>
              <span className={product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            {product.countInStock > 0 && (
              <div className='flex justify-between items-center mb-6'>
                <span className='text-gray-700'>Qty:</span>
                <select 
                  className='p-2 border rounded bg-white' 
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))}
                >
                  {[...Array(product.countInStock).keys()].map(x => (
                    <option key={x+1} value={x+1}>{x+1}</option>
                  ))}
                </select>
              </div>
            )}

            <button 
              onClick={addToCartHandler} 
              disabled={product.countInStock === 0}
              className={`w-full py-3 rounded text-white font-bold transition ${product.countInStock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className='grid md:grid-cols-2 gap-12'>
        <div className='space-y-6'>
          <h2 className='text-2xl font-bold'>Reviews</h2>
          {product.reviews.length === 0 && <Message>No reviews yet.</Message>}
          <div className='space-y-4'>
            {product.reviews.map(review => (
              <div key={review._id} className='bg-white p-6 rounded shadow border-l-4 border-blue-500'>
                <div className='flex justify-between items-start mb-2'>
                  <strong>{review.name}</strong>
                  <span className='text-gray-500 text-sm'>{review.createdAt.substring(0, 10)}</span>
                </div>
                <Rating value={review.rating} />
                <p className='mt-3 text-gray-700'>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-2xl font-bold mb-4'>Write a Customer Review</h2>
          {user ? (
            <form onSubmit={submitHandler} className='bg-gray-50 p-6 rounded shadow'>
              <div className='mb-4'>
                <label className='block text-gray-700 mb-2'>Rating</label>
                <select 
                  className='w-full p-2 border rounded'
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value=''>Select...</option>
                  <option value='1'>1 - Poor</option>
                  <option value='2'>2 - Fair</option>
                  <option value='3'>3 - Good</option>
                  <option value='4'>4 - Very Good</option>
                  <option value='5'>5 - Excellent</option>
                </select>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 mb-2'>Comment</label>
                <textarea
                  className='w-full p-2 border rounded h-32'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <button className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'>
                Submit
              </button>
            </form>
          ) : (
            <Message>Please <Link to='/login' className='text-blue-600 hover:underline'>sign in</Link> to write a review</Message>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
