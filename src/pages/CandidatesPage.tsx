import { CandidateRegistrationForm } from '../components/forms/CandidateRegistrationForm';
import { Card } from '../components/ui/card';

const opportunities = [
  { title: 'Learnerships', description: 'Structured training programmes designed to grow skills and open new career pathways.' },
  { title: 'Graduate Programmes', description: 'Cohort-based roles for graduates ready to join talent pipelines and fast-track development.' },
  { title: 'Internships', description: 'Hands-on placements across corporate, tech and operational teams to build workplace experience.' },
  { title: 'Entry-Level Roles', description: 'Early career positions for candidates ready to contribute and grow in stable organisations.' },
];

export function CandidatesPage() {
  return (
    <div className="space-y-12 py-10 text-slate-100">
      <section className="glass-panel rounded-[2rem] border border-white/10 bg-slate-950/35 p-10 shadow-2xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.28em] text-orange-200">Candidates</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Opportunities for learners, graduates and emerging professionals.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Register your profile to access learnerships, graduate programmes, internships and entry-level roles with leading South African employers.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {opportunities.map((item) => (
          <Card key={item.title} className="p-6">
            <p className="text-sm uppercase tracking-[0.30em] text-orange-200">{item.title}</p>
            <p className="mt-4 text-slate-300 leading-7">{item.description}</p>
          </Card>
        ))}
      </section>

      <div className="rounded-[2rem] border border-white/10 bg-slate-950/35 p-8 shadow-2xl shadow-black/20">
        <CandidateRegistrationForm />
      </div>
    </div>
  );
}
