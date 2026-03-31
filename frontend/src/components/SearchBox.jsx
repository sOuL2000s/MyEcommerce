import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) { navigate(`/search/${keyword}`); } else { navigate('/'); }
  };
  return (
    <form onSubmit={submitHandler} className='flex'>
      <input type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='Search Products...' className='p-2 rounded-l bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-full' />
      <button type='submit' className='bg-blue-600 p-2 rounded-r hover:bg-blue-700 transition'>Search</button>
    </form>
  );
};
export default SearchBox;
