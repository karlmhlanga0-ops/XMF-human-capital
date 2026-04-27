export function ContactPage() {
  return (
    <div className="space-y-12 py-10 text-slate-100">
      <section className="glass-panel rounded-[2rem] border border-white/10 bg-slate-950/35 p-10 shadow-2xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.28em] text-orange-200">Contact</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Contact XMF Human Capital Partners</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Connect with our team for candidate registration, employer partnerships, or to learn more about our talent pipeline services.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="glass-panel rounded-[2rem] border border-white/10 bg-slate-950/35 p-8 shadow-2xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.28em] text-orange-200">Company</p>
          <h2 className="mt-4 text-2xl font-semibold text-white">XMF Human Capital Partners (Pty) Ltd</h2>
        </div>

        <div className="glass-panel rounded-[2rem] border border-white/10 bg-slate-950/35 p-8 shadow-2xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.28em] text-orange-200">Domain</p>
          <a href="https://www.xmfpartners.co.za" className="mt-4 block text-xl font-semibold text-white hover:text-orange-300">
            www.xmfpartners.co.za
          </a>
        </div>

        <div className="glass-panel rounded-[2rem] border border-white/10 bg-slate-950/35 p-8 shadow-2xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.28em] text-orange-200">Emails</p>
          <div className="mt-4 space-y-3 text-slate-300">
            <a href="mailto:info@xmfpartners.co.za" className="block hover:text-orange-300">info@xmfpartners.co.za</a>
            <a href="mailto:candidates@xmfpartners.co.za" className="block hover:text-orange-300">candidates@xmfpartners.co.za</a>
            <a href="mailto:partnerships@xmfpartners.co.za" className="block hover:text-orange-300">partnerships@xmfpartners.co.za</a>
          </div>
        </div>
      </section>
    </div>
  );
}
