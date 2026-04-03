import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Breadcrumbs from './components/Breadcrumbs.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
      <Header />
      <main className="flex-grow pt-8 pb-20">
        <div className="container mx-auto px-4">
          <Breadcrumbs />
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default App;
