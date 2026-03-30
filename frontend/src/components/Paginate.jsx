import { Link } from 'react-router-dom';
export default function Paginate({ pages, page, isAdmin = false }) {
  return pages > 1 && <div className="flex gap-2 my-4">
    {[...Array(pages).keys()].map(x => (
      <Link key={x + 1} to={isAdmin ? `/admin/productlist/${x+1}` : `/page/${x+1}`} className={`px-3 py-1 border rounded ${x+1 === page ? 'bg-blue-500 text-white' : ''}`}>{x+1}</Link>
    ))}
  </div>;
}
