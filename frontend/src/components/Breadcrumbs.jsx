import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Hide on homepage and specific auth pages for cleaner look
  if (pathnames.length === 0 || ['login', 'register'].includes(pathnames[0])) return null;

  return (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-3 px-6 py-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm">
        <li className="flex items-center">
          <Link to="/" className="text-slate-400 hover:text-indigo-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <li key={to} className="flex items-center space-x-3">
              <span className="text-slate-300">/</span>
              {last ? (
                <span className="text-sm font-black text-slate-900 uppercase tracking-tighter" aria-current="page">
                  {value.replace(/-/g, ' ')}
                </span>
              ) : (
                <Link to={to} className="text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-tighter">
                  {value.replace(/-/g, ' ')}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;