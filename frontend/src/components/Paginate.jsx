import { Link } from 'react-router-dom';

export default function Paginate({ pages, page, isAdmin = false, keyword = '' }) {
  const getUrl = (p) => {
    if (!isAdmin) {
      return keyword ? `/search/${keyword}/page/${p}` : `/page/${p}`;
    } else {
      return `/admin/productlist/${p}`;
    }
  };

  return pages > 1 && (
    <div className="flex items-center gap-3 my-16 justify-center">
      {page > 1 && (
        <Link to={getUrl(page - 1)} className="p-3 rounded-xl glass hover:bg-slate-100 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </Link>
      )}
      
      {[...Array(pages).keys()].map(x => (
        <Link 
          key={x + 1} 
          to={getUrl(x + 1)} 
          className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold transition-all duration-300 ${x + 1 === page ? 'bg-slate-900 text-white shadow-xl scale-110' : 'glass text-slate-500 hover:bg-slate-100'}`}
        >
          {x + 1}
        </Link>
      ))}

      {page < pages && (
        <Link to={getUrl(page + 1)} className="p-3 rounded-xl glass hover:bg-slate-100 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </Link>
      )}
    </div>
  );
}
