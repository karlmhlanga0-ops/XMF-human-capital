import { NavLink } from 'react-router-dom';
import logoWhite from '../../assets/XMF_LONG_WHITE.png';

const navigation = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'For Employers', to: '/employers' },
  { label: 'For Candidates', to: '/candidates' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0 transition-opacity hover:opacity-80">
          <img 
            src={logoWhite} 
            alt="XMF Human Capital Partners" 
            className="h-12 w-auto"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'text-brand-orange' 
                    : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex">
          <NavLink
            to="/candidates"
            className="px-6 py-2 rounded-lg bg-brand-orange text-white font-semibold text-sm hover:bg-[#c25a29] transition-colors"
          >
            Get Started
          </NavLink>
        </div>
      </div>
    </header>
  );
}
