export function TermsOfService() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <section className="relative w-full min-h-[45vh] flex items-center overflow-hidden bg-[#1E254C] py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E254C]/90 to-[#1E254C]/70"></div>
        <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 lg:px-8 text-center">
          <p className="text-[#D76A36] font-bold uppercase tracking-[0.2em] text-sm mb-4 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md mx-auto">
            Terms of Service
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Terms governing the use of our digital services.
          </h1>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 prose prose-slate">
          <p>
            These Terms of Service outline how XMF Human Capital Partners provides access to our website, tools, and information. By using our services, you agree to be bound by these terms.
          </p>
          <h2>Acceptance of Terms</h2>
          <p>
            Use of our website indicates acceptance of these terms, including any updates. If you do not agree, please refrain from using our services.
          </p>
          <h2>Service Use</h2>
          <p>
            You may use our site to explore our services, submit candidate profiles, and enquire about employer partnerships. All use must comply with applicable laws and any specific rules published on the site.
          </p>
          <h2>Intellectual Property</h2>
          <p>
            The content, design and branding on this site are owned by XMF Human Capital Partners and may not be reproduced without permission.
          </p>
          <h2>Limitation of Liability</h2>
          <p>
            While we work to provide accurate and timely information, XMF Human Capital Partners is not responsible for any loss or damage arising from use of the site.
          </p>
          <h2>Contact</h2>
          <p>
            For questions about these terms, please contact us via the contact page or by emailing our team directly.
          </p>
        </div>
      </section>
    </div>
  );
}
