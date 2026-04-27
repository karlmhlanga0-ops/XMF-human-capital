import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const propsItems = [
  {
    title: 'Skills Development',
    description: 'Building talent pipelines that reinforce workplace skills and structured programme readiness.',
  },
  {
    title: 'Employment Equity',
    description: 'Delivering transformation-aligned candidate sourcing that supports B-BBEE and equity ambitions.',
  },
  {
    title: 'Employer Confidence',
    description: 'Presenting ready-to-engage candidates with strong preparation, professionalism and potential.',
  },
];

export function HomePage() {
  return (
    <div className="space-y-24">
      <section className="relative overflow-hidden rounded-[2rem] bg-white py-24 shadow-[0_40px_100px_rgba(15,23,42,0.12)]">
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl" />
        <div className="mx-auto flex max-w-[1240px] flex-col gap-16 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-brand-orange/10 px-5 py-2 text-sm font-medium uppercase tracking-[0.28em] text-brand-orange">
              Workforce pipelines with premium impact
            </span>
            <h1 className="mt-8 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Building Workforce Pipelines for Learnerships, Graduates and Future Leaders Across South Africa
            </h1>
            <p className="mt-8 text-lg leading-8 text-slate-600">
              XMF Human Capital Partners connects ambitious talent with consultative employers through modern, transformation-ready workforce solutions. We deliver candidate sourcing and placement that feels premium, strategic and distinctly African.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/candidates">
                <Button>Register as Candidate</Button>
              </Link>
              <Link to="/employers">
                <Button>Partner With Us</Button>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto max-w-xl rounded-[2rem] shadow-lg shadow-slate-900/10 lg:ml-10">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-[2rem] border border-brand-blue/20 bg-brand-blue/5" />
            <div className="overflow-hidden rounded-[2rem] border border-slate-200/60 bg-slate-100">
              <img
                className="h-[520px] w-full object-cover"
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="African corporate professionals"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-slate-100 py-20 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.30em] text-slate-500">Trusted by</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
                Organisations and programmes that value excellence choose XMF.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-4">
              {['Aurelia', 'Novum', 'Atlas', 'Harper'].map((brand) => (
                <div
                  key={brand}
                  className="flex h-14 items-center justify-center rounded-2xl bg-white/80 px-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500 shadow-sm"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-white py-24 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.30em] text-brand-orange">Value proposition</p>
            <h2 className="mt-5 text-4xl font-semibold text-slate-950 sm:text-5xl">
              Why top employers choose XMF as their talent pipeline partner.
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {propsItems.map((item) => (
              <Card key={item.title} className="flex flex-col gap-6 border border-slate-200/60 bg-slate-50 p-8">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-blue text-white shadow-lg shadow-brand-blue/20">
                  <span className="text-lg font-semibold">✓</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="text-base leading-7 text-slate-600">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-slate-100 py-24 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.30em] text-brand-orange">Signature solutions</p>
            <h2 className="mt-5 text-4xl font-semibold text-slate-950 sm:text-5xl">
              Image-led service highlights for Learnerships and Graduate talent.
            </h2>
          </div>
          <div className="grid gap-8 xl:grid-cols-2">
            <div className="group overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-slate-900/10">
              <img
                className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
                alt="Learnership talent"
                loading="lazy"
              />
              <div className="p-10">
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-brand-orange">Learnerships</p>
                <h3 className="mt-4 text-3xl font-semibold text-slate-950">Pipeline-ready learner talent</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Practical placement support and candidate preparation for workplace learnership programmes at scale.
                </p>
              </div>
            </div>
            <div className="group overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-slate-900/10">
              <img
                className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Graduate talent"
                loading="lazy"
              />
              <div className="p-10">
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-brand-orange">Graduate Programmes</p>
                <h3 className="mt-4 text-3xl font-semibold text-slate-950">High-impact graduate recruitment</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Curated graduate pipelines that deliver ambitious, workplace-ready talent into your early career programmes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-brand-blue py-24 px-6 shadow-[0_40px_120px_rgba(0,0,0,0.18)] sm:px-8">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-10 text-white lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.30em] text-brand-orange/90">Ready to move faster</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
              Take the next step with premium talent pipelines that perform.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200">
              Whether you are an employer seeking future leaders or a candidate ready for your next opportunity, XMF is the partner for high-quality placement and growth.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/candidates">
              <Button>Register as Candidate</Button>
            </Link>
            <Link to="/employers">
              <Button>Partner With Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
