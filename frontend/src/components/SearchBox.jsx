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
    <form onSubmit={submitHandler} className="relative group w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input 
        type="text" 
        name="q" 
        onChange={(e) => setKeyword(e.target.value)} 
        placeholder="Search for magic..." 
        className="block w-full pl-10 pr-3 py-2.5 bg-slate-100 border-none rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300" 
      />
      <button 
        type="submit" 
        className="absolute inset-y-1.5 right-1.5 bg-indigo-600 text-white px-4 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors uppercase"
      >
        GO
      </button>
    </form>
  );
};
export default SearchBox;
