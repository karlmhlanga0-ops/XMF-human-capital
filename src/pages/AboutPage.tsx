import { Card } from '../components/ui/card';

export function AboutPage() {
  return (
    <div className="space-y-12 py-10 text-slate-100">
      <section className="glass-panel rounded-[2rem] border border-white/10 bg-slate-950/35 p-10 shadow-2xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.28em] text-orange-200">About Us</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Specialist talent pipeline partner for South Africa’s future workforce.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          XMF Human Capital Partners crafts premium recruitment pathways for learners, graduates and emerging talent. We deliver high-integrity sourcing, employer alignment and skills development support with a bold, modern approach.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-orange-200">Our role</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">From candidate discovery to employer readiness.</h2>
          <p className="mt-4 text-slate-300 leading-7">
            We manage the candidate journey end-to-end, from sourcing and screening to preparing learners and graduates for structured programmes. Our team works with employers to build pipelines that are scalable, compliant and aligned to transformation goals.
          </p>
        </Card>

        <Card className="p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-orange-200">How we work</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Data-driven sourcing with an African human touch.</h2>
          <p className="mt-4 text-slate-300 leading-7">
            We combine deep local market knowledge with smooth, candidate-centered onboarding. This ensures our talent pipelines deliver dependable outcomes for employers, while creating meaningful opportunities for learners and emerging professionals.
          </p>
        </Card>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[
          { title: 'Authentic employer partnerships', content: 'We build trust with organisations who need dependable talent for programme success.' },
          { title: 'Comprehensive candidate support', content: 'From application guidance to opportunity matching, candidates benefit from a premium experience.' },
          { title: 'Transformation and equity outcomes', content: 'We support B-BBEE and skills development priorities through aligned talent acquisition.' },
        ].map((item) => (
          <Card key={item.title} className="p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-orange-200">{item.title}</p>
            <p className="mt-4 text-slate-300 leading-7">{item.content}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
