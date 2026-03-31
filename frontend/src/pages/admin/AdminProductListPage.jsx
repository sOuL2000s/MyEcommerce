import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';

export default function AdminProductListPage() {
  const { pageNumber = 1 } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get(`/api/products?pageNumber=${pageNumber}`);
      setProducts(data.products);
      setPages(data.pages);
      setPage(data.page);
      setLoading(false);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNumber]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/api/products/${id}`);
        toast.success('Product deleted');
        fetchProducts();
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        const { data } = await api.post('/api/products');
        navigate(`/admin/product/${data._id}/edit`);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button onClick={createProductHandler} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition">+ Create Product</button>
      </div>
      {loading ? <Loader /> : (
        <>
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">NAME</th>
                  <th className="p-4 font-semibold">PRICE</th>
                  <th className="p-4 font-semibold">CATEGORY</th>
                  <th className="p-4 font-semibold">BRAND</th>
                  <th className="p-4 font-semibold">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-sm text-gray-500">{product._id}</td>
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4 font-bold">${product.price}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">{product.brand}</td>
                    <td className="p-4 flex gap-4">
                      <Link to={`/admin/product/${product._id}/edit`} className="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition">Edit</Link>
                      <button onClick={() => deleteHandler(product._id)} className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </div>
  );
}
