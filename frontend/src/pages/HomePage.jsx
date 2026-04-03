import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

const HomePage = () => {
  const { keyword, pageNumber = 1 } = useParams();
  const navigate = useNavigate();
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
    <div className="space-y-16 lg:space-y-24">
      {/* Hero Section */}
      {!keyword && pageNumber === 1 && (
        <section className="relative min-h-[500px] md:h-[600px] lg:h-[750px] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex items-center shadow-2xl group">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2000&auto=format&fit=crop" 
               className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" 
               alt="Hero Tech" 
             />
             <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-slate-900/60 to-transparent md:to-indigo-900/10"></div>
          </div>

          <div className="relative z-10 w-full max-w-4xl px-6 md:px-12 lg:px-20 py-16 md:py-0 space-y-6 md:space-y-8">
             <div className="inline-flex items-center gap-2 bg-indigo-500/20 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-indigo-400/30">
                <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-indigo-400 animate-ping"></span>
                <span className="text-indigo-100 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">New Collection '24</span>
             </div>
             
             <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter">
               The Art of <br className="hidden sm:block" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-amber-300">Technology.</span>
             </h1>
             
             <p className="text-base md:text-lg lg:text-2xl text-slate-300 font-medium max-w-xl leading-relaxed">
               Discover the perfect harmony of design and performance. Premium electronics curated for those who dare to stand out.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4 md:pt-6">
                <button 
                  onClick={() => {
                    const el = document.getElementById('products');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary py-4 md:py-5 px-8 md:px-12 text-base md:text-lg shadow-2xl shadow-indigo-500/40"
                >
                  Explore Now
                </button>
                <Link to="/about" className="glass py-4 md:py-5 px-8 md:px-12 rounded-xl text-white font-black uppercase tracking-widest text-[10px] md:text-sm hover:bg-white hover:text-slate-900 transition-all text-center">
                  Our Story
                </Link>
             </div>
          </div>

          {/* Floating Stats */}
          <div className="absolute bottom-12 right-12 hidden lg:flex gap-12 text-white">
             <div className="text-center">
                <div className="text-3xl font-black">2.5k+</div>
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-50">Products</div>
             </div>
             <div className="text-center">
                <div className="text-3xl font-black">15k+</div>
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-50">Reviews</div>
             </div>
          </div>
        </section>
      )}

      {/* Categories Bar */}
      {!keyword && pageNumber === 1 && (
        <section className="flex flex-wrap justify-center gap-6">
           {['All', 'Electronics', 'Mobile', 'Laptops', 'Audio', 'Accessories'].map(cat => (
             <button 
               key={cat} 
               onClick={() => setCategory(cat === 'All' ? '' : cat)}
               className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 border-2 ${
                 (category === cat || (cat === 'All' && !category)) 
                 ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-110' 
                 : 'bg-white text-slate-400 border-white hover:border-slate-100 hover:text-slate-600'
               }`}
             >
               {cat}
             </button>
           ))}
        </section>
      )}

      {/* Main Grid Section */}
      <section id="products">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-2 bg-indigo-600 rounded-full"></div>
                 <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                   {keyword ? `Searching for "${keyword}"` : category ? `${category}` : 'Latest Arrivals'}
                 </h2>
              </div>
              <p className="text-slate-400 font-medium">Hand-picked premium quality guaranteed.</p>
           </div>

           <div className="flex gap-4 w-full lg:w-auto">
              <select 
                className="flex-grow lg:flex-none px-6 py-3 rounded-xl glass font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Newest First</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
           </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {[...Array(8)].map((_, i) => (
               <div key={i} className="animate-pulse space-y-4">
                  <div className="bg-slate-200 aspect-square rounded-2xl"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
               </div>
             ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center space-y-6 border-2 border-dashed border-slate-100">
             <div className="text-6xl">🔍</div>
             <h3 className="text-3xl font-black text-slate-900">No results found</h3>
             <p className="text-slate-400 max-w-md mx-auto">We couldn't find what you're looking for. Try a different keyword or browse our popular categories.</p>
             <button onClick={() => {navigate('/'); setCategory('');}} className="btn-primary">Clear Filters</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
          </>
        )}
      </section>

      {/* Editor's Featured Pick - Dynamic */}
      {!keyword && pageNumber === 1 && featuredProducts.length > 0 && (
        <section className="bg-slate-900 rounded-[3rem] p-8 lg:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600 skew-x-[-20deg] translate-x-20 z-0 hidden lg:block"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
             <div className="lg:w-1/2 space-y-8">
                <span className="text-indigo-400 font-black uppercase tracking-[0.4em] text-xs">Featured Spotlight</span>
                <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight">Pick of the <br /><span className="italic text-indigo-400 font-light">Season.</span></h2>
                <div className="grid grid-cols-2 gap-8">
                   {featuredProducts.slice(0, 2).map(p => (
                     <div key={p._id} className="group">
                        <Link to={`/product/${p._id}`}>
                           <div className="aspect-square rounded-2xl overflow-hidden bg-white/10 mb-4 p-4">
                              <img src={p.image} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                           </div>
                           <div className="text-white font-bold text-sm truncate">{p.name}</div>
                           <div className="text-indigo-400 text-xs font-black">${p.price}</div>
                        </Link>
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-sm aspect-square bg-indigo-500 rounded-[3rem] flex items-center justify-center p-8 shadow-2xl group">
                   <img src={featuredProducts[0]?.image} className="w-full h-full object-contain z-10 group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-black text-center text-sm p-4 leading-tight shadow-xl">
                      BEST <br /> SELLER
                   </div>
                </div>
             </div>
          </div>
        </section>
      )}

      {/* Newsletter / Brand Section */}
      {!keyword && pageNumber === 1 && (
        <section className="grid lg:grid-cols-2 gap-8 items-stretch">
           <div className="bg-amber-100 rounded-[3rem] p-12 lg:p-20 space-y-6">
              <h3 className="text-4xl font-black text-slate-900">Why choose us?</h3>
              <div className="space-y-8 pt-6">
                 {[
                   {title: 'Premium Quality', desc: 'Sourced directly from certified brands.'},
                   {title: 'Free Shipping', desc: 'On all orders above $100 worldwide.'},
                   {title: 'Secure Payment', desc: '100% encrypted transaction process.'}
                 ].map(item => (
                   <div key={item.title} className="flex gap-4">
                      <div className="h-6 w-6 rounded-full bg-slate-900 flex-shrink-0 mt-1"></div>
                      <div>
                         <h4 className="font-black text-lg text-slate-900">{item.title}</h4>
                         <p className="text-slate-600 font-medium">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-indigo-600 rounded-[3rem] p-12 lg:p-20 text-white flex flex-col justify-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-4xl font-black leading-tight">Join our global <br /> community.</h3>
              <p className="text-indigo-100 text-lg">Get 10% off your first order by subscribing to our newsletter.</p>
              <form className="flex flex-col sm:flex-row gap-4">
                 <input 
                   type="email" 
                   placeholder="Enter your email" 
                   className="flex-grow bg-white/20 border-2 border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-indigo-200 focus:bg-white focus:text-slate-900 focus:outline-none transition-all"
                 />
                 <button className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-900 hover:text-white transition-all shadow-xl">
                   Join
                 </button>
              </form>
           </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
