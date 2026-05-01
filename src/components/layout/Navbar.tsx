import { NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import logoWhite from '../../assets/XMF_LONG_WHITE.png';

const navigation = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'For Employers', to: '/employers' },
  { label: 'For Candidates', to: '/candidates' },
  { label: 'Contact Us', to: '/contact' },
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

        {/* CTA Dropdown */}
        <div className="hidden lg:flex">
          <div className="relative inline-flex group">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-[#D76A36] text-white font-semibold text-sm hover:bg-[#c25a29] transition-colors"
            >
              Get Started
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible opacity-0 pointer-events-none absolute right-0 mt-3 w-64 rounded-[2rem] border border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto">
              <NavLink
                to="/candidates"
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
              >
                Register as Candidate
              </NavLink>
              <NavLink
                to="/employers"
                className="mt-2 block rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
              >
                Generate a Quote
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
