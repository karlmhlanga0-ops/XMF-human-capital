import { CandidateRegistrationForm } from '../components/forms/CandidateRegistrationForm';
import { BookOpen, GraduationCap, Briefcase, TrendingUp } from 'lucide-react';
// 1. IMPORT THE IMAGE HERE (Adjust the '../' depending on exactly where this file lives in your folder structure)
import heroBackground from '../assets/backgrounds/partners-background.png';
const opportunities = [
  { 
    title: 'Learnerships', 
    description: 'Structured training programmes designed to grow skills and open new career pathways.',
    icon: <BookOpen className="w-8 h-8 text-[#D76A36]" />
  },
  { 
    title: 'Graduate Programmes', 
    description: 'Cohort-based roles for graduates ready to join talent pipelines and fast-track development.',
    icon: <GraduationCap className="w-8 h-8 text-[#D76A36]" />
  },
  { 
    title: 'Internships', 
    description: 'Hands-on placements across corporate, tech and operational teams to build workplace experience.',
    icon: <Briefcase className="w-8 h-8 text-[#D76A36]" />
  },
  { 
    title: 'Entry-Level Roles', 
    description: 'Early career positions for candidates ready to contribute and grow in stable organisations.',
    icon: <TrendingUp className="w-8 h-8 text-[#D76A36]" />
  },
];

export function CandidatesPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* Premium Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center overflow-hidden bg-slate-900">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{ backgroundImage: "url('/src/assets/backgrounds/partners-background.png')" }}
        ></div>
        
        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#1E254C]/95 via-[#1E254C]/70 to-transparent"></div>

        <div className="relative z-20 w-full max-w-[1240px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <p className="text-[#D76A36] font-bold uppercase tracking-[0.2em] text-sm mb-4">
              For Candidates
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Launch your career with leading employers.
            </h1>
            <p className="text-lg text-slate-200 leading-relaxed max-w-xl">
              Register your profile to access learnerships, graduate programmes, internships, and entry-level roles across South Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="relative z-30 -mt-16 mx-auto max-w-[1240px] px-6 lg:px-8 mb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {opportunities.map((item, idx) => (
            <div 
              key={item.title} 
              className="bg-white rounded-xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="bg-slate-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-[#D76A36]/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="pb-24 max-w-[1240px] mx-auto px-6 lg:px-8">
        <CandidateRegistrationForm />
      </section>
    </div>
  );
}