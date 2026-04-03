import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToWishlist, wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isInWishlist = wishlistItems.some(item => item._id === product._id);

  const handleWishlist = (e) => {
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(product._id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (product.countInStock > 0) {
      addToCart(product, 1);
      toast.success(`${product.name} added to cart`);
    } else {
      toast.error('Product out of stock');
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col h-full relative">
      {/* Wishlist Button */}
      <button 
        onClick={handleWishlist}
        className={`absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg ${
          isInWishlist 
          ? 'bg-red-500 text-white scale-110' 
          : 'bg-white/90 text-slate-400 hover:text-red-500 hover:scale-110 opacity-0 group-hover:opacity-100'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isInWishlist ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Sale Badge */}
      {product.salePrice && product.price > product.salePrice && (
        <div className="absolute top-4 left-4 z-20 bg-amber-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-tighter shadow-lg">
          SAVE {Math.round((1 - product.salePrice / product.price) * 100)}%
        </div>
      )}

      {/* Image Container */}
      <Link to={`/product/${product._id}`} className="block relative aspect-square overflow-hidden bg-slate-50">
        <img 
          src={product.image} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          alt={product.name} 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-1">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
            ★ {product.rating || 0}
          </div>
        </div>

        <Link to={`/product/${product._id}`} className="text-slate-800 font-bold text-base leading-tight mb-3 line-clamp-2 hover:text-indigo-600 transition-colors">
          {product.name}
        </Link>

        <div className="mt-auto flex items-end justify-between gap-4">
          <div className="flex flex-col">
            {product.salePrice ? (
              <>
                <span className="text-slate-400 text-xs line-through font-medium">${product.price.toFixed(2)}</span>
                <span className="text-indigo-600 font-black text-xl leading-none">${product.salePrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-indigo-600 font-black text-xl leading-none">${product.price.toFixed(2)}</span>
            )}
          </div>

          <button 
            onClick={handleQuickAdd}
            disabled={product.countInStock === 0}
            className={`p-3 rounded-xl transition-all duration-300 ${
              product.countInStock > 0 
              ? 'bg-slate-900 text-white hover:bg-indigo-600 shadow-lg shadow-slate-200' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
            title="Add to Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
