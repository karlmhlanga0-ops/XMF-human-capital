import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { BookOpen, Users, Award, GraduationCap, Target } from 'lucide-react';

const propsItems = [
  {
    title: 'Skills Development',
    description: 'Building talent pipelines that reinforce workplace skills and structured programme readiness.',
    icon: <BookOpen className="w-8 h-8 text-[#D76A36]" />,
  },
  {
    title: 'Employment Equity',
    description: 'Delivering transformation-aligned candidate sourcing that supports B-BBEE and equity ambitions.',
    icon: <Users className="w-8 h-8 text-[#D76A36]" />,
  },
  {
    title: 'Employer Confidence',
    description: 'Presenting ready-to-engage candidates with strong preparation, professionalism and potential.',
    icon: <Award className="w-8 h-8 text-[#D76A36]" />,
  },
];

export function HomePage() {
  return (
    <div className="space-y-0 w-full bg-slate-50">
      {/* Hero Section - Full Width, Left Aligned Content */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-slate-900">
        
        {/* CLOUDINARY SMART HACK APPLIED HERE */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{ backgroundImage: "url('https://res.cloudinary.com/didgosar5/image/upload/q_auto,f_auto/v1777628960/background-image_xgpygz.png')" }}
        ></div>

        {/* Premium Overlay Gradient */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#3E4CA0]/90 via-[#3E4CA0]/60 to-transparent"></div>

        {/* Hero Content */}
        <div className="relative z-30 w-full max-w-[1240px] mx-auto px-6 lg:px-8 pt-32 pb-24 lg:pt-0">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <p className="text-[#D76A36] font-semibold uppercase tracking-[0.3em] text-sm mb-6">
              Welcome to XMF
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 drop-shadow-md text-balance">
              Your Talent Pipeline Partner
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-xl leading-relaxed drop-shadow-sm">
              Connecting exceptional talent with forward-thinking organisations. Whether you're starting your career or building your team, we're here to bridge the gap.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/candidates">
                <Button className="w-full sm:w-auto bg-[#D76A36] hover:bg-[#c25a29] text-white font-semibold text-base px-8 py-6 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-[#D76A36]/20">
                  Register as a Candidate
                </Button>
              </Link>
              <Link to="/employers">
                <Button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm font-semibold text-base px-8 py-6 rounded-md transition-all duration-300">
                  Partner with Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion CTA */}
      <section className="py-20 bg-gradient-to-r from-[#f8f0e6] via-[#fff7ed] to-[#fff1d1] border-b border-slate-200">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D76A36]">Architect Your Talent Pipeline</p>
              <h2 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Get the advisory support that turns interest into conversions.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-slate-700">
                Book a strategy session with our team to align your employer brand, candidate funnel and compliance-ready placement process. This is the action point that drives real conversations.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link to="/advisory" className="inline-flex w-full sm:w-auto">
                  <Button className="w-full bg-[#D76A36] hover:bg-[#c25a29] text-white px-8 py-6 rounded-2xl shadow-xl shadow-[#D76A36]/20 transition-all duration-300">
                    Book Advisory Session
                  </Button>
                </Link>
                <Link to="/employers" className="inline-flex w-full sm:w-auto">
                  <Button className="w-full bg-slate-950 hover:bg-slate-800 text-white px-8 py-6 rounded-2xl border border-slate-900 transition-all duration-300">
                    Employer Partnership
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#FDE3CE] bg-white p-10 shadow-xl shadow-[#D76A36]/10">
              <p className="text-sm uppercase tracking-[0.25em] text-[#D76A36] font-semibold">Conversion Booster</p>
              <div className="mt-6 space-y-5">
                {[
                  'Clear advisory path for employers and candidates.',
                  'Fast connection to compliant talent pipelines.',
                  'High-touch follow-up for better submission-to-placement conversion.',
                ].map((item) => (
                  <div key={item} className="flex gap-4">
                    <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#F6C7A0] text-[#7A3A0F] font-semibold">✓</span>
                    <p className="text-base text-slate-700 leading-7">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-20 bg-[#1E254C]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-8">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D76A36]">Trusted Partners</p>
              <h2 className="mt-4 text-3xl font-semibold text-white leading-tight text-balance">
                Leading organisations trust XMF to build their talent pipelines.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-end lg:gap-6">
              {['Aurelia', 'Novum', 'Atlas', 'Harper'].map((brand) => (
                <div
                  key={brand}
                  className="flex h-14 w-32 items-center justify-center rounded-lg bg-white/5 backdrop-blur-md text-sm font-bold uppercase tracking-wider text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300 border border-white/5 cursor-default"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D76A36] mb-4">Why Choose XMF</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl leading-tight text-balance">
              Our commitment to excellence guides everything we do.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {propsItems.map((item, idx) => (
              <div 
                key={item.title} 
                className="group flex flex-col gap-6 p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="p-3 bg-slate-50 rounded-xl w-fit group-hover:bg-[#D76A36]/10 transition-colors duration-300">
                  {item.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-base leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D76A36] mb-4">Our Solutions</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl leading-tight text-balance">
              Specialized talent solutions for every organisational need.
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Learnership Card */}
            <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer">
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#3E4CA0] to-[#1E254C] flex items-center justify-center">
                <GraduationCap className="w-20 h-20 text-white/90 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D76A36] mb-3">Learnerships</p>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Pipeline-ready learner talent</h3>
                <p className="text-base leading-relaxed text-slate-600 mb-8 flex-1">
                  Practical placement support and candidate preparation for workplace learnership programmes at scale.
                </p>
                <Link to="/candidates" className="inline-flex items-center text-[#D76A36] font-semibold hover:text-[#3E4CA0] transition-colors group-hover:gap-2">
                  Learn more <span className="ml-1 transition-all duration-300 group-hover:ml-2">→</span>
                </Link>
              </div>
            </div>

            {/* Graduate Programme Card */}
            <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer">
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#D76A36] to-[#b35224] flex items-center justify-center">
                <Target className="w-20 h-20 text-white/90 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D76A36] mb-3">Graduate Programmes</p>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">High-impact graduate recruitment</h3>
                <p className="text-base leading-relaxed text-slate-600 mb-8 flex-1">
                  Curated graduate pipelines that deliver ambitious, workplace-ready talent into your early career programmes.
                </p>
                <Link to="/employers" className="inline-flex items-center text-[#D76A36] font-semibold hover:text-[#3E4CA0] transition-colors group-hover:gap-2">
                  Learn more <span className="ml-1 transition-all duration-300 group-hover:ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}