import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import Message from '../components/Message';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <Message>
          Your wishlist is empty <Link to="/" className="text-blue-600 hover:underline">Go Shopping</Link>
        </Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div key={product._id} className="relative">
              <button 
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow hover:text-red-500"
              >
                ✕
              </button>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;