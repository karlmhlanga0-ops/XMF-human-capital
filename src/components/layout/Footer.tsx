import { Link } from 'react-router-dom';
import logoWhite from '../../assets/XMF_LONG_ORANGE.png';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/95 px-6 py-16 text-slate-300 backdrop-blur-xl lg:px-8">
      <div className="mx-auto max-w-[1240px]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img 
                src={logoWhite} 
                alt="XMF Human Capital Partners" 
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-4 text-[#D76A36] font-semibold text-lg">Building Workforce Pipelines for the future.</p>
            <p className="text-sm leading-6 text-slate-400 max-w-sm">
              A premium South African talent partner connecting learners, graduates, and future leaders with employers who value investment in people.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white mb-4 block">Company</h3>
            <nav className="flex flex-col gap-4 text-sm">
              <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                Services
              </Link>
              <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* For Everyone */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white mb-4 block">Access</h3>
            <nav className="flex flex-col gap-4 text-sm">
              <Link to="/candidates" className="text-slate-400 hover:text-white transition-colors">
                For Candidates
              </Link>
              <Link to="/employers" className="text-slate-400 hover:text-white transition-colors">
                For Employers
              </Link>
              <a 
                href="mailto:info@xmfpartners.co.za" 
                className="text-slate-400 hover:text-white transition-colors"
              >
                Email Us
              </a>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* Bottom Footer */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} XMF Human Capital Partners. All rights reserved.
              </p>
              <span className="text-slate-500 text-sm">Developed by Octothorp Digital Solutions</span>
            </div>
            <div className="flex gap-6 text-xs text-slate-500">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
