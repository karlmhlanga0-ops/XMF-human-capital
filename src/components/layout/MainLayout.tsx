import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-brand-gradient text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-[1240px] px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
