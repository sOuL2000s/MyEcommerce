import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
const ProductDetailsPage = () => {
  const { id } = useParams(); const navigate = useNavigate(); const { addToCart } = useCart();
  const [product, setProduct] = useState(null); const [qty, setQty] = useState(1);
  useEffect(() => { api.get(`/api/products/${id}`).then(({data}) => setProduct(data)); }, [id]);
  if (!product) return <Loader />;
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <img src={product.image} className="w-full rounded" />
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="my-4">{product.description}</p>
        <p className="text-2xl font-bold">${product.price}</p>
        <button onClick={() => {addToCart(product, qty); navigate('/cart');}} className="bg-blue-600 text-white px-6 py-2 rounded mt-4">Add to Cart</button>
      </div>
    </div>
  );
};
export default ProductDetailsPage;
