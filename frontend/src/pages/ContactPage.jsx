import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-bold mb-2">Our Office</h3>
          <p className="text-gray-600">123 Tech Avenue, Silicon Valley</p>
          <p className="text-gray-600">California, USA</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-bold mb-2">Customer Support</h3>
          <p className="text-gray-600">Email: support@mernshop.com</p>
          <p className="text-gray-600">Phone: +1 (555) 000-1234</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            required 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            className="w-full p-2 border rounded" 
            required 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea 
            className="w-full p-2 border rounded h-32" 
            required
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
