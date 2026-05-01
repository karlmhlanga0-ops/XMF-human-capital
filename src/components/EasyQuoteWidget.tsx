import { useMemo, useState } from 'react';
import jsPDF from 'jspdf';
import { Button } from './ui/button'; 
import { Input } from './ui/input'; 

const pricingOptions = [
  { key: 'learnership', label: 'Learnership Candidate Placement', pricePerCandidate: 6000, isFlatFee: false },
  { key: 'identification', label: 'Candidate Identification Support', pricePerCandidate: 3000, isFlatFee: false },
  { key: 'pipeline', label: 'Managed Talent Pipeline Recruitment', pricePerCandidate: 9750, isFlatFee: false },
  { key: 'graduate', label: 'Graduate Recruitment Campaign Support', pricePerCandidate: 18500, isFlatFee: false },
  { key: 'transformation', label: 'Transformation-Aligned Advisory', pricePerCandidate: 70000, isFlatFee: true },
];

const formatZAR = (amount: number) => `R ${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

export function EasyQuoteWidget() {
  const [selectedService, setSelectedService] = useState(pricingOptions[0].key);
  const [candidateCount, setCandidateCount] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);

  // Lead Capture State
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    position: '',
    emailAddress: '',
    contactNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const service = pricingOptions.find((option) => option.key === selectedService) ?? pricingOptions[0];
  const isFlatFee = service.isFlatFee;

  const estimatedInvestment = useMemo(() => {
    if (isFlatFee) return service.pricePerCandidate;
    return service.pricePerCandidate * Math.max(1, candidateCount);
  }, [service, isFlatFee, candidateCount]);

  const generatePDFAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      // --- 1. FIRE DATA TO NEW WEBHOOK ---
      const EASYQUOTE_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxp6G21cuRBy6SE5nT1mglnz6rS0Y-MBMKBX9XsvpV7yVe7Hx8uStn6hXD-NvyVaasE/exec'; 
      
      const payload = {
        formType: 'EasyQuote',
        ...formData,
        serviceRequired: service.label,
        numberOfCandidates: isFlatFee ? 'N/A' : candidateCount,
        estimatedTotal: formatZAR(estimatedInvestment),
        dateGenerated: new Date().toLocaleDateString()
      };

      fetch(EASYQUOTE_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      }).catch(err => console.error("Webhook silent fail:", err));

      // --- 2. ASYNC IMAGE LOADER ---
      const loadImageBase64 = (url: string): Promise<string | null> => {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              resolve(canvas.toDataURL('image/png'));
            } else {
              resolve(null);
            }
          };
          img.onerror = () => {
            console.warn(`Failed to load image from CORS: ${url}`);
            resolve(null);
          };
          img.src = url;
        });
      };

      // LinkedIn URLs
      const coverUrl = "https://media.licdn.com/dms/image/v2/D4D3DAQFx7Gg78jAX0Q/image-scale_191_1128/B4DZ2.4VLCGwAc-/0/1777023971452/xmf_human_capital_partners_cover?e=1778230800&v=beta&t=Ek1ZYisWbH_yLd5FmrLu9UPLH56517mSca-TlHzj5q4";
      const logoUrl = "https://media.licdn.com/dms/image/v2/D4D0BAQH9ys6-pZjd5A/company-logo_200_200/B4DZ3YG9tZKAAI-/0/1777447203169/xmf_human_capital_partners_logo?e=1779321600&v=beta&t=fJHPPgSelKUe0KRXMHXuib5rUX_ddPgDzh8Ay3PfXGs";

      // Fetch both images simultaneously
      const [coverData, logoData] = await Promise.all([
        loadImageBase64(coverUrl),
        loadImageBase64(logoUrl)
      ]);

      // --- 3. GENERATE THE PDF ---
      const doc = new jsPDF();
      
      // Top Banner (Cover Image)
      if (coverData) {
        doc.addImage(coverData, 'PNG', 0, 0, 210, 40);
      } else {
        doc.setFillColor(30, 37, 76); // Fallback Navy block
        doc.rect(0, 0, 210, 40, 'F');
      }

      // Logo Profile (Overlapping banner slightly)
      if (logoData) {
        doc.addImage(logoData, 'PNG', 14, 10, 24, 24);
      } else {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(255, 255, 255);
        doc.text("XMF", 14, 25);
      }

      // Header Styling
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(30, 37, 76); // Royal Blue / Navy
      doc.text("Official Quotation", 14, 55);

      // Date and Reference
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139); // Slate 500
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 65);
      doc.text(`Valid for: 30 Days`, 14, 70);

      // Client Details Box
      doc.setFillColor(248, 250, 252); // Light Slate background
      doc.rect(14, 80, 182, 40, 'F');
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("Prepared For:", 20, 90);
      
      doc.setFont("helvetica", "normal");
      doc.text(`${formData.companyName}`, 20, 98);
      doc.text(`Attn: ${formData.fullName} (${formData.position})`, 20, 105);
      doc.text(`${formData.emailAddress} | ${formData.contactNumber}`, 20, 112);

      // Quote Details Line Items
      doc.setFont("helvetica", "bold");
      doc.text("Service Details", 14, 135);
      
      doc.setDrawColor(226, 232, 240);
      doc.line(14, 140, 196, 140);

      doc.setFont("helvetica", "normal");
      doc.text("Service Module:", 14, 150);
      doc.setFont("helvetica", "bold");
      doc.text(service.label, 60, 150);

      doc.setFont("helvetica", "normal");
      doc.text("Volume:", 14, 160);
      doc.setFont("helvetica", "bold");
      doc.text(isFlatFee ? "Project / Advisory Base" : `${candidateCount} Candidates`, 60, 160);

      doc.setFont("helvetica", "normal");
      doc.text("Base Rate:", 14, 170);
      doc.text(`${formatZAR(service.pricePerCandidate)} ${isFlatFee ? 'flat fee' : 'per candidate'}`, 60, 170);

      doc.line(14, 180, 196, 180);

      // Total
      doc.setFontSize(16);
      doc.setTextColor(215, 106, 54); // XMF Orange
      doc.text("Total Quotation Value:", 14, 195);
      doc.text(formatZAR(estimatedInvestment), 75, 195);

      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(148, 163, 184);
      doc.text("*This is a preliminary quotation. Final onboarding proposals are customized upon consultation.", 14, 205);

      // Footer divider
      doc.setDrawColor(30, 37, 76);
      doc.setLineWidth(0.5);
      doc.line(14, 240, 196, 240);

      // --- 2-Column Corporate Details ---
      
      // Column 1: XMF Details
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(30, 37, 76);
      doc.text("Company Details", 14, 250);
      
      doc.setFont("helvetica", "normal");
      doc.text("XMF Human Capital Partners (Pty) Ltd", 14, 255);
      doc.text("Registration Number: 2026 / 319396 / 07", 14, 260);
      doc.text("Director: Xolani Mabaso", 14, 265);
      doc.text("Contact: +27 60 991 5131 | info@xmfhcp.co.za", 14, 270);
      
      // Column 2: Banking Details
      doc.setFont("helvetica", "bold");
      doc.text("Banking Details", 100, 250);
      
      doc.setFont("helvetica", "normal");
      doc.text("Account Name: XMF HUMAN CAPITAL PARTNERS (PTY) LTD", 100, 255);
      doc.text("Bank: Nedbank (Branch: ROSEBANK, Code: 198765)", 100, 260);
      doc.text("Account Type: Current Account | SWIFT: NEDSZAJJ", 100, 265);

      // Download
      doc.save(`XMF_Quotation_${formData.companyName.replace(/\s+/g, '_')}.pdf`);
      setIsGenerating(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);

    } catch (error) {
      console.error("Error generating quote:", error);
      setIsGenerating(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-[#D76A36] focus:ring-1 focus:ring-[#D76A36] placeholder:text-slate-500 font-medium";

  return (
    <div className="bg-[#1E254C]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 relative overflow-hidden text-white">
      
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D76A36]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

      <div className="space-y-6 relative z-10">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D76A36]">Easy Quote</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white text-balance">Generate an official quotation.</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Enter your details below to instantly download an official quotation PDF for your talent acquisition needs.
          </p>
        </div>

        <form onSubmit={generatePDFAndSubmit} className="space-y-6">
          
          <div className="grid gap-4 sm:grid-cols-2 rounded-2xl border border-white/10 bg-slate-950/40 p-6">
            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Company Name</label>
              <input required type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Acme Corp" className={inputClass} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Full Name</label>
              <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Jane Doe" className={inputClass} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Position</label>
              <input required type="text" name="position" value={formData.position} onChange={handleInputChange} placeholder="HR Director" className={inputClass} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Email Address</label>
              <input required type="email" name="emailAddress" value={formData.emailAddress} onChange={handleInputChange} placeholder="jane@acme.com" className={inputClass} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Contact Number</label>
              <input required type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} placeholder="+27 11 123 4567" className={inputClass} />
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/40 p-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Service Required</label>
              <select name="selectedService" value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className={inputClass}>
                {pricingOptions.map((option) => (
                  <option key={option.key} value={option.key} className="bg-slate-900 text-white">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Number of Candidates</label>
              <input
                type="number"
                min={1}
                value={candidateCount}
                onChange={(e) => setCandidateCount(Math.max(1, Number(e.target.value) || 1))}
                disabled={isFlatFee}
                className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-50`}
              />
              {isFlatFee && <p className="text-xs text-[#D76A36]">Quantity not required for advisory services.</p>}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0B122B] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Total Quotation</p>
              <p className="mt-1 text-3xl font-bold text-white">{formatZAR(estimatedInvestment)}</p>
            </div>
            <Button 
              type="submit" 
              disabled={isGenerating}
              className="w-full sm:w-auto bg-[#D76A36] hover:bg-[#c25a29] text-white font-bold py-6 px-8 rounded-xl shadow-lg shadow-[#D76A36]/20 transition-all whitespace-nowrap"
            >
              {isGenerating ? "Generating PDF..." : success ? "Quote Downloaded!" : "Generate Official Quote"}
            </Button>
          </div>

        </form>
      </div>

      <div className="mt-8 pt-5 border-t border-white/10 text-center text-xs text-slate-400 relative z-10">
        Powered by <span className="font-semibold text-[#D76A36]">EasyQuote™</span> — Build your own at <a href="https://easyquote.octothorp.online" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">easyquote.octothorp.online</a>
      </div>
    </div>
  );
}