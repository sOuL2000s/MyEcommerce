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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    await logout();
    navigate('/login');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="sticky top-0 z-50 glass shadow-sm border-b border-slate-200">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center gap-4">
          <Link to="/" className="text-2xl font-black tracking-tighter text-indigo-600 hover:opacity-80 transition-opacity">
            MERN<span className="text-slate-900">SHOP</span>
          </Link>
          
          <div className="hidden md:block flex-grow max-w-xl mx-8">
            <SearchBox />
          </div>

          <div className="hidden md:flex gap-6 items-center">
            <Link to="/wishlist" className="relative group text-slate-600 hover:text-indigo-600 transition-colors">
              <span className="font-medium text-sm uppercase tracking-wider">Wishlist</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </Link>
            
            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex gap-4 items-center relative">
                <div className="relative group">
                   <button className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                     {user.name}
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                   </button>
                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-[60]">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600">Profile</Link>
                      {user.isAdmin && (
                        <>
                          <div className="h-px bg-slate-100 my-1 mx-2"></div>
                          <Link to="/admin/productlist" className="block px-4 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50">Admin Products</Link>
                          <Link to="/admin/orderlist" className="block px-4 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50">Admin Orders</Link>
                        </>
                      )}
                      <div className="h-px bg-slate-100 my-1 mx-2"></div>
                      <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-medium">Logout</button>
                   </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn-primary py-2 text-sm">Sign In</Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[500px] opacity-100 py-4 border-t border-slate-100' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-6">
            <SearchBox />
            <div className="flex flex-col gap-4 font-bold text-slate-600 uppercase tracking-widest text-xs px-2">
              <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-600 transition-colors">Wishlist</Link>
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-600 transition-colors flex justify-between">
                <span>Cart</span>
                <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-[10px]">{cartCount}</span>
              </Link>
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-600 transition-colors">Profile</Link>
                  {user.isAdmin && (
                    <>
                      <Link to="/admin/productlist" onClick={() => setIsMobileMenuOpen(false)} className="text-indigo-600">Admin Products</Link>
                      <Link to="/admin/orderlist" onClick={() => setIsMobileMenuOpen(false)} className="text-indigo-600">Admin Orders</Link>
                    </>
                  )}
                  <button onClick={() => { logoutHandler(); setIsMobileMenuOpen(false); }} className="text-left text-red-500">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary text-center py-3">Sign In</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
