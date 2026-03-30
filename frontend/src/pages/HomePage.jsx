import { useState, useEffect } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
const HomePage = () => {
  const [products, setProducts] = useState([]); const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/api/products').then(({data}) => {setProducts(data.products); setLoading(false);}); }, []);
  return loading ? <Loader /> : <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{products.map(p => <ProductCard key={p._id} product={p} />)}</div>;
};
export default HomePage;
