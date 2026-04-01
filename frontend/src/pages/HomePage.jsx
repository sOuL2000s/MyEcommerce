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
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    // Fetch featured products
    api.get('/api/products?isFeatured=true&limit=4')
      .then(({ data }) => setFeaturedProducts(data.products))
      .catch(() => {});

    setLoading(true);
    api.get(`/api/products?keyword=${keyword || ''}&pageNumber=${pageNumber}&sort=${sort}&category=${category}`)
      .then(({ data }) => {
        setProducts(data.products);
        setPages(data.pages);
        setPage(data.page);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [keyword, pageNumber, sort, category]);

  return (
    <>
      {/* Hero Section */}
      {!keyword && pageNumber === 1 && (
        <section className="relative overflow-hidden mb-12 rounded-2xl shadow-2xl group">
          <div className="bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 text-white p-16 md:p-24 flex flex-col items-center text-center transition-all duration-700 transform hover:scale-[1.01]">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-6 tracking-widest animate-pulse uppercase">Limited Time Offer</span>
            <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight drop-shadow-lg">
              Elevate Your <span className="text-blue-400">Digital Life</span>
            </h1>
            <p className="text-lg md:text-2xl mb-10 max-w-2xl text-gray-200 font-light leading-relaxed">
              Experience the pinnacle of innovation with our curated selection of next-gen electronics. 
              Enjoy exclusive summer discounts up to 50% off.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <button className="bg-white text-indigo-900 px-10 py-4 rounded-full font-bold hover:bg-blue-50 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transform hover:-translate-y-1">
                Shop the Sale
              </button>
              <button className="bg-transparent border-2 border-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {!keyword && pageNumber === 1 && featuredProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-indigo-900 uppercase tracking-widest">Editor's Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Brand Story Snippet */}
      {!keyword && pageNumber === 1 && (
        <div className="bg-white p-8 rounded-xl shadow-sm mb-12 flex flex-col md:flex-row items-center gap-8 border border-gray-100">
           <div className="md:w-1/3">
             <img src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=1000&auto=format&fit=crop" className="rounded-lg shadow-md hover:scale-105 transition duration-500" alt="Brand Story" />
           </div>
           <div className="md:w-2/3">
             <h2 className="text-2xl font-bold mb-4 text-indigo-900">Our Story</h2>
             <p className="text-gray-600 leading-relaxed mb-4">
               Founded on the belief that technology should be accessible to everyone, MERNShop has grown from a small startup to a global leader in high-end consumer electronics. We hand-pick every product to ensure quality and innovation.
             </p>
             <Link to="/about" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">Read our full mission <span>→</span></Link>
           </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          {keyword && (
            <Link to='/' className='bg-gray-200 px-4 py-2 rounded mr-4 hover:bg-gray-300 transition'>
              Go Back
            </Link>
          )}
          <h1 className="text-3xl font-bold inline-block">{keyword ? `Search Results for "${keyword}"` : 'Discover Products'}</h1>
        </div>

        <div className="flex gap-4 flex-wrap">
          <select 
            className="p-2 border rounded bg-white shadow-sm outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
          </select>

          <select 
            className="p-2 border rounded bg-white shadow-sm outline-none"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By: Newest</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
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
