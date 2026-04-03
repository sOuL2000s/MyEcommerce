import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import Rating from '../components/Rating';
import Message from '../components/Message';
import ProductCard from '../components/ProductCard';

const RelatedProducts = ({ category, excludeId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/products?category=${category}&limit=5`)
      .then(({ data }) => {
        setProducts(data.products.filter(p => p._id !== excludeId).slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category, excludeId]);

  if (loading || products.length === 0) return null;

  return (
    <div className="mt-24">
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">You May Also Like</h2>
        <div className="h-px flex-grow bg-slate-200"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
};

const SkeletonDetails = () => (
  <div className="animate-pulse space-y-8 py-10">
    <div className="grid md:grid-cols-2 gap-12">
      <div className="bg-slate-200 rounded-2xl aspect-square"></div>
      <div className="space-y-4">
        <div className="h-10 bg-slate-200 rounded-lg w-3/4"></div>
        <div className="h-6 bg-slate-200 rounded-lg w-1/4"></div>
        <div className="h-32 bg-slate-200 rounded-xl"></div>
        <div className="h-12 bg-slate-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);

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
  const [mainImage, setMainImage] = useState('');
  const [selectedVariations, setSelectedVariations] = useState({});

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/api/products/${id}`);
      setProduct(data);
      setMainImage(data.image);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleVariationChange = (name, value) => {
    setSelectedVariations(prev => ({ ...prev, [name]: value }));
  };

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

  if (loading) return <SkeletonDetails />;
  if (!product) return <Message variant='danger'>Product not found</Message>;

  return (
    <div className='max-w-7xl mx-auto px-2 md:px-0'>
      <div className="flex items-center gap-2 mb-6 md:mb-8 text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest">
        <Link to='/' className='hover:text-indigo-600 transition-colors'>Home</Link>
        <span>/</span>
        <span className="text-indigo-600 truncate">{product.category}</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
        {/* Left: Images */}
        <div className="space-y-4 md:space-y-6">
          <div className="relative aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-white border border-slate-100 shadow-xl group">
             <img 
              src={mainImage} 
              className="w-full h-full object-contain p-6 md:p-10 transition-transform duration-1000 group-hover:scale-110" 
              alt={product.name} 
            />
            {product.salePrice && product.price > product.salePrice && (
              <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-indigo-600 text-white text-[10px] md:text-base font-black px-3 py-1 md:px-4 md:py-2 rounded-xl md:rounded-2xl shadow-2xl rotate-[-10deg] z-10">
                OFFER
              </div>
            )}
          </div>
          
          {product.images && product.images.length > 0 && (
            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 no-scrollbar">
              <button 
                onClick={() => setMainImage(product.image)}
                className={`w-24 h-24 rounded-2xl border-4 overflow-hidden transition-all duration-300 transform ${mainImage === product.image ? 'border-indigo-600 scale-105 shadow-lg' : 'border-white opacity-60 hover:opacity-100 hover:scale-105'}`}
              >
                <img src={product.image} className="w-full h-full object-cover" alt="main" />
              </button>
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  className={`w-24 h-24 rounded-2xl border-4 overflow-hidden transition-all duration-300 transform ${mainImage === img ? 'border-indigo-600 scale-105 shadow-lg' : 'border-white opacity-60 hover:opacity-100 hover:scale-105'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`thumb-${i}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className='flex flex-col py-2'>
          <div className="flex items-center gap-3 mb-4">
             <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em]">{product.brand}</span>
             <div className="h-1.5 w-1.5 rounded-full bg-slate-300"></div>
             <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-[1.1]">{product.name}</h1>
          
          <div className="flex items-baseline gap-4 mb-8">
            {product.salePrice ? (
              <>
                <span className="text-4xl font-black text-indigo-600">${product.salePrice.toFixed(2)}</span>
                <span className="text-xl text-slate-400 line-through font-bold">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-4xl font-black text-indigo-600">${product.price.toFixed(2)}</span>
            )}
          </div>

          <p className="text-slate-500 leading-relaxed text-lg mb-10 border-l-4 border-slate-100 pl-6 italic">
            {product.description}
          </p>
          
          <div className='space-y-8 bg-slate-50 p-8 rounded-[2rem] border border-slate-100'>
            {product.variations && product.variations.length > 0 && (
              <div className="space-y-6">
                {product.variations.map((v) => (
                  <div key={v.name} className="space-y-3">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       {v.name} <span className="text-slate-900">{selectedVariations[v.name] || 'Select'}</span>
                    </span>
                    <div className="flex gap-3 flex-wrap">
                      {v.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleVariationChange(v.name, opt)}
                          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border-2 ${selectedVariations[v.name] === opt ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105' : 'bg-white text-slate-600 border-white hover:border-slate-200'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              {product.countInStock > 0 && (
                <div className='flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-2'>
                  <span className='text-xs font-black text-slate-400 mr-4 uppercase'>Qty</span>
                  <select 
                    className='bg-transparent font-black text-slate-900 focus:outline-none min-w-[50px] cursor-pointer' 
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
                className={`flex-grow btn-primary py-4 text-lg shadow-indigo-200 ${product.countInStock === 0 ? 'bg-slate-300 grayscale cursor-not-allowed' : ''}`}
              >
                {product.countInStock > 0 ? 'Add to Shopping Bag' : 'Sold Out'}
              </button>
            </div>
            
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 pt-4">
               <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${product.countInStock > 0 ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                  {product.countInStock > 10 ? 'Available Now' : product.countInStock > 0 ? `Only ${product.countInStock} Left` : 'Restocking Soon'}
               </div>
               <div className="flex items-center gap-4">
                  <span className="hover:text-indigo-600 cursor-pointer">Shipping Policy</span>
                  <span className="hover:text-indigo-600 cursor-pointer">Ask a Question</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts category={product.category} excludeId={product._id} />

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
