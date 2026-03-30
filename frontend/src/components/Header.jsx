import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
const Header = () => {
  const { user, logout } = useAuth(); const { cartItems } = useCart(); const navigate = useNavigate();
  const logoutHandler = async () => { await logout(); navigate('/login'); };
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md"><nav className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">MERNShop</Link>
      <div className="flex gap-4 items-center">
        <Link to="/cart">Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</Link>
        {user ? (<div className="flex gap-4 items-center"><span>{user.name}</span><button onClick={logoutHandler} className="bg-red-500 px-3 py-1 rounded">Logout</button></div>) : (<Link to="/login">Login</Link>)}
      </div>
    </nav></header>
  );
};
export default Header;
