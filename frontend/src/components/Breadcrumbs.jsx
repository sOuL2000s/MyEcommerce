import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex text-gray-500 text-sm mb-6" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return last ? (
            <li key={to} className="text-gray-800 font-medium capitalize" aria-current="page">
              {value.replace(/-/g, ' ')}
            </li>
          ) : (
            <li key={to} className="flex items-center">
              <Link to={to} className="hover:text-blue-600 capitalize">
                {value.replace(/-/g, ' ')}
              </Link>
              <span className="mx-2">/</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;