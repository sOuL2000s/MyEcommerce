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
    <div className="flex gap-2 my-8 justify-center">
      {[...Array(pages).keys()].map(x => (
        <Link 
          key={x + 1} 
          to={getUrl(x + 1)} 
          className={`px-4 py-2 border rounded transition ${x + 1 === page ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-100'}`}
        >
          {x + 1}
        </Link>
      ))}
    </div>
  );
}
