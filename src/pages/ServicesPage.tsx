import { BookOpen, GraduationCap, Briefcase, Target, Award } from 'lucide-react';

const services = [
  { 
    title: 'Learnership Candidate Sourcing', 
    description: 'Delivering quality learners with the right skills and attitude for structured training programmes.',
    icon: <BookOpen className="w-8 h-8 text-[#D76A36]" />
  },
  { 
    title: 'Graduate Recruitment Pipelines', 
    description: 'Curating graduate talent pools for graduate programmes and early-career employer pipelines.',
    icon: <GraduationCap className="w-8 h-8 text-[#D76A36]" />
  },
  { 
    title: 'Early-Career Workforce Placement', 
    description: 'Matching entry-level talent with roles that support development and retention.',
    icon: <Briefcase className="w-8 h-8 text-[#D76A36]" />
  },
  { 
    title: 'Transformation-Aligned Hiring', 
    description: 'Helping employers meet equity targets with compliant and ethical hiring strategies.',
    icon: <Target className="w-8 h-8 text-[#D76A36]" />
  },
  { 
    title: 'Leadership Talent Identification', 
    description: 'Identifying high-potential future leaders for specialist and executive development tracks.',
    icon: <Award className="w-8 h-8 text-[#D76A36]" />
  },
];

export function ServicesPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* Premium Hero Section with Orange Flare */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center overflow-hidden bg-[#1E254C]">
        {/* Abstract Orange Light Bleed */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#D76A36] rounded-full blur-[120px] opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-t from-[#1E254C] to-transparent z-0"></div>

        <div className="relative z-20 w-full max-w-[1240px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <p className="text-[#D76A36] font-bold uppercase tracking-[0.2em] text-sm mb-4 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              Our Services
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Strategic talent services for every stage.
            </h1>
            <p className="text-lg text-slate-200 leading-relaxed max-w-xl">
              Designed for employers seeking dependable learner, graduate and early-career recruitment that supports business growth and South African transformation priorities.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-30 -mt-16 mx-auto max-w-[1240px] px-6 lg:px-8 mb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <div 
              key={service.title} 
              className={`bg-white rounded-xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group ${idx === 3 ? 'lg:col-start-1 lg:col-span-1' : ''} ${idx === 4 ? 'lg:col-start-2 lg:col-span-1' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="bg-slate-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-[#D76A36]/10">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}