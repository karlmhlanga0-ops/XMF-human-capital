import { EmployerPartnershipForm } from '../components/forms/EmployerPartnershipForm';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

export function EmployersPage() {
  return (
    <div className="space-y-12 py-10 text-slate-100">
      <section className="glass-panel rounded-[2rem] border border-white/10 bg-slate-950/35 p-10 shadow-2xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.28em] text-orange-200">Employers</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Value-driven candidate sourcing for skills development and equity.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Employers partnering with XMF get access to high-quality talent aligned to Skills Development, Employment Equity and future leadership needs.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <Card className="p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-orange-200">Skills Development</p>
          <h2 className="mt-4 text-2xl font-semibold text-white">Structured learning outcomes</h2>
          <p className="mt-4 text-slate-300 leading-7">
            Our employer partnerships help you place candidates in programmes that strengthen skills pipelines and support long-term staff development.
          </p>
        </Card>

        <Card className="p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-orange-200">Employment Equity</p>
          <h2 className="mt-4 text-2xl font-semibold text-white">Transformation-ready hires</h2>
          <p className="mt-4 text-slate-300 leading-7">
            We support transformation-aligned hiring by identifying talent who contribute to B-BBEE objectives without compromising quality.
          </p>
        </Card>
      </section>

      <section className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-950/35 p-8 shadow-2xl shadow-black/20 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-orange-200">Take the next step</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Ready to build your employer talent pipeline?</h2>
        </div>
        <Link to="/contact">
          <Button>Contact our employer team</Button>
        </Link>
      </section>

      <EmployerPartnershipForm />
    </div>
  );
}
