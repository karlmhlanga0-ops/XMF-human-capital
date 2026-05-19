import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowRight, BarChart3, Sparkles } from 'lucide-react';

export function AdvisoryPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      <section className="relative overflow-hidden bg-[#111827] py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.18),_transparent_35%)]" />
        <div className="relative mx-auto max-w-[1240px] px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#f97316]/20 bg-[#f97316]/10 px-4 py-2 text-sm font-semibold text-[#f97316] uppercase tracking-[0.18em]">
                Strategic Human Capital Consulting
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">Strategic Human Capital Consulting</h1>
              <p className="max-w-xl text-slate-300 text-lg leading-relaxed">
                XMF supports founders, HR leaders and growth-stage businesses with a people-first strategy that turns hiring, compliance and workplace design into measurable advantage. Book a 30-minute advisory slot with Xolani to shape a practical launch plan for your talent pipeline, from resourcing and culture to upskilling and employer readiness.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  'Go-to-market hiring strategy',
                  'Learnership & graduate programme design',
                  'Compliance-ready people operations',
                  'Candidate readiness and retention plans',
                ].map((item) => (
                  <div key={item} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f97316]/10 text-[#f97316]">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <p className="text-base text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button className="bg-[#f97316] hover:bg-[#ea680a] px-8 py-4">Book Xolani’s Advisory Slot</Button>
              </div>
            </div>
            <div className="grid gap-6">
              <Card className="bg-[#111827]/90 border-[#f97316]/20">
                <div className="mb-4 flex items-center gap-3 text-[#f97316]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f97316]/10">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-[#f97316]">About Advisory</p>
                    <p className="text-sm text-slate-400">Expert guidance for building people-first ventures.</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  The advisory slot helps founders understand how to structure talent intake, streamline compliance, and create a robust people pipeline from the earliest stage. Xolani can help map business operations to candidate journeys, training pathways, and employer value propositions.
                </p>
              </Card>
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
                <div className="mb-6 rounded-3xl bg-[#f97316]/10 p-6 text-slate-100">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#f97316]">Advisory session</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Grow your venture with the right people strategy.</h2>
                </div>
                <iframe
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2an6Y0-KFs_3tiNcRdt7CAr-BPqCW64areY1E2LsTu8QOom10uqtiQHfkLQ7_SMGgcyBPyAT36?gv=true"
                  style={{ border: 0 }}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Xolani Advisory Booking"
                  className="rounded-[2rem] bg-slate-950"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
