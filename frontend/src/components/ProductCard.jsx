import { Link } from 'react-router-dom';
const ProductCard = ({ product }) => (
  <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
    <Link to={`/product/${product._id}`}><img src={product.image} className="w-full h-48 object-cover rounded" alt={product.name} /></Link>
    <div className="mt-2 font-bold text-lg">{product.name}</div>
    <div className="text-gray-600">${product.price}</div>
  </div>
);
export default ProductCard;
