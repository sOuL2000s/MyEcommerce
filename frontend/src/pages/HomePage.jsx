import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

const HomePage = () => {
  const { keyword, pageNumber = 1 } = useParams();
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/api/products?keyword=${keyword || ''}&pageNumber=${pageNumber}`)
      .then(({ data }) => {
        setProducts(data.products);
        setPages(data.pages);
        setPage(data.page);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [keyword, pageNumber]);

  return (
    <>
      {keyword && (
        <Link to='/' className='bg-gray-200 px-4 py-2 rounded mb-4 inline-block hover:bg-gray-300'>
          Go Back
        </Link>
      )}
      <h1 className="text-2xl font-bold mb-6">{keyword ? `Search Results for "${keyword}"` : 'Latest Products'}</h1>
      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  );
};

export default HomePage;
