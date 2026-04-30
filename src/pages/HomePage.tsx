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
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{ backgroundImage: "url('/src/assets/backgrounds/background-image.png')" }}
        ></div>

        {/* Premium Overlay Gradient */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#3E4CA0]/90 via-[#3E4CA0]/60 to-transparent"></div>

        {/* Hero Content */}
        <div className="relative z-30 w-full max-w-[1240px] mx-auto px-6 lg:px-8 pt-32 pb-24 lg:pt-0">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <p className="text-[#D76A36] font-semibold uppercase tracking-[0.3em] text-sm mb-6">
              Welcome to XMF
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 drop-shadow-md">
              Your Talent Pipeline Partner
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-xl leading-relaxed drop-shadow-sm">
              Connecting exceptional talent with forward-thinking organisations. Whether you're starting your career or building your team, we're here to bridge the gap.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/candidates">
                <Button className="w-full sm:w-auto bg-[#D76A36] hover:bg-[#c25a29] text-white font-semibold text-base px-8 py-6 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-[#D76A36]/20">
                  I'm a Candidate
                </Button>
              </Link>
              <Link to="/employers">
                <Button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm font-semibold text-base px-8 py-6 rounded-md transition-all duration-300">
                  I'm Looking to Partner
                </Button>
              </Link>
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
              <h2 className="mt-4 text-3xl font-semibold text-white leading-tight">
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
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
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
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
              Specialized talent solutions for every organisational need.
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Learnership Card */}
            <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer">
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#3E4CA0] to-[#273273] flex items-center justify-center">
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

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-[#3E4CA0] py-24">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] rounded-full bg-[#D76A36]/20 blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 mx-auto max-w-[1240px] px-6 lg:px-8 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70 mb-4">Ready to get started?</p>
            <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              Join XMF and unlock premium talent pipelines.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-white/80 leading-relaxed">
              Whether you are an employer seeking future leaders or a candidate ready for your next opportunity, we're here to connect you with the right opportunities and talent.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 whitespace-nowrap lg:shrink-0">
            <Link to="/candidates">
              <Button className="w-full sm:w-auto bg-[#D76A36] hover:bg-[#c25a29] text-white font-semibold px-8 py-6 rounded-md shadow-lg transition-all duration-300">
                Candidate Register
              </Button>
            </Link>
            <Link to="/employers">
              <Button className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border-2 border-white/30 font-semibold px-8 py-6 rounded-md transition-all duration-300">
                Employer Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}