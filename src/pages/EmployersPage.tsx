import { useState } from 'react';
import { EmployerPartnershipForm } from '../components/forms/EmployerPartnershipForm';
import { EasyQuoteWidget } from '../components/EasyQuoteWidget';
import { Target, TrendingUp, Users, Award, Calculator, MessageSquare } from 'lucide-react';

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
  // State to manage which form is visible. Defaults to EasyQuote to push the business goal.
  const [activeForm, setActiveForm] = useState<'quote' | 'enquiry'>('quote');

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* Premium Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center overflow-hidden bg-slate-900">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('https://res.cloudinary.com/didgosar5/image/upload/q_auto,f_auto/v1777628914/alternate-background-image_lxnurb.png')" }}
        ></div>
        
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
      <section className="relative z-30 -mt-16 mx-auto max-w-[1240px] px-6 lg:px-8 mb-24">
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

      {/* Dynamic Action Center */}
      <section className="pb-32 max-w-[1240px] mx-auto px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[400px_1fr] items-start">
          
          {/* Left Column: Sticky Explainer & Controls */}
          <div className="lg:sticky lg:top-32 space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40">
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-[#1E254C] leading-tight">
                Take the next step with XMF.
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Use our proprietary <strong className="text-[#D76A36]">EasyQuote™</strong> engine to generate an instant, official cost estimate for your talent pipeline needs. 
              </p>
              <p className="text-slate-600 leading-relaxed">
                Alternatively, submit a general enquiry and our team will build a bespoke partnership proposal.
              </p>
            </div>

            {/* AODA Compliant Form Toggle */}
            <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveForm('quote')}
                className={`flex items-center gap-4 px-6 py-4 rounded-xl text-left font-bold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#D76A36]/30 ${
                  activeForm === 'quote' 
                    ? 'bg-[#D76A36] text-white shadow-lg shadow-[#D76A36]/20 border border-[#D76A36]' 
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
                aria-pressed={activeForm === 'quote'}
              >
                <div className={`p-2 rounded-lg ${activeForm === 'quote' ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm uppercase tracking-wider opacity-80 mb-0.5">Recommended</span>
                  <span className="block text-lg">Generate Official Quote</span>
                </div>
              </button>

              <button
                onClick={() => setActiveForm('enquiry')}
                className={`flex items-center gap-4 px-6 py-4 rounded-xl text-left font-bold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#1E254C]/30 ${
                  activeForm === 'enquiry' 
                    ? 'bg-[#1E254C] text-white shadow-lg border border-[#1E254C]' 
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
                aria-pressed={activeForm === 'enquiry'}
              >
                <div className={`p-2 rounded-lg ${activeForm === 'enquiry' ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="block text-lg">Submit General Enquiry</span>
              </button>
            </div>
            
          </div>

          {/* Right Column: Dynamic Component Rendering */}
          <div className="w-full relative min-h-[600px] animate-in fade-in slide-in-from-right-4 duration-500" key={activeForm}>
            {activeForm === 'quote' ? (
              <EasyQuoteWidget />
            ) : (
              <EmployerPartnershipForm />
            )}
          </div>

        </div>
      </section>

    </div>
  );
}