import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Layers, Activity } from 'lucide-react';

const slides = [
  {
    id: 'hero',
    title: 'XMF Human Capital Partners',
    subtitle: 'An integrated talent pipeline that turns learners into tomorrow’s workforce.',
    bullets: [
      'Talent acquisition built for entry-level, graduate and transformation-aligned roles.',
      'Human-centered matching with digital workflows and compliance-first screening.',
      'A sustainable model for employers, training providers and learners.',
    ],
    image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'challenge',
    title: 'The Challenge',
    subtitle: 'South African employers need scalable access to compliant, job-ready entry-level talent.',
    bullets: [
      'Organisations struggle with screening high volumes of inexperienced candidates.',
      'B-BBEE and Employment Equity goals require more than a checklist.',
      'Learnership and graduate pipelines often fail to connect to real business need.',
    ],
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'insight',
    title: 'Our Insight',
    subtitle: 'People-first systems need structured intake, skills visibility, and advisory support.',
    bullets: [
      'Candidates must be matched based on potential, not only CVs.',
      'Automated screening frees teams to focus on coaching and employer relationships.',
      'Compliance data should enrich placements, not slow them down.',
    ],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'platform',
    title: 'The XMF Platform',
    subtitle: 'A workflow engine for candidate intake, advisory review and employer matching.',
    bullets: [
      'Smart intake forms capture educational, compliance and availability data.',
      'Auto-screening highlights ideal candidates instantly.',
      'Newsletter and advisory copy generation supports employer engagement.',
    ],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'experience',
    title: 'Candidate Experience',
    subtitle: 'A modern intake experience designed for young learners and graduates.',
    bullets: [
      'Easy application workflow with mobile-first upload support.',
      'Voluntary demographic capture for placement and equity benchmarks.',
      'Clear status updates for candidates and employers alike.',
    ],
    image: 'https://images.unsplash.com/photo-1515165562835-c3960e2208a0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'employer',
    title: 'Employer Value',
    subtitle: 'Delivering reliable talent with transformation and compliance clarity.',
    bullets: [
      'Greater visibility on candidate readiness and attachment quality.',
      'Fast shortlist generation for learnerships, internships and graduate roles.',
      'Aligned to B-BBEE and Employment Equity reporting requirements.',
    ],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'data',
    title: 'Data & Compliance',
    subtitle: 'Structured candidate data powers better placement decisions.',
    bullets: [
      'Race, disability and employment status captured sensitively.',
      'Documents linked directly to candidate profiles and screener outcomes.',
      'Reports designed for employer governance and funder accountability.',
    ],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'advisory',
    title: 'Advisory Engine',
    subtitle: 'AI-assisted newsletter and engagement copy for candidate and employer outreach.',
    bullets: [
      'Transform short ideas into professional communications instantly.',
      'Keep employers engaged with tailored progress updates.',
      'Support candidate placement with compliance-aware outreach.',
    ],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'vision',
    title: 'Growth Roadmap',
    subtitle: 'From pilot to national talent pipeline across sectors.',
    bullets: [
      'Scale with employer cohorts and training partners.',
      'Add deeper assessment, placement and retention workflows.',
      'Build a trusted channel for transformation-driven talent supply.',
    ],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'close',
    title: 'Why XMF?',
    subtitle: 'A premium workforce partner for learners, graduates and employer transformation.',
    bullets: [
      'Human-centred placement with operational speed.',
      'Compliance built into every step of the journey.',
      'Designed to turn South African potential into measurable outcomes.',
    ],
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
  },
];

export function PitchPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        next();
      } else if (e.key === 'ArrowLeft') {
        prev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [index]);

  const next = () => {
    setDirection(1);
    setIndex((i) => Math.min(slides.length - 1, i + 1));
  };
  const prev = () => {
    setDirection(-1);
    setIndex((i) => Math.max(0, i - 1));
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  } as any;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-6 py-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#f97316]">Pitch Experience</p>
              <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">A 10-step story for XMF</h1>
            </div>
            <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300 shadow-lg shadow-black/20">
              <ArrowRight className="h-5 w-5 text-[#f97316]" />
              Use ← / → or the buttons below to move through the pitch.
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slides[index].id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="w-full h-screen flex items-center justify-center"
            style={{ backgroundImage: `linear-gradient(rgba(8,11,25,0.84), rgba(8,11,25,0.84)), url('${slides[index].image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="mx-auto max-w-[1240px] px-6 py-20">
              <div className="grid w-full gap-10 lg:grid-cols-[0.65fr_0.35fr] lg:items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-3 rounded-full bg-[#f97316]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#f97316]">
                    <Layers className="h-4 w-4" />
                    Slide {index + 1} of {slides.length}
                  </div>
                  <div className="space-y-6">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{slides[index].title}</h2>
                    <p className="max-w-3xl text-lg leading-8 text-slate-300">{slides[index].subtitle}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {slides[index].bullets.map((b) => (
                      <div key={b} className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-black/20">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Key point</p>
                        <p className="mt-3 text-base text-slate-200">{b}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30">
                  <div className="flex items-center gap-3 text-slate-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#f97316]/15 text-[#f97316]">
                      <Activity className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Presentation highlight</p>
                      <p className="text-xl font-semibold text-white">{slides[index].title}</p>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-slate-950/95 p-6 text-slate-300">
                    <p>{slides[index].bullets[0]}</p>
                    <p className="mt-4 text-sm text-slate-400">This deck is built to showcase both product capability and commercial impact.</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-white/5 p-4 text-xs uppercase tracking-[0.25em] text-slate-400">Audience</div>
                    <div className="rounded-3xl bg-white/5 p-4 text-xs uppercase tracking-[0.25em] text-slate-400">Outcome</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-slate-950/95 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4">
          <div className="text-sm text-slate-300">{slides[index].title} — {index + 1}/{slides.length}</div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={prev} disabled={index === 0} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/90 px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"><ChevronLeft className="h-4 w-4" /> Previous</button>
            <button type="button" onClick={next} disabled={index === slides.length - 1} className="inline-flex items-center gap-2 rounded-full bg-[#f97316] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#ea680a] disabled:cursor-not-allowed disabled:opacity-50">Next <ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
