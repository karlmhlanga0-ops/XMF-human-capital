import { MapPin, Phone, Mail, Globe } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* Premium Hero Section with Orange Flare */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center overflow-hidden bg-[#1E254C]">
        {/* Abstract Orange Light Bleed */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D76A36] rounded-full blur-[140px] opacity-50 pointer-events-none"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-[#1E254C]/80"></div>

        <div className="relative z-20 w-full max-w-[1240px] mx-auto px-6 lg:px-8 pt-10">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 text-center mx-auto">
            <p className="text-[#D76A36] font-bold uppercase tracking-[0.2em] text-sm mb-4">
              Get in Touch
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Contact XMF Human Capital Partners.
            </h1>
            <p className="text-lg text-slate-200 leading-relaxed max-w-xl mx-auto">
              Connect with our team for candidate registration, employer partnerships, or to learn more about our talent pipeline services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="relative z-30 -mt-16 mx-auto max-w-[1240px] px-6 lg:px-8 mb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Location Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-all duration-300">
            <div className="bg-slate-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-[#D76A36]">
              <MapPin className="w-7 h-7" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3E4CA0] mb-2">Location</p>
            <h3 className="text-lg font-bold text-slate-900">Midrand</h3>
            <p className="text-slate-600 text-sm mt-1">South Africa</p>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-all duration-300">
            <div className="bg-slate-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-[#D76A36]">
              <Phone className="w-7 h-7" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3E4CA0] mb-2">Phone</p>
            <a href="tel:0609915131" className="text-lg font-bold text-slate-900 hover:text-[#D76A36] transition-colors">
              060 991 5131
            </a>
            <p className="text-slate-600 text-sm mt-1">Mon-Fri, 8am-5pm</p>
          </div>

          {/* Domain Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-all duration-300">
            <div className="bg-slate-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-[#D76A36]">
              <Globe className="w-7 h-7" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3E4CA0] mb-2">Website</p>
            <a href="https://www.xmfhcp.co.za" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-slate-900 hover:text-[#D76A36] transition-colors">
              xmfhcp.co.za
            </a>
            <p className="text-slate-600 text-sm mt-1">Official Domain</p>
          </div>

          {/* Emails Card (Spans across nicely if needed, or fits in standard grid) */}
          <div className="bg-white rounded-xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-all duration-300 md:col-span-2 lg:col-span-1">
            <div className="bg-slate-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-[#D76A36]">
              <Mail className="w-7 h-7" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3E4CA0] mb-3">Emails</p>
            <div className="space-y-3">
              <a href="mailto:info@xmfhcp.co.za" className="block text-sm font-semibold text-slate-900 hover:text-[#D76A36] transition-colors">
                info@xmfhcp.co.za <span className="text-slate-500 font-normal ml-1">(General)</span>
              </a>
              <a href="mailto:candidates@xmfhcp.co.za" className="block text-sm font-semibold text-slate-900 hover:text-[#D76A36] transition-colors">
                candidates@xmfhcp.co.za
              </a>
              <a href="mailto:partnerships@xmfhcp.co.za" className="block text-sm font-semibold text-slate-900 hover:text-[#D76A36] transition-colors">
                partnerships@xmfhcp.co.za
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}