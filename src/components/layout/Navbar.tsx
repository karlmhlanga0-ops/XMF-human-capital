import { NavLink } from 'react-router-dom';

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Employers', to: '/employers' },
  { label: 'Candidates', to: '/candidates' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div>
          <NavLink to="/" className="text-lg font-semibold tracking-[0.15em] text-white/90 uppercase">
            XMF Human Capital Partners
          </NavLink>
          <p className="mt-0.5 text-xs uppercase tracking-[0.25em] text-orange-200/90">Talent pipeline partner</p>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
