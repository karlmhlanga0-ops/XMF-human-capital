import { Target, Users, ShieldCheck, HeartHandshake, Zap, BarChart } from 'lucide-react';

// You can use a specific about background image here if you have one, 
// otherwise we can rely on the stunning CSS gradients for this page.
// import aboutBackground from '../assets/backgrounds/about-background.png'; 

const values = [
  { 
    title: 'Authentic Partnerships', 
    content: 'We build trust with organisations who need dependable talent for long-term programme success.',
    icon: <HeartHandshake className="w-6 h-6 text-[#3E4CA0]" />
  },
  { 
    title: 'Comprehensive Support', 
    content: 'From application guidance to opportunity matching, candidates benefit from a premium experience.',
    icon: <Users className="w-6 h-6 text-[#3E4CA0]" />
  },
  { 
    title: 'Transformation Outcomes', 
    content: 'We support B-BBEE and skills development priorities through aligned talent acquisition.',
    icon: <Target className="w-6 h-6 text-[#3E4CA0]" />
  },
];

export function AboutPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* Premium Hero Section with Orange Flare */}
      <section className="relative w-full min-h-[60vh] flex items-center overflow-hidden bg-[#1E254C] py-24">
        {/* Abstract Orange & Blue Light Bleed */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#3E4CA0] rounded-full blur-[120px] opacity-40 pointer-events-none -translate-x-1/2 -translate-y-1/4"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D76A36] rounded-full blur-[140px] opacity-40 pointer-events-none translate-x-1/4 translate-y-1/4"></div>
        
        {/* Optional: Add background image here if you prefer */}
        {/* <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay"
          style={{ backgroundImage: `url(${aboutBackground})` }}
        ></div> */}

        <div className="relative z-20 w-full max-w-[1240px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <p className="text-[#D76A36] font-bold uppercase tracking-[0.2em] text-sm mb-4 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              About Us
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-8">
              Specialist talent pipeline partner for South Africa’s future.
            </h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
              XMF Human Capital Partners crafts premium recruitment pathways for learners, graduates and emerging talent. We deliver high-integrity sourcing, employer alignment and skills development support with a bold, modern approach.
            </p>
          </div>
        </div>
      </section>

      {/* Two Column Feature Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            
            {/* Left Column */}
            <div className="group bg-slate-50 rounded-[2rem] p-10 md:p-12 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3E4CA0]/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mb-8 shadow-sm text-[#3E4CA0] group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D76A36] mb-3">Our Role</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                From candidate discovery to employer readiness.
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                We manage the candidate journey end-to-end, from sourcing and screening to preparing learners and graduates for structured programmes. Our team works with employers to build pipelines that are scalable, compliant and aligned to transformation goals.
              </p>
            </div>

            {/* Right Column */}
            <div className="group bg-[#3E4CA0] rounded-[2rem] p-10 md:p-12 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#D76A36]/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-8 text-white group-hover:scale-110 transition-transform duration-500">
                <Zap className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D76A36] mb-3">How We Work</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Data-driven sourcing with an African human touch.
              </h2>
              <p className="text-slate-200 leading-relaxed text-lg">
                We combine deep local market knowledge with smooth, candidate-centered onboarding. This ensures our talent pipelines deliver dependable outcomes for employers, while creating meaningful opportunities for learners and emerging professionals.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D76A36] mb-4">Core Values</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Built on integrity, driven by outcomes.
            </h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((item, idx) => (
              <div 
                key={item.title} 
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="bg-slate-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-[#3E4CA0]/10">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}