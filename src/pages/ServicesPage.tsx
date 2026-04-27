import { Card } from '../components/ui/card';

const services = [
  { title: 'Learnership Candidate Sourcing', description: 'Delivering quality learners with the right skills and attitude for structured training programmes.' },
  { title: 'Graduate Recruitment Pipelines', description: 'Curating graduate talent pools for graduate programmes and early-career employer pipelines.' },
  { title: 'Early-Career Workforce Placement', description: 'Matching entry-level talent with roles that support development and retention.' },
  { title: 'Transformation-Aligned Hiring Support', description: 'Helping employers meet equity targets with compliant and ethical hiring strategies.' },
  { title: 'Leadership Talent Identification', description: 'Identifying high-potential future leaders for specialist and executive development tracks.' },
];

export function ServicesPage() {
  return (
    <div className="space-y-12 py-10 text-slate-100">
      <section className="glass-panel rounded-[2rem] border border-white/10 bg-slate-950/35 p-10 shadow-2xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.28em] text-orange-200">Services</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Strategic talent services for every stage of the workforce pipeline.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Our services are designed for employers seeking dependable learner, graduate and early-career recruitment that supports business growth and South African transformation priorities.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="p-8">
            <p className="text-sm uppercase tracking-[0.30em] text-orange-200">{service.title}</p>
            <p className="mt-4 text-slate-300 leading-7">{service.description}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
