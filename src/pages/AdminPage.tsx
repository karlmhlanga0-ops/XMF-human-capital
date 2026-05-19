import { useEffect, useMemo, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { ArrowRight, ChevronRight, FileText, ShieldCheck } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

interface CandidateRow {
  fullName: string;
  idNumber: string;
  province: string;
  currentlyEmployed: string;
  previousLearnership: string;
  attachmentLink: string;
  [key: string]: string;
}

type ScreeningStatus = 'Not Eligible' | 'Requires Follow-Up' | 'Eligible';

function autoScreener(candidate: CandidateRow): ScreeningStatus {
  if (candidate.currentlyEmployed === 'Yes') return 'Not Eligible';
  if (candidate.previousLearnership === 'Yes') return 'Requires Follow-Up';
  return 'Eligible';
}

const statusStyles: Record<ScreeningStatus, string> = {
  'Not Eligible': 'bg-red-100 text-red-800',
  'Requires Follow-Up': 'bg-amber-100 text-amber-800',
  Eligible: 'bg-emerald-100 text-emerald-800',
};

export function AdminPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<CandidateRow[]>([]);
  const [sortKey, setSortKey] = useState<'fullName' | 'idNumber' | 'province'>('fullName');
  const [sortAsc, setSortAsc] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'All' | ScreeningStatus>('All');
  const [filterProvince, setFilterProvince] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [prompt, setPrompt] = useState('');
  const [newsletter, setNewsletter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    // Require dummy auth
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) return;
    const fetchCsv = async () => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSz3eM9CKYEQi74uPnDAdHQa0YT_q9hZhSXfljmXK-YTaam9PwnRuHtLHugWJzq-P11GmnguockYo6O/pub?gid=0&single=true&output=csv');
        const text = await response.text();
        const parsed = parseCSV(text);
        if (parsed.length < 1) {
          setRows([]);
          return;
        }
        const headers = parsed[0].map((h) => String(h).trim());

        const mapHeader = (h: string) => {
          const key = h.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (key.includes('name')) return 'fullName';
          if (key.includes('id')) return 'idNumber';
          if (key.includes('province')) return 'province';
          if (key.includes('employed') || key.includes('currentlyemployed')) return 'currentlyEmployed';
          if (key.includes('learn') || key.includes('previouslearnership')) return 'previousLearnership';
          if (key.includes('race')) return 'race';
          if (key.includes('disab') || key.includes('disability')) return 'disability';
          if (key.includes('gender')) return 'gender';
          if (key.includes('attach') || key.includes('link') || key.includes('file')) return 'attachmentLink';
          return key;
        };

        const items: CandidateRow[] = parsed.slice(1).map((rowArr) => {
          const item: CandidateRow = {} as CandidateRow;
          headers.forEach((h, idx) => {
            const key = mapHeader(h);
            const val = rowArr[idx] ?? '';
            (item as any)[key] = String(val).trim();
          });
          return item;
        });
        setRows(items);
      } catch (error) {
        console.error(error);
        setLoadError('Unable to load candidate data.');
      }
    };
    const isAdminFlag = localStorage.getItem('isAdmin');
    if (!isAdminFlag) return;
    fetchCsv();
  }, []);

  // Redirect to login if not authenticated
  const isAdmin = localStorage.getItem('isAdmin');
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  function parseCSV(text: string) {
    const lines: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '"') {
        if (inQuotes && text[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === '\n' && !inQuotes) {
        lines.push(cur);
        cur = '';
      } else {
        cur += ch;
      }
    }
    if (cur) lines.push(cur);
    return lines.map((ln) => {
      const cols: string[] = [];
      let cell = '';
      let q = false;
      for (let i = 0; i < ln.length; i++) {
        const c = ln[i];
        if (c === '"') {
          if (q && ln[i + 1] === '"') {
            cell += '"';
            i++;
          } else {
            q = !q;
          }
        } else if (c === ',' && !q) {
          cols.push(cell);
          cell = '';
        } else {
          cell += c;
        }
      }
      cols.push(cell);
      return cols;
    });
  }

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      const status = autoScreener(r);
      if (filterStatus !== 'All' && status !== filterStatus) return false;
      if (filterProvince !== 'All' && (r.province || '').toLowerCase() !== filterProvince.toLowerCase()) return false;
      return true;
    });
  }, [rows, filterStatus, filterProvince]);

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      const left = a[sortKey] ?? '';
      const right = b[sortKey] ?? '';
      if (left < right) return sortAsc ? -1 : 1;
      if (left > right) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredRows, sortKey, sortAsc]);

  const pageSize = 25;
  const pageCount = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const pageRows = sortedRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, filterProvince, sortKey, sortAsc, rows]);

  const topCandidates = useMemo(() => sortedRows.slice(0, 3), [sortedRows]);

  const handleGenerateNewsletter = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setNewsletter('');

    try {
      const response = await fetch('/api/generate-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: prompt.trim() }),
      });
      if (!response.ok) {
        setNewsletter('Unable to generate newsletter. Server error.');
      } else {
        const data = await response.json();
        setNewsletter(data.text ?? 'No newsletter content generated.');
      }
    } catch (error) {
      console.error(error);
      setNewsletter('Unable to generate newsletter. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-[1240px] px-6 py-16 lg:px-8">
        <div className="mb-12 rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#f97316]">Admin Dashboard</p>
              <h1 className="mt-4 text-4xl font-bold text-white">Candidate Screening & Advisory Engine</h1>
              <p className="mt-4 max-w-3xl text-slate-300 leading-relaxed">
                Review candidate submissions, sort by priority, and preview the future AI-enabled auto-screener model that will identify top candidates by reading attached documents.
              </p>
            </div>
            <div className="rounded-3xl border border-[#f97316]/30 bg-[#f97316]/5 p-6 text-slate-200">
              <p className="font-semibold text-[#f97316]">Future model preview</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                When live, the dashboard will evaluate attachments and surface the strongest applications for each criteria, making top candidates instantly visible.
              </p>
            </div>
          </div>
        </div>

        {/* Top Candidates Preview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Future Top Candidates</h3>
            <p className="text-sm text-slate-400">Model preview — horizontally scroll to browse</p>
          </div>
          <div className="flex flex-row overflow-x-auto gap-4 pb-4 snap-x">
            {topCandidates.map((candidate, idx) => (
              <div key={`${candidate.fullName}-${idx}`} className="min-w-[280px] snap-start">
                <Card className="bg-slate-900/95 border-white/10 p-6">
                  <div className="flex items-center gap-3 text-[#f97316] mb-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f97316]/10">{idx + 1}</span>
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Future top candidate</p>
                      <p className="text-base font-semibold text-white">{candidate.fullName || 'Candidate'}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">This preview card illustrates how the model will rank the strongest candidates once attachment analysis is available.</p>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <section className="grid gap-8 lg:grid-cols-[2.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/20">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Candidate Auto-Screener</h2>
                  <p className="mt-2 text-slate-400">Sortable roster of current candidates with screening status computed from their submission data.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)} className="rounded-2xl bg-slate-900/70 px-4 py-2 text-sm text-slate-100">
                    <option value="All">All Statuses</option>
                    <option value="Eligible">Eligible</option>
                    <option value="Requires Follow-Up">Requires Follow-Up</option>
                    <option value="Not Eligible">Not Eligible</option>
                  </select>
                  <select value={filterProvince} onChange={(e) => setFilterProvince(e.target.value)} className="rounded-2xl bg-slate-900/70 px-4 py-2 text-sm text-slate-100">
                    <option value="All">All Provinces</option>
                    {[...new Set(rows.map((r) => r.province).filter(Boolean))].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 rounded-3xl border border-white/10 bg-slate-950/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-300">Showing <span className="font-semibold text-white">{filteredRows.length}</span> Candidates</div>
                <div className="text-sm text-slate-300">
                  {(() => {
                    const total = filteredRows.length;
                    const female = filteredRows.filter((r) => (r.gender || '').toLowerCase() === 'female').length;
                    const male = filteredRows.filter((r) => (r.gender || '').toLowerCase() === 'male').length;
                    return <>{total} total | {female} Female | {male} Male</>;
                  })()}
                </div>
              </div>

              {loadError ? (
                <div className="mt-8 rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-200">{loadError}</div>
              ) : (
                <div className="mt-8 overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/80">
                  <table className="min-w-full border-separate border-spacing-0">
                    <thead>
                      <tr className="bg-slate-900 text-left text-sm uppercase tracking-[0.22em] text-slate-500">
                        {[
                          { label: 'Full Name', key: 'fullName' },
                          { label: 'ID Number', key: 'idNumber' },
                          { label: 'Province', key: 'province' },
                        ].map((heading) => (
                          <th key={heading.key} className="border-b border-white/10 px-5 py-4">
                            <button
                              type="button"
                              onClick={() => {
                                if (sortKey === heading.key) {
                                  setSortAsc(!sortAsc);
                                } else {
                                  setSortKey(heading.key as 'fullName' | 'idNumber' | 'province');
                                  setSortAsc(true);
                                }
                              }}
                              className="inline-flex items-center gap-2 text-left text-slate-300 hover:text-white"
                            >
                              {heading.label}
                              <ChevronRight className={`h-4 w-4 transition-transform ${sortKey === heading.key && sortAsc ? 'rotate-90' : sortKey === heading.key ? '-rotate-90' : ''}`} />
                            </button>
                          </th>
                        ))}
                        <th className="border-b border-white/10 px-5 py-4">Gender</th>
                        <th className="border-b border-white/10 px-5 py-4">Race</th>
                        <th className="border-b border-white/10 px-5 py-4">Disability</th>
                        <th className="border-b border-white/10 px-5 py-4">Screening Status</th>
                        <th className="border-b border-white/10 px-5 py-4">Attachments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageRows.map((row, index) => {
                        const status = autoScreener(row);
                        return (
                          <tr key={`${row.fullName}-${index}`} className="border-b border-white/10 text-sm text-slate-200 hover:bg-slate-900/80">
                            <td className="px-5 py-4">{row.fullName || 'Unknown'}</td>
                            <td className="px-5 py-4">{row.idNumber || '—'}</td>
                            <td className="px-5 py-4">{row.province || '—'}</td>
                            <td className="px-5 py-4">{row.gender || '—'}</td>
                            <td className="px-5 py-4">{row.race || '—'}</td>
                            <td className="px-5 py-4">{row.disability || '—'}</td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
                                {status}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              {row.attachmentLink ? (
                                <a href={row.attachmentLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#f97316]/30 bg-[#f97316]/10 px-3 py-2 text-xs font-semibold text-[#f97316] hover:bg-[#f97316]/15 transition">
                                  <FileText className="h-4 w-4" /> View
                                </a>
                              ) : (
                                <span className="text-slate-500">No link</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {pageCount > 1 && (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                  <div className="text-sm text-slate-300">Page {currentPage} of {pageCount}</div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {[...Array(pageCount)].map((_, pageIndex) => {
                      const pageNum = pageIndex + 1;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => setCurrentPage(pageNum)}
                          className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${pageNum === currentPage ? 'bg-[#f97316] text-white' : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800'}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => setCurrentPage((prev) => Math.min(pageCount, prev + 1))}
                      disabled={currentPage === pageCount}
                      className="rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Card className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#f97316]">Advisory Engine</p>
                  <h2 className="mt-3 text-3xl font-bold text-white">Tweet-to-Newsletter</h2>
                </div>
                <ShieldCheck className="h-10 w-10 text-[#f97316]" />
              </div>
              <div className="mt-8 space-y-4">
                <Textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Enter a short idea or voice note transcription here..."
                  className="bg-slate-950/90 text-slate-100"
                />
                <Button type="button" onClick={handleGenerateNewsletter} className="w-full bg-[#f97316] hover:bg-[#ea680a]" disabled={isGenerating}>
                  {isGenerating ? 'Drafting...' : 'Generate Newsletter'}
                </Button>
                {newsletter ? (
                  <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
                    <div className="mb-4 flex items-center gap-3 text-[#f97316]">
                      <ArrowRight className="h-4 w-4" />
                      <p className="text-sm uppercase tracking-[0.22em]">Generated Newsletter</p>
                    </div>
                    <div className="space-y-4 text-slate-200 whitespace-pre-line text-sm leading-7">{newsletter}</div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">Enter an idea and click generate to preview the newsletter copy.</p>
                )}
              </div>
            </Card>
          </div>

        </section>
      </div>
    </div>
  );
}
