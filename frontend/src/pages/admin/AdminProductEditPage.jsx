import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';
import Loader from '../../components/Loader';

export default function AdminProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [images, setImages] = useState(''); // Textarea comma separated
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/api/products/${id}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setImages(data.images?.join(', ') || '');
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
        setIsFeatured(data.isFeatured || false);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await api.post('/api/upload', formData, config);
      setImage(data.image);
      toast.success(data.message);
      setUploading(false);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const imagesArray = images.split(',').map(img => img.trim()).filter(img => img !== '');
      await api.put(`/api/products/${id}`, { 
        name, price, image, images: imagesArray, brand, category, countInStock, description, isFeatured 
      });
      toast.success('Product updated');
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/admin/productlist" className="bg-gray-200 px-4 py-2 rounded mb-6 inline-block hover:bg-gray-300">Go Back</Link>
      <form onSubmit={submitHandler} className="bg-white p-8 rounded shadow space-y-4">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        {loading ? <Loader /> : (
          <>
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-blue-500" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Price</label>
              <input type="number" className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-blue-500" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Main Image URL</label>
              <input className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-blue-500 mb-2" value={image} onChange={e => setImage(e.target.value)} />
              <input type="file" onChange={uploadFileHandler} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4" />
              {uploading && <Loader />}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Gallery Images (comma separated URLs)</label>
              <textarea className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-blue-500" value={images} onChange={e => setImages(e.target.value)} rows="3" />
            </div>
            <div className="flex items-center gap-2 py-2">
               <input type="checkbox" id="isFeatured" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} />
               <label htmlFor="isFeatured" className="text-gray-700">Featured Product</label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Brand</label>
                <input className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-blue-500" value={brand} onChange={e => setBrand(e.target.value)} />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Category</label>
                <input className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-blue-500" value={category} onChange={e => setCategory(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Count In Stock</label>
              <input type="number" className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-blue-500" value={countInStock} onChange={e => setCountInStock(e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea className="w-full p-2 border rounded h-32 outline-none focus:ring-1 focus:ring-blue-500" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition">Update Product</button>
          </>
        )}
      </form>
    </div>
  );
}
