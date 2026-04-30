import { useMemo, useState } from 'react';

const pricingOptions = [
  {
    key: 'learnership',
    label: 'Learnership Candidate Placement',
    pricePerCandidate: 6000,
    isFlatFee: false,
  },
  {
    key: 'identification',
    label: 'Candidate Identification Support',
    pricePerCandidate: 3000,
    isFlatFee: false,
  },
  {
    key: 'pipeline',
    label: 'Managed Talent Pipeline Recruitment (Premium)',
    pricePerCandidate: 9750,
    isFlatFee: false,
  },
  {
    key: 'graduate',
    label: 'Graduate Recruitment Campaign Support',
    pricePerCandidate: 18500,
    isFlatFee: false,
  },
  {
    key: 'transformation',
    label: 'Transformation-Aligned Advisory',
    pricePerCandidate: 70000,
    isFlatFee: true,
  },
];

const formatZAR = (amount: number) => `R ${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

export function EasyQuoteWidget() {
  const [selectedService, setSelectedService] = useState(pricingOptions[0].key);
  const [candidateCount, setCandidateCount] = useState(1);

  const service = pricingOptions.find((option) => option.key === selectedService) ?? pricingOptions[0];
  const isFlatFee = service.isFlatFee;

  const estimatedInvestment = useMemo(() => {
    if (isFlatFee) {
      return service.pricePerCandidate;
    }

    const quantity = Math.max(1, candidateCount);
    return service.pricePerCandidate * quantity;
  }, [service, isFlatFee, candidateCount]);

  return (
    <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 backdrop-blur-md text-white shadow-xl shadow-slate-900/20">
      <div className="space-y-5">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-200/80">Easy Quote</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Estimate your investment</h2>
          <p className="mt-2 text-sm leading-6 text-slate-200/80">
            Use the calculator below to preview your project cost for our service offerings.
          </p>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/40 p-5">
          <label className="block text-sm font-medium text-slate-200">Service Required</label>
          <select
            value={selectedService}
            onChange={(event) => setSelectedService(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/20 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-white/60 focus:ring-2 focus:ring-white/10"
          >
            {pricingOptions.map((option) => (
              <option key={option.key} value={option.key} className="bg-slate-950 text-white">
                {option.label}
              </option>
            ))}
          </select>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-200">Number of Candidates</label>
            <input
              type="number"
              min={1}
              value={candidateCount}
              onChange={(event) => setCandidateCount(Math.max(1, Number(event.target.value) || 1))}
              disabled={isFlatFee}
              className="w-full rounded-2xl border border-white/20 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-white/60 focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            />
            {isFlatFee ? (
              <p className="text-xs text-slate-300">Candidate count is not required for this advisory service.</p>
            ) : null}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-200/80">Estimated Investment</p>
          <p className="mt-3 text-4xl font-semibold text-white">{formatZAR(estimatedInvestment)}</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Preliminary estimate. Final proposals are customized.
          </p>
        </div>
      </div>
    </div>
  );
}
