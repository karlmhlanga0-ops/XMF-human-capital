import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/75 px-4 py-10 text-slate-300 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">XMF Human Capital Partners</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
            A premium South African talent partner connecting learnerships, graduates, and future leaders with employers.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
          <Link to="/" className="transition hover:text-white">
            Home
          </Link>
          <Link to="/contact" className="transition hover:text-white">
            Contact
          </Link>
          <a href="mailto:info@xmfpartners.co.za" className="transition hover:text-white">
            info@xmfpartners.co.za
          </a>
        </div>
      </div>
    </footer>
  );
}
