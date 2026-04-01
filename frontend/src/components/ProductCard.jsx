import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToWishlist, wishlistItems } = useWishlist();
  const { addToCart } = useCart();
  const isInWishlist = wishlistItems.some(item => item._id === product._id);

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
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition relative group flex flex-col h-full">
      <button 
        onClick={() => addToWishlist(product)}
        className={`absolute top-6 right-6 z-10 p-2 rounded-full shadow transition ${isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100'}`}
        title="Add to Wishlist"
      >
        ❤
      </button>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} className="w-full h-48 object-cover rounded" alt={product.name} />
      </Link>
      <div className="mt-2 flex-grow">
        <Link to={`/product/${product._id}`} className="font-bold text-lg truncate block hover:text-blue-600 transition">
          {product.name}
        </Link>
        <div className="text-gray-500 text-sm mb-1">{product.category}</div>
        <div className="text-indigo-600 font-bold text-xl">${product.price}</div>
      </div>
      <button 
        onClick={handleQuickAdd}
        disabled={product.countInStock === 0}
        className={`mt-4 w-full py-2 rounded text-sm font-bold transition flex items-center justify-center gap-2 ${product.countInStock > 0 ? 'bg-gray-800 text-white hover:bg-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
      >
        <span>{product.countInStock > 0 ? 'Quick Add' : 'Out of Stock'}</span>
        {product.countInStock > 0 && <span className="text-lg">+</span>}
      </button>
    </div>
  );
};
export default ProductCard;
