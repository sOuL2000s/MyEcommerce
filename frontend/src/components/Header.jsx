import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import SearchBox from './SearchBox';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const logoutHandler = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center flex-wrap gap-4">
        <Link to="/" className="text-2xl font-bold">MERNShop</Link>
        
        <div className="flex-grow max-w-md mx-4">
          <SearchBox />
        </div>

        <div className="flex gap-6 items-center">
          <Link to="/cart" className="hover:text-gray-300">
            Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
          </Link>

          {user ? (
            <div className="flex gap-4 items-center relative">
              <span className="font-medium">{user.name}</span>
              
              {user.isAdmin && (
                <div className="relative">
                  <button 
                    onClick={() => setShowAdminMenu(!showAdminMenu)}
                    className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
                  >
                    Admin ▼
                  </button>
                  {showAdminMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg py-2 z-50">
                      <Link to="/admin/productlist" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowAdminMenu(false)}>Products</Link>
                      <Link to="/admin/orderlist" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowAdminMenu(false)}>Orders</Link>
                      <Link to="/admin/userlist" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowAdminMenu(false)}>Users</Link>
                    </div>
                  )}
                </div>
              )}

              <button onClick={logoutHandler} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
