import { useEffect, useMemo, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { ArrowRight, FileText, ShieldCheck, Car, MapPin, Download, Mail, Info, LifeBuoy } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

interface CandidateRow {
  fullName: string; idNumber: string; province: string; gender?: string; email?: string;
  phone?: string; highestQualification?: string; disability?: string; race?: string;
  fieldOfStudy?: string; reliableTransport?: string; willingToRelocate?: string;
  availableStartDate?: string; programme?: string; screeningStatus?: string; 
  attachmentLink: string; currentlyEmployed?: string; previousLearnership?: string;
  [key: string]: string | undefined;
}

type ScreeningStatus = 'Not Eligible' | 'Requires Follow-Up' | 'Eligible';

function autoScreener(candidate: CandidateRow): ScreeningStatus {
  const raw = (candidate as any).screeningStatus as string | undefined;
  if (raw) {
    const r = raw.trim().toLowerCase();
    if (r === 'approved' || r === 'eligible' || r === 'approved ') return 'Eligible';
    if (r === 'pending' || r === 'requires follow-up') return 'Requires Follow-Up';
    if (r === 'hold' || r === 'on hold' || r === 'not eligible') return 'Not Eligible';
  }
  if (candidate.currentlyEmployed === 'Yes') return 'Not Eligible';
  return 'Requires Follow-Up'; 
}

function calculateScore(candidate: CandidateRow) {
  const qualification = (candidate.highestQualification || '').toLowerCase();
  if (qualification.includes('master') || qualification.includes('honours')) return 10;
  if (qualification.includes('degree') || qualification.includes('bachelors') || qualification.includes('bcom')) return 8;
  if (qualification.includes('diploma')) return 6;
  if (qualification.includes('matric') || qualification.includes('grade 12')) return 3;
  return 1;
}

function getScoreGradient(score: number) {
  if (score >= 10) return 'bg-gradient-to-br from-amber-300 to-[#f97316] text-white border border-[#f97316]/50 shadow-lg shadow-[#f97316]/20';
  if (score >= 8) return 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white border border-emerald-500/50 shadow-lg shadow-emerald-500/20';
  if (score >= 6) return 'bg-[#161925] text-blue-400 border border-blue-500/30';
  return 'bg-[#0f111a] text-slate-400 border border-white/10';
}

const statusStyles: Record<ScreeningStatus, string> = {
  'Not Eligible': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Requires Follow-Up': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Eligible': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

const WEBHOOK_URL = 'https://script.google.com/a/macros/xmfpartners.co.za/s/AKfycbx4qjxe6efkChMJRDIwZazrgjXjJKGGh8FF_0YlIuJvZVpTvmabV9niCeNnzhWm25s8/exec';

export function AdminPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<CandidateRow[]>([]);
  const [sortKey, setSortKey] = useState<'fullName' | 'idNumber' | 'province' | 'priorityScore'>('priorityScore');
  const [sortAsc, setSortAsc] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'All' | ScreeningStatus>('All');
  const [filterProvince, setFilterProvince] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [prompt, setPrompt] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<ScreeningStatus>('Eligible');
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [newsletter, setNewsletter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [statusOverrides, setStatusOverrides] = useState<Record<string, ScreeningStatus | ''>>({});
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) return;
    const fetchCsv = async () => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSz3eM9CKYEQi74uPnDAdHQa0YT_q9hZhSXfljmXK-YTaam9PwnRuHtLHugWJzq-P11GmnguockYo6O/pub?gid=0&single=true&output=csv');
        const text = await response.text();
        const parsed = parseCSV(text);
        if (parsed.length < 1) { setRows([]); return; }
        
        const items = parsed.slice(1).map((rowArr) => {
          const item: any = {};
          item.fullName = rowArr[1] || '';
          item.idNumber = rowArr[2] || '';
          item.gender = rowArr[3] || '';
          item.email = rowArr[4] || '';
          item.phone = rowArr[5] || '';
          item.province = rowArr[6] || '';
          item.highestQualification = rowArr[7] || '';
          item.disability = rowArr[8] || '';
          item.race = rowArr[9] || '';
          item.fieldOfStudy = rowArr[10] || '';
          item.reliableTransport = rowArr[11] || '';
          item.willingToRelocate = rowArr[12] || '';
          item.availableStartDate = rowArr[13] || '';
          item.programme = rowArr[14] || '';
          item.currentlyEmployed = rowArr[15] || '';
          item.screeningStatus = rowArr[16] || '';
          item.attachmentLink = rowArr[17] || '';
          return item as CandidateRow;
        });
        setRows(items);
      } catch (error) { setLoadError('Unable to load candidate data.'); }
    };
    fetchCsv();
  }, []);

  if (!localStorage.getItem('isAdmin')) return <Navigate to="/admin/login" replace />;

  function parseCSV(text: string) {
    const lines: string[] = []; let cur = ''; let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '"') { if (inQuotes && text[i + 1] === '"') { cur += '"'; i++; } else { inQuotes = !inQuotes; } }
      else if (ch === '\n' && !inQuotes) { lines.push(cur); cur = ''; } else { cur += ch; }
    }
    if (cur) lines.push(cur);
    return lines.map((ln) => {
      const cols: string[] = []; let cell = ''; let q = false;
      for (let i = 0; i < ln.length; i++) {
        const c = ln[i];
        if (c === '"') { if (q && ln[i + 1] === '"') { cell += '"'; i++; } else { q = !q; } }
        else if (c === ',' && !q) { cols.push(cell); cell = ''; } else { cell += c; }
      }
      cols.push(cell); return cols;
    });
  }

  const [hasTransportFilter, setHasTransportFilter] = useState(false);
  const [canRelocateFilter, setCanRelocateFilter] = useState(false);

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      const status = statusOverrides[r.idNumber] || autoScreener(r);
      if (filterStatus !== 'All' && status !== filterStatus) return false;
      if (filterProvince !== 'All' && (r.province || '').toLowerCase() !== filterProvince.toLowerCase()) return false;
      if (hasTransportFilter && ((r.reliableTransport || '').toLowerCase() !== 'yes')) return false;
      if (canRelocateFilter && ((r.willingToRelocate || '').toLowerCase() !== 'yes')) return false;
      return true;
    });
  }, [rows, filterStatus, filterProvince, hasTransportFilter, canRelocateFilter, statusOverrides]);

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      if (sortKey === 'priorityScore') {
        const scoreA = calculateScore(a);
        const scoreB = calculateScore(b);
        return sortAsc ? scoreA - scoreB : scoreB - scoreA;
      }
      const left = a[sortKey] ?? ''; const right = b[sortKey] ?? '';
      if (left < right) return sortAsc ? -1 : 1; if (left > right) return sortAsc ? 1 : -1; return 0;
    });
  }, [filteredRows, sortKey, sortAsc]);

  const pageSize = 25;
  const pageCount = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const pageRows = sortedRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const allPageRowsSelected = pageRows.length > 0 && pageRows.every((row, index) => selectedIds.includes(row.idNumber || `${row.fullName}-${index}`));

  const pipelineStats = useMemo(() => {
    let eligible = 0, followup = 0, notEligible = 0;
    rows.forEach(r => {
      const s = statusOverrides[r.idNumber] || autoScreener(r);
      if (s === 'Eligible') eligible++;
      if (s === 'Requires Follow-Up') followup++;
      if (s === 'Not Eligible') notEligible++;
    });
    return { eligible, followup, notEligible };
  }, [rows, statusOverrides]);

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleBulkStatusUpdate = async () => {
    if (selectedIds.length === 0) return;
    setIsBulkProcessing(true);

    try {
      for (const id of selectedIds) {
        const candidate = rows.find((row) => row.idNumber === id);
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            formType: 'AdminAction', action: 'updateStatus', idNumber: id, newStatus: bulkStatus,
            triggerEmail: true, candidateEmail: candidate?.email || '',
          }),
        });
        setStatusOverrides((prev) => ({ ...prev, [id]: bulkStatus }));
        await delay(1500); 
      }
      alert(`Status updated and emails sent for ${selectedIds.length} candidate(s).`);
      setSelectedIds([]);
    } catch (error) { alert('Bulk action failed. Please try again.'); } 
    finally { setIsBulkProcessing(false); }
  };

  const toggleRowSelection = (id: string) => {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const toggleSelectAll = () => {
    if (allPageRowsSelected) {
      setSelectedIds((current) => current.filter((id) => !pageRows.some((row, i) => id === (row.idNumber || `${row.fullName}-${i}`))));
    } else {
      setSelectedIds((current) => [...new Set([...current, ...pageRows.map((row, i) => row.idNumber || `${row.fullName}-${i}`)])]);
    }
  };

  const demographics = useMemo(() => {
    const total = rows.length;
    const gCounts = rows.reduce((acc: any, r) => { const g = (r.gender || 'Unknown').toLowerCase(); acc[g] = (acc[g] || 0) + 1; return acc; }, {});
    const female = gCounts['female'] || 0;
    const male = gCounts['male'] || 0;

    const pCounts = rows.reduce((acc: any, r) => { const p = (r.province || 'Unknown'); acc[p] = (acc[p] || 0) + 1; return acc; }, {});
    const topProvinces = Object.entries(pCounts).sort((a: any, b: any) => b[1] - a[1]).slice(0, 3);

    return { total, female, male, genderPercent: total > 0 ? Math.round((female / total) * 100) : 0, topProvinces };
  }, [rows]);

  const handleStatusChange = async (candidateId: string, newStatus: ScreeningStatus) => {
    setProcessingId(candidateId);
    const triggerEmail = window.confirm(`Update status to ${newStatus} and route folders? Do you want to send the automated email notification?`);
    setStatusOverrides((s) => ({ ...s, [candidateId]: newStatus }));
    
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ formType: 'AdminAction', action: 'updateStatus', idNumber: candidateId, newStatus: newStatus, triggerEmail: triggerEmail }),
      });
    } catch (error) { alert("Failed to update status on server."); } 
    finally { setProcessingId(null); }
  };

  const handleRequestMissingInfo = async (candidateId: string, email: string) => {
    if (!email || email === 'N/A') return alert("Candidate has no email on file.");
    const confirmed = window.confirm(`Send an automated email to ${email} requesting missing logistics info?`);
    if (!confirmed) return;
    setProcessingId(candidateId);
    
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ formType: 'AdminAction', action: 'requestMissingInfo', idNumber: candidateId }),
      });
      setStatusOverrides((s) => ({ ...s, [candidateId]: 'Requires Follow-Up' }));
      alert("Email sent to candidate successfully.");
    } catch (err) { alert("Failed to send email."); } 
    finally { setProcessingId(null); }
  };

  const handleGenerateNewsletter = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true); setNewsletter('');
    try {
      const response = await fetch('/api/generate-newsletter', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idea: prompt.trim() }),
      });
      if (!response.ok) setNewsletter('Unable to generate newsletter. Server error.');
      else { const data = await response.json(); setNewsletter(data.text ?? 'No newsletter content generated.'); }
    } catch (error) { setNewsletter('Unable to generate newsletter. Please try again later.'); } 
    finally { setIsGenerating(false); }
  };

  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-100 font-sans pb-24">
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        
        {/* HEADER & PIPELINE TRACKER */}
        <div className="mb-10 rounded-[2rem] border border-white/5 bg-[#161925] p-8 lg:p-12 shadow-2xl flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f97316] mb-3">Admin Engine</p>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">Candidate Screening</h1>
            <p className="mt-3 max-w-2xl text-slate-400 text-sm leading-relaxed">
              Review candidate submissions, manage automated folder routing to Drive, and trigger POPIA-compliant communications.
            </p>
          </div>
          <div className="flex gap-6 w-full xl:w-auto">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 w-full xl:w-40 text-center">
              <p className="text-3xl font-black text-emerald-400">{pipelineStats.eligible}</p>
              <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mt-1">Eligible</p>
            </div>
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 w-full xl:w-40 text-center">
              <p className="text-3xl font-black text-amber-400">{pipelineStats.followup}</p>
              <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mt-1">Review</p>
            </div>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-2xl bg-[#161925] p-6 border border-white/5 flex items-center justify-between shadow-xl">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Pool</p>
              <p className="text-4xl font-black text-white mt-2">{demographics.total}</p>
            </div>
          </div>
          
          {/* Gender Split Loader */}
          <div className="rounded-2xl bg-[#161925] p-6 border border-white/5 shadow-xl">
            <div className="flex justify-between items-end mb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Gender Split</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-[#f97316]">{demographics.genderPercent}% Women</span>
                  <span className="text-blue-400">{100 - demographics.genderPercent}% Men</span>
                </div>
                <div className="w-full h-3 bg-blue-500/20 rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#f97316]" style={{ width: `${demographics.genderPercent}%` }}></div>
                  <div className="h-full bg-blue-500" style={{ width: `${100 - demographics.genderPercent}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Province Heatmap List */}
          <div className="rounded-2xl bg-[#161925] p-6 border border-white/5 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Top Provinces</p>
            <div className="space-y-3">
              {demographics.topProvinces.map((prov: any, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-white w-24 truncate">{prov[0]}</span>
                  <div className="flex-1 h-1.5 bg-[#0f111a] rounded-full overflow-hidden">
                    <div className="h-full bg-[#f97316]" style={{ width: `${(prov[1] / demographics.total) * 100}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-500">{prov[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* MAIN TABLE AREA */}
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-3xl border border-white/5 bg-[#161925] p-6 shadow-2xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <button type="button" onClick={() => setHasTransportFilter((s) => !s)} className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition ${hasTransportFilter ? 'bg-[#f97316] text-white' : 'bg-[#0f111a] text-slate-400 hover:bg-white/5 border border-white/5'}`}><Car className="h-3 w-3" /> Transport</button>
                  <button type="button" onClick={() => setCanRelocateFilter((s) => !s)} className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition ${canRelocateFilter ? 'bg-[#f97316] text-white' : 'bg-[#0f111a] text-slate-400 hover:bg-white/5 border border-white/5'}`}><MapPin className="h-3 w-3" /> Relocate</button>
                  <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)} className="rounded-xl bg-[#0f111a] px-3 py-1.5 text-xs font-bold text-slate-300 border border-white/5 outline-none cursor-pointer">
                    <option value="All">All Statuses</option><option value="Eligible">Eligible</option><option value="Requires Follow-Up">Requires Follow-Up</option><option value="Not Eligible">Not Eligible</option>
                  </select>
                </div>
                
                {/* DIRECT DRIVE DOWNLOAD LINKS */}
                <div className="relative">
                  <button type="button" onClick={() => setIsDownloadMenuOpen(!isDownloadMenuOpen)} className="inline-flex items-center gap-2 rounded-xl bg-[#f97316] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#ea680a]">
                    <Download className="h-3.5 w-3.5" /> Batch Downloads
                  </button>
                  {isDownloadMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#161925] shadow-2xl z-50 overflow-hidden">
                      <a href="https://drive.google.com/drive/folders/1K7lTcWTIxuFNLUjQHsIDHF5LJWSe9NBL?usp=sharing" target="_blank" rel="noreferrer" className="block px-4 py-3 text-sm font-semibold text-emerald-400 hover:bg-[#0f111a] transition border-b border-white/5">
                        📥 Eligible Folder
                      </a>
                      <a href="https://drive.google.com/drive/folders/1QLdBFaHriCyTMpVh-wpTBJ3MRgYdyi5A?usp=sharing" target="_blank" rel="noreferrer" className="block px-4 py-3 text-sm font-semibold text-amber-400 hover:bg-[#0f111a] transition border-b border-white/5">
                        📥 Follow-Up Folder
                      </a>
                      <a href="https://drive.google.com/drive/folders/1xS5XlCRngD_Pgc6EqhabeTz7nmPyMhMy?usp=sharing" target="_blank" rel="noreferrer" className="block px-4 py-3 text-sm font-semibold text-red-400 hover:bg-[#0f111a] transition">
                        📥 Not Eligible Folder
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {selectedIds.length > 0 && (
                <div className="mb-6 rounded-2xl border border-[#f97316]/30 bg-[#f97316]/5 p-4 flex items-center justify-between">
                  <p className="text-sm font-bold text-[#f97316]">{selectedIds.length} Selected</p>
                  <div className="flex gap-3">
                    <select value={bulkStatus} onChange={(e) => setBulkStatus(e.target.value as ScreeningStatus)} className="rounded-xl bg-[#0f111a] px-3 py-1.5 text-xs font-bold text-white border border-white/10">
                      <option value="Eligible">Make Eligible</option><option value="Requires Follow-Up">Make Follow-Up</option><option value="Not Eligible">Make Not Eligible</option>
                    </select>
                    <Button onClick={handleBulkStatusUpdate} disabled={isBulkProcessing} className="bg-[#f97316] text-white hover:bg-[#ea680a] h-auto py-1.5 text-xs font-bold rounded-xl">
                      {isBulkProcessing ? 'Processing...' : 'Apply & Email'}
                    </Button>
                  </div>
                </div>
              )}

              {loadError ? (
                <div className="p-6 text-center text-sm font-bold text-red-400 bg-red-500/10 rounded-2xl">{loadError}</div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#0f111a]">
                  <table className="min-w-full border-separate border-spacing-0">
                    <thead>
                      <tr className="bg-[#1a1d2d] text-left text-[10px] uppercase tracking-[0.1em] text-slate-400 font-bold">
                        <th className="border-b border-white/5 px-4 py-3 w-10">
                          <input type="checkbox" checked={allPageRowsSelected} onChange={toggleSelectAll} className="h-3.5 w-3.5 rounded bg-[#0f111a] border-white/20 text-[#f97316] focus:ring-[#f97316]" />
                        </th>
                        <th className="border-b border-white/5 px-4 py-3">Candidate</th>
                        <th className="border-b border-white/5 px-4 py-3 cursor-pointer hover:text-[#f97316] transition" onClick={() => { setSortKey('priorityScore'); setSortAsc(!sortAsc); }}>Score ↕</th>
                        <th className="border-b border-white/5 px-4 py-3">Logistics</th>
                        <th className="border-b border-white/5 px-4 py-3">Status</th>
                        <th className="border-b border-white/5 px-4 py-3 text-right">Documents</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageRows.map((row, index) => {
                        const key = row.idNumber || `${row.fullName}-${index}`;
                        const isSelected = selectedIds.includes(key);
                        const status = statusOverrides[key] || autoScreener(row);
                        const isMissingInfo = (!row.reliableTransport || !row.willingToRelocate || !row.currentlyEmployed || row.reliableTransport === 'N/A');
                        const pScore = calculateScore(row);

                        return (
                          <tr key={key} className={`border-b border-white/5 text-sm transition-colors ${isSelected ? 'bg-[#161925]/80' : 'hover:bg-[#161925]/40'}`}>
                            <td className="px-4 py-4">
                              <input type="checkbox" checked={isSelected} onChange={() => toggleRowSelection(key)} className="h-3.5 w-3.5 rounded bg-[#0f111a] border-white/20 text-[#f97316]" />
                            </td>
                            <td className="px-4 py-4">
                              <p className="font-bold text-white text-sm">{row.fullName || 'Unknown'}</p>
                              <p className="text-[11px] font-medium text-slate-500 mt-0.5">{row.email}</p>
                            </td>
                            <td className="px-4 py-4">
                              <div className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${getScoreGradient(pScore)}`}>
                                {pScore}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                               {isMissingInfo ? <span className="text-[10px] uppercase font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md">Missing</span> : <span className="text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">Ready</span>}
                            </td>
                            <td className="px-4 py-4 flex flex-col gap-2">
                              <select
                                value={status}
                                disabled={processingId === key}
                                onChange={(e) => handleStatusChange(row.idNumber, e.target.value as ScreeningStatus)}
                                className={`rounded-lg px-2 py-1 text-[11px] font-bold outline-none cursor-pointer ${statusStyles[status]} disabled:opacity-50`}
                              >
                                <option value="Eligible" className="bg-[#0f111a] text-emerald-400">Eligible</option>
                                <option value="Requires Follow-Up" className="bg-[#0f111a] text-amber-400">Follow-Up</option>
                                <option value="Not Eligible" className="bg-[#0f111a] text-red-400">Not Eligible</option>
                              </select>
                              {isMissingInfo && (
                                <button onClick={() => handleRequestMissingInfo(row.idNumber, row.email || '')} disabled={processingId === key} className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-amber-500/30 text-amber-400 px-2 py-1 text-[10px] font-bold hover:bg-amber-500/10 transition disabled:opacity-50">
                                  <Mail className="h-3 w-3" /> Ping Form
                                </button>
                              )}
                            </td>
                            <td className="px-4 py-4 text-right">
                              {row.attachmentLink && row.attachmentLink !== "No files uploaded" ? (
                                <a href={row.attachmentLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:bg-[#f97316] hover:text-white transition" title="Download Folder">
                                  <Download className="h-4 w-4" />
                                </a>
                              ) : <span className="text-[11px] font-bold text-slate-600">None</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              
              {pageCount > 1 && (
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-500">
                  <div>Page {currentPage} of {pageCount}</div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="rounded-lg bg-[#0f111a] border border-white/5 px-3 py-1.5 hover:bg-[#1a1d2d] disabled:opacity-50">Prev</button>
                    <button type="button" onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))} disabled={currentPage === pageCount} className="rounded-lg bg-[#0f111a] border border-white/5 px-3 py-1.5 hover:bg-[#1a1d2d] disabled:opacity-50">Next</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR (STICKY) */}
          <div className="space-y-6 lg:sticky lg:top-8 self-start">
            
            {/* SCORE LEGEND TOOLTIP */}
            <div className="rounded-3xl border border-white/5 bg-[#161925] p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-slate-300">
                <Info className="h-4 w-4 text-[#f97316]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#f97316]">Score Guide</h3>
              </div>
              <div className="space-y-3 text-sm font-medium">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${getScoreGradient(10)}`}>10</div>
                  <span className="text-slate-400">Master's / Honours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${getScoreGradient(8)}`}>8</div>
                  <span className="text-slate-400">Degree / BCom</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${getScoreGradient(6)}`}>6</div>
                  <span className="text-slate-400">Diploma</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${getScoreGradient(3)}`}>3</div>
                  <span className="text-slate-400">Matric / Grade 12</span>
                </div>
              </div>
            </div>

            {/* NEWSLETTER AI */}
            <Card className="rounded-3xl border border-white/5 bg-[#161925] p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="h-6 w-6 text-[#f97316]" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">Newsletter AI</h2>
              </div>
              <div className="space-y-4">
                <Textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Drop an idea or paste a voice note..."
                  className="bg-[#0f111a] text-slate-200 border-white/5 text-sm rounded-xl p-4 focus:border-[#f97316] h-28 resize-none"
                />
                <Button type="button" onClick={handleGenerateNewsletter} className="w-full bg-[#f97316] hover:bg-[#ea680a] text-white h-10 rounded-xl text-xs font-bold" disabled={isGenerating}>
                  {isGenerating ? 'Drafting...' : 'Generate Copy'}
                </Button>
              </div>
            </Card>

            {/* RETAINER UPSELL: LOG A TICKET */}
            <div className="rounded-3xl border border-white/5 bg-[#0f111a]/50 p-6 opacity-60 grayscale cursor-not-allowed">
              <div className="flex items-center gap-3 mb-3">
                <LifeBuoy className="h-5 w-5 text-slate-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Dev Support</h2>
              </div>
              <p className="text-xs text-slate-500 mb-4">Log a ticket for UI changes, algorithm tweaks, or new features.</p>
              <button disabled className="w-full bg-slate-800 text-slate-500 h-10 rounded-xl text-xs font-bold cursor-not-allowed">
                Log a Ticket (Locked)
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}