import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';
const AdminRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  return user && user.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};
export default AdminRoute;
