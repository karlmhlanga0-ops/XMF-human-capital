import { EmployerPartnershipForm } from '../components/forms/EmployerPartnershipForm';
import { EasyQuoteWidget } from '../components/EasyQuoteWidget';
import { Target, TrendingUp, Users, Award } from 'lucide-react';

const benefits = [
  { 
    title: 'Structured learning outcomes', 
    description: 'Our employer partnerships help you place candidates in programmes that strengthen skills pipelines and support long-term staff development.',
    icon: <TrendingUp className="w-8 h-8 text-[#3E4CA0]" />
  },
  { 
    title: 'Transformation-ready hires', 
    description: 'We support transformation-aligned hiring by identifying talent who contribute to B-BBEE objectives without compromising quality.',
    icon: <Target className="w-8 h-8 text-[#3E4CA0]" />
  },
  { 
    title: 'Pipeline Readiness', 
    description: 'Candidates arrive with the necessary workplace skills and professional etiquette to contribute immediately to your teams.',
    icon: <Users className="w-8 h-8 text-[#3E4CA0]" />
  },
  { 
    title: 'High Retention', 
    description: 'By rigorously matching candidates to your specific corporate culture and role expectations, we significantly improve retention metrics.',
    icon: <Award className="w-8 h-8 text-[#3E4CA0]" />
  },
];

export function EmployersPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* Premium Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center overflow-hidden bg-slate-900">
        
        {/* CLOUDINARY SMART HACK APPLIED HERE */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('https://res.cloudinary.com/didgosar5/image/upload/q_auto,f_auto/v1777628914/alternate-background-image_lxnurb.png')" }}
        ></div>
        
        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#1E254C]/95 via-[#1E254C]/70 to-transparent"></div>

        <div className="relative z-20 w-full max-w-[1240px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <p className="text-[#D76A36] font-bold uppercase tracking-[0.2em] text-sm mb-4 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
              For Employers
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance">
              Value-driven sourcing for skills and equity.
            </h1>
            <p className="text-lg text-slate-200 leading-relaxed max-w-xl">
              Employers partnering with XMF get access to high-quality talent aligned to Skills Development, Employment Equity, and future leadership needs.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="relative z-30 -mt-16 mx-auto max-w-[1240px] px-6 lg:px-8 mb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, idx) => (
            <div 
              key={item.title} 
              className="bg-white rounded-xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="bg-slate-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-[#3E4CA0]/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Form & EasyQuote Section */}
      <section className="pb-24 max-w-[1240px] mx-auto px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <EasyQuoteWidget />
          <EmployerPartnershipForm />
        </div>
      </section>
    </div>
  );
}