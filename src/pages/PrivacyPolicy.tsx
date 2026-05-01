export function PrivacyPolicy() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <section className="relative w-full min-h-[45vh] flex items-center overflow-hidden bg-[#1E254C] py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E254C]/90 to-[#1E254C]/70"></div>
        <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 lg:px-8 text-center">
          <p className="text-[#D76A36] font-bold uppercase tracking-[0.2em] text-sm mb-4 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md mx-auto">
            Privacy Policy
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Our commitment to privacy and data protection.
          </h1>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 prose prose-slate">
          <p>
            XMF Human Capital Partners is committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible way.
          </p>
          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly when you register as a candidate, submit a partnership enquiry, or otherwise communicate with us. This may include contact details, qualification information, employment preferences, and application documents.
          </p>
          <h2>How We Use Information</h2>
          <p>
            Your information is used to connect you with suitable opportunities, to manage employer partnerships, and to comply with legal requirements. We do not sell your personal data to third parties.
          </p>
          <h2>POPIA Consent</h2>
          <p>
            By submitting your personal information to XMF Human Capital Partners, you consent to the collection, processing, and sharing of your information with partner training providers and employer organisations for the purposes of recruitment, learnership placement, graduate programme consideration, and related employment opportunities.
          </p>
          <p>
            Your information will be processed in accordance with the Protection of Personal Information Act (POPIA). You may request access to, correction of, or deletion of your personal data at any time by contacting us.
          </p>
          <h2>Security</h2>
          <p>
            We implement reasonable physical, administrative and technical safeguards to protect your information. While we strive to keep all data secure, no online transmission can be guaranteed to be 100% secure.
          </p>
          <h2>Your Rights</h2>
          <p>
            You may request access to your personal information, ask for corrections, or request that we delete data where appropriate. Contact us using the details provided on our website.
          </p>
          <h2>Contact</h2>
          <p>
            If you have any questions about this policy or how your information is used, please reach out to our team via the contact page or email us directly.
          </p>
        </div>
      </section>
    </div>
  );
}
