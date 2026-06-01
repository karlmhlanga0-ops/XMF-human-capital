import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Label } from '../ui/label';

interface CandidateFormValues {
  firstName: string; surname: string; idNumber: string; dateOfBirth: string;
  phoneNumber: string; emailAddress: string; province: string; institution: string;
  yearCompleted: string; gender: string; race?: string; highestQualification: string;
  fieldOfStudy: string; programmeType: string; preferredIndustry: string;
  disability?: string; disabilityDetails?: string; currentlyEmployed?: string;
  availableStartDate?: string; previousLearnership?: string; previousLearnershipDetails?: string;
  specialisedField?: string; transportAccess?: string; willingToRelocate?: string;
  idDocument: FileList; cv: FileList; qualifications: FileList;
  sarsLetter: FileList; bankConfirmationLetter: FileList; popiaConsent: boolean;
}

export function CandidateRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<CandidateFormValues>({
    defaultValues: { popiaConsent: false, previousLearnership: 'No', currentlyEmployed: 'No', transportAccess: 'No', willingToRelocate: 'No', disability: 'No' },
  });

  const previousLearnership = watch('previousLearnership');
  const disabilityStatus = watch('disability');

  useEffect(() => {
    if (submitted || submitError) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [submitted, submitError]);

  const onSubmit = async (data: CandidateFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    if (!data.race || data.race === '') {
      setShowConsent(true);
      setPendingData(data as any);
      setIsSubmitting(false);
      return;
    }
    await executeDirectSubmit(data);
  };

  const [showConsent, setShowConsent] = useState(false);
  const [pendingData, setPendingData] = useState<CandidateFormValues | null>(null);

  const confirmProceed = async () => {
    if (!pendingData) return;
    setShowConsent(false);
    setIsSubmitting(true);
    await executeDirectSubmit(pendingData);
  };

  const executeDirectSubmit = async (data: CandidateFormValues) => {
    const WEBHOOK_URL = 'https://script.google.com/a/macros/xmfpartners.co.za/s/AKfycbx4qjxe6efkChMJRDIwZazrgjXjJKGGh8FF_0YlIuJvZVpTvmabV9niCeNnzhWm25s8/exec';

    const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string; name: string }> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve({ base64: (reader.result as string).split(',')[1], mimeType: file.type, name: file.name });
        };
        reader.onerror = (err) => reject(err);
      });

    try {
      const payload: any = { formType: 'Candidate', files: {} };
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'popiaConsent') payload[key] = value ? 'Yes' : 'No';
        else if (!['idDocument', 'cv', 'qualifications', 'sarsLetter', 'bankConfirmationLetter'].includes(key)) {
          payload[key] = String(value ?? '');
        }
      });

      if (data.idDocument?.length > 0) payload.files.idDocument = await fileToBase64(data.idDocument[0]);
      if (data.cv?.length > 0) payload.files.cv = await fileToBase64(data.cv[0]);
      if (data.sarsLetter?.length > 0) payload.files.sarsLetter = await fileToBase64(data.sarsLetter[0]);
      if (data.bankConfirmationLetter?.length > 0) payload.files.bankConfirmationLetter = await fileToBase64(data.bankConfirmationLetter[0]);
      
      if (data.qualifications?.length > 0) {
        payload.files.qualifications = [];
        for (let i = 0; i < data.qualifications.length; i++) {
          payload.files.qualifications.push(await fileToBase64(data.qualifications[i]));
        }
      }

      const resp = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      const json = await resp.json().catch(() => null);
      if (!resp.ok || json?.status === 'error') {
        setSubmitError(json?.message || 'Server rejected payload.');
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
      reset();
    } catch (err) {
      setSubmitError('Failed to connect to the server.');
    } finally {
      setIsSubmitting(false);
      setPendingData(null);
    }
  };

  const inputBaseClass = 'bg-[#0f111a] border border-white/10 text-white placeholder-slate-500 focus:bg-[#0f111a] focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]/20 h-12 font-medium w-full rounded-2xl px-4 transition-all';
  const fileClass = 'bg-[#0f111a] border border-white/10 text-slate-300 h-12 w-full rounded-2xl px-4 py-2.5 text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#f97316] file:text-white hover:file:bg-[#ea680a] cursor-pointer transition-all';

  return (
    <>
      {/* FLOATING DEMO BUTTON - DELETE THIS BLOCK AFTER THE DEMO */}
      <button 
        type="button" 
        onClick={() => reset({
          firstName: 'Demo', surname: 'TopTier', idNumber: '9001015000084', dateOfBirth: '1990-01-01',
          phoneNumber: '0821234567', emailAddress: 'demo@xmfpartners.co.za', province: 'Gauteng', gender: 'Female',
          highestQualification: 'Master of Business Administration', yearCompleted: '2022', fieldOfStudy: 'Business',
          specialisedField: 'Executive', popiaConsent: true, race: 'African', disability: 'No',
          transportAccess: 'Yes', willingToRelocate: 'Yes', currentlyEmployed: 'No', previousLearnership: 'No'
        })}
        className="fixed bottom-8 right-8 z-[100] bg-[#f97316] hover:bg-[#ea680a] text-white font-bold py-3 px-6 rounded-full shadow-2xl flex items-center gap-2 animate-bounce border-2 border-white/20"
      >
        <span>🧪</span> Autofill (Demo)
      </button>

      <div className="w-full max-w-5xl mx-auto bg-[#161925] rounded-[2rem] border border-white/5 p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f97316]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        {/* 4-STEP PROGRESS INDICATOR */}
        <div className="mb-12 relative z-10 hidden sm:block">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#0f111a] rounded-full z-0"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 h-1 bg-[#f97316] rounded-full z-0"></div>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#f97316] text-white flex items-center justify-center font-bold shadow-lg border-4 border-[#161925]">1</div>
              <span className="text-[10px] font-bold text-[#f97316] uppercase tracking-wider">Submit Profile</span>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#0f111a] text-slate-500 flex items-center justify-center font-bold border-4 border-[#161925]">2</div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Auto-Screening</span>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#0f111a] text-slate-500 flex items-center justify-center font-bold border-4 border-[#161925]">3</div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Verification</span>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#0f111a] text-slate-500 flex items-center justify-center font-bold border-4 border-[#161925]">4</div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Interview</span>
            </div>
          </div>
        </div>

        {submitError && (
          <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-200">
            <p className="font-bold text-red-400">Submission Failed</p>
            <p className="text-sm mt-1">{submitError}</p>
          </div>
        )}

        {submitted ? (
          <div className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 p-12 text-center">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
               <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Application Submitted</h2>
            <p className="text-slate-400 text-lg">Your profile has entered the automated screening phase. We will email you regarding your eligibility.</p>
          </div>
        ) : (
          <div className="w-full relative z-10">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-12">
                <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
                  <FormField>
                    <FormLabel className="text-slate-300 font-bold ml-1">First Name</FormLabel>
                    <FormControl><Input placeholder="e.g. Jane" className={inputBaseClass} {...register('firstName', { required: true })} /></FormControl>
                    {errors.firstName && <FormMessage className="text-red-400 ml-1">First name is required.</FormMessage>}
                  </FormField>
                  <FormField>
                    <FormLabel className="text-slate-300 font-bold ml-1">Surname</FormLabel>
                    <FormControl><Input placeholder="e.g. Doe" className={inputBaseClass} {...register('surname', { required: true })} /></FormControl>
                    {errors.surname && <FormMessage className="text-red-400 ml-1">Surname is required.</FormMessage>}
                  </FormField>
                  <FormField>
                    <FormLabel className="text-slate-300 font-bold ml-1">ID Number</FormLabel>
                    <FormControl><Input placeholder="13 digits" className={inputBaseClass} {...register('idNumber', { required: 'ID number is required', validate: (v) => /^\d{13}$/.test(v) || 'Must be exactly 13 digits' })} /></FormControl>
                    {errors.idNumber && <FormMessage className="text-red-400 ml-1">{String(errors.idNumber.message)}</FormMessage>}
                  </FormField>
                  <FormField>
                    <FormLabel className="text-slate-300 font-bold ml-1">Date of Birth</FormLabel>
                    <FormControl><Input type="date" className={inputBaseClass} {...register('dateOfBirth', { required: true })} /></FormControl>
                    {errors.dateOfBirth && <FormMessage className="text-red-400 ml-1">Date of birth is required.</FormMessage>}
                  </FormField>
                  <FormField>
                    <FormLabel className="text-slate-300 font-bold ml-1">Email Address</FormLabel>
                    <FormControl><Input type="email" placeholder="jane.doe@example.com" className={inputBaseClass} {...register('emailAddress', { required: true })} /></FormControl>
                    {errors.emailAddress && <FormMessage className="text-red-400 ml-1">Email address is required.</FormMessage>}
                  </FormField>
                  <FormField>
                    <FormLabel className="text-slate-300 font-bold ml-1">Phone Number</FormLabel>
                    <FormControl><Input type="tel" placeholder="+27 82 123 4567" className={inputBaseClass} {...register('phoneNumber', { required: true })} /></FormControl>
                    {errors.phoneNumber && <FormMessage className="text-red-400 ml-1">Phone number is required.</FormMessage>}
                  </FormField>
                  <FormField>
                    <FormLabel className="text-slate-300 font-bold ml-1">Province</FormLabel>
                    <FormControl>
                      <Select className={inputBaseClass} {...register('province', { required: true })}>
                        <option value="" disabled className="bg-[#0f111a] text-slate-500">Select province</option>
                        {['Eastern Cape','Free State','Gauteng','KwaZulu-Natal','Limpopo','Mpumalanga','Northern Cape','North West','Western Cape'].map(p => <option key={p} value={p} className="bg-[#0f111a] text-slate-200">{p}</option>)}
                      </Select>
                    </FormControl>
                    {errors.province && <FormMessage className="text-red-400 ml-1">Province is required.</FormMessage>}
                  </FormField>
                  <FormField>
                    <FormLabel className="text-slate-300 font-bold ml-1">Gender</FormLabel>
                    <FormControl>
                      <Select className={inputBaseClass} {...register('gender', { required: true })}>
                        <option value="" disabled className="bg-[#0f111a] text-slate-500">Select gender</option>
                        <option value="Female" className="bg-[#0f111a] text-slate-200">Female</option>
                        <option value="Male" className="bg-[#0f111a] text-slate-200">Male</option>
                        <option value="Non-binary" className="bg-[#0f111a] text-slate-200">Non-binary</option>
                        <option value="Prefer not to say" className="bg-[#0f111a] text-slate-200">Prefer not to say</option>
                      </Select>
                    </FormControl>
                    {errors.gender && <FormMessage className="text-red-400 ml-1">Gender is required.</FormMessage>}
                  </FormField>
                </div>

                <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
                  <FormField>
                    <FormLabel className="text-slate-300 font-bold ml-1">Highest Qualification</FormLabel>
                    <FormControl><Input placeholder="e.g. NQF 7 - Bachelor's Degree" className={inputBaseClass} {...register('highestQualification', { required: true })} /></FormControl>
                    {errors.highestQualification && <FormMessage className="text-red-400 ml-1">Qualification is required.</FormMessage>}
                  </FormField>
                  <FormField>
                    <FormLabel className="text-slate-300 font-bold ml-1">Field of Study</FormLabel>
                    <FormControl><Input placeholder="e.g. Business Management" className={inputBaseClass} {...register('fieldOfStudy', { required: true })} /></FormControl>
                    {errors.fieldOfStudy && <FormMessage className="text-red-400 ml-1">Field of study is required.</FormMessage>}
                  </FormField>
                  <FormField>
                    <FormLabel className="text-slate-300 font-bold ml-1">Year Completed</FormLabel>
                    <FormControl><Input placeholder="e.g. 2024" className={inputBaseClass} {...register('yearCompleted', { required: true })} /></FormControl>
                    {errors.yearCompleted && <FormMessage className="text-red-400 ml-1">Year completed is required.</FormMessage>}
                  </FormField>
                  <FormField>
                    <FormLabel className="text-slate-300 font-bold ml-1">Specialised Field</FormLabel>
                    <FormControl><Input placeholder="e.g. Human Resources" className={inputBaseClass} {...register('specialisedField', { required: true })} /></FormControl>
                    {errors.specialisedField && <FormMessage className="text-red-400 ml-1">Specialised field is required.</FormMessage>}
                  </FormField>
                  <FormField className="lg:col-span-2">
                    <FormLabel className="text-slate-300 font-bold ml-1">Current Institution / Employer</FormLabel>
                    <FormControl><Input placeholder="University, college or company" className={inputBaseClass} {...register('institution')} /></FormControl>
                  </FormField>
                  
                  {/* Logistics */}
                  <FormField>
                    <FormLabel className="text-slate-300 font-bold ml-1">Are you currently employed?</FormLabel>
                    <FormControl>
                      <div className="flex gap-4 mt-2">
                        <label className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0f111a] px-4 py-3 text-sm font-bold text-slate-300 cursor-pointer hover:border-[#f97316] transition-colors has-[:checked]:border-[#f97316] has-[:checked]:text-[#f97316]"><input type="radio" value="Yes" className="hidden" {...register('currentlyEmployed')} />Yes</label>
                        <label className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0f111a] px-4 py-3 text-sm font-bold text-slate-300 cursor-pointer hover:border-[#f97316] transition-colors has-[:checked]:border-[#f97316] has-[:checked]:text-[#f97316]"><input type="radio" value="No" className="hidden" {...register('currentlyEmployed')} />No</label>
                      </div>
                    </FormControl>
                  </FormField>
                  <FormField>
                    <FormLabel className="text-slate-300 font-bold ml-1">Reliable Transport?</FormLabel>
                    <FormControl>
                      <div className="flex gap-4 mt-2">
                        <label className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0f111a] px-4 py-3 text-sm font-bold text-slate-300 cursor-pointer hover:border-[#f97316] transition-colors has-[:checked]:border-[#f97316] has-[:checked]:text-[#f97316]"><input type="radio" value="Yes" className="hidden" {...register('transportAccess')} />Yes</label>
                        <label className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0f111a] px-4 py-3 text-sm font-bold text-slate-300 cursor-pointer hover:border-[#f97316] transition-colors has-[:checked]:border-[#f97316] has-[:checked]:text-[#f97316]"><input type="radio" value="No" className="hidden" {...register('transportAccess')} />No</label>
                      </div>
                    </FormControl>
                  </FormField>
                  <FormField>
                    <FormLabel className="text-slate-300 font-bold ml-1">Willing to relocate?</FormLabel>
                    <FormControl>
                      <div className="flex gap-4 mt-2">
                        <label className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0f111a] px-4 py-3 text-sm font-bold text-slate-300 cursor-pointer hover:border-[#f97316] transition-colors has-[:checked]:border-[#f97316] has-[:checked]:text-[#f97316]"><input type="radio" value="Yes" className="hidden" {...register('willingToRelocate')} />Yes</label>
                        <label className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0f111a] px-4 py-3 text-sm font-bold text-slate-300 cursor-pointer hover:border-[#f97316] transition-colors has-[:checked]:border-[#f97316] has-[:checked]:text-[#f97316]"><input type="radio" value="No" className="hidden" {...register('willingToRelocate')} />No</label>
                      </div>
                    </FormControl>
                  </FormField>
                  <FormField>
                    <FormLabel className="text-slate-300 font-bold ml-1">Available Start Date</FormLabel>
                    <FormControl><Input type="date" className={inputBaseClass} {...register('availableStartDate')} /></FormControl>
                  </FormField>
                </div>

                <div className="rounded-3xl border border-white/5 bg-[#0f111a] p-6 md:p-8">
                  <h3 className="text-xl font-bold text-white mb-2">Employment Equity & Compliance</h3>
                  <p className="text-sm text-slate-500 mb-8">Voluntary information to align you with B-BBEE opportunities.</p>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div>
                      <FormLabel className="text-slate-300 font-bold ml-1">Race</FormLabel>
                      <FormControl>
                        <Select className={`${inputBaseClass} mt-2`} {...register('race')}>
                          <option value="" className="bg-[#0f111a] text-slate-500">Prefer not to answer</option>
                          {['African','Coloured','Indian','White','Other'].map(r => <option key={r} value={r} className="bg-[#0f111a] text-slate-200">{r}</option>)}
                        </Select>
                      </FormControl>
                    </div>
                    <div>
                      <FormLabel className="text-slate-300 font-bold ml-1">Disability</FormLabel>
                      <FormControl>
                        <div className="flex gap-4 mt-2">
                          <label className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#161925] px-4 py-3 text-sm font-bold text-slate-300 cursor-pointer hover:border-[#f97316] transition-colors has-[:checked]:border-[#f97316] has-[:checked]:text-[#f97316]"><input type="radio" value="Yes" className="hidden" {...register('disability')} />Yes</label>
                          <label className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#161925] px-4 py-3 text-sm font-bold text-slate-300 cursor-pointer hover:border-[#f97316] transition-colors has-[:checked]:border-[#f97316] has-[:checked]:text-[#f97316]"><input type="radio" value="No" className="hidden" {...register('disability')} />No</label>
                        </div>
                      </FormControl>
                      {disabilityStatus === 'Yes' && (
                        <div className="mt-4"><Input placeholder="Specify disability nature" className={inputBaseClass} {...register('disabilityDetails')} /></div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Mandatory Documents</h3>
                  <p className="text-sm text-slate-500 mb-8">All files must be uploaded to proceed to the screening phase.</p>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <FormField>
                      <FormLabel className="text-slate-300 font-bold ml-1">Certified ID Copy <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input type="file" accept=".pdf,.jpg,.png" className={fileClass} {...register('idDocument', { validate: (f) => (f && f.length > 0) || 'ID document is strictly required.' })} /></FormControl>
                      {errors.idDocument && <FormMessage className="text-red-400 ml-1">{String(errors.idDocument.message)}</FormMessage>}
                    </FormField>
                    <FormField>
                      <FormLabel className="text-slate-300 font-bold ml-1">Updated CV <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input type="file" accept=".pdf,.doc,.docx" className={fileClass} {...register('cv', { validate: (f) => (f && f.length > 0) || 'CV is strictly required.' })} /></FormControl>
                      {errors.cv && <FormMessage className="text-red-400 ml-1">{String(errors.cv.message)}</FormMessage>}
                    </FormField>
                    <FormField>
                      <FormLabel className="text-slate-300 font-bold ml-1">Qualifications <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input type="file" multiple accept=".pdf,.jpg,.png,.zip" className={fileClass} {...register('qualifications', { validate: (f) => (f && f.length > 0) || 'Qualifications are strictly required.' })} /></FormControl>
                      {errors.qualifications && <FormMessage className="text-red-400 ml-1">{String(errors.qualifications.message)}</FormMessage>}
                    </FormField>
                    <FormField>
                      <FormLabel className="text-slate-300 font-bold ml-1">SARS Letter <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input type="file" accept=".pdf,.jpg,.png" className={fileClass} {...register('sarsLetter', { validate: (f) => (f && f.length > 0) || 'SARS letter is strictly required.' })} /></FormControl>
                      {errors.sarsLetter && <FormMessage className="text-red-400 ml-1">{String(errors.sarsLetter.message)}</FormMessage>}
                    </FormField>
                    <FormField className="lg:col-span-2">
                      <FormLabel className="text-slate-300 font-bold ml-1">Bank Confirmation Letter <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input type="file" accept=".pdf,.jpg,.png" className={fileClass} {...register('bankConfirmationLetter', { validate: (f) => (f && f.length > 0) || 'Bank confirmation is strictly required.' })} /></FormControl>
                      {errors.bankConfirmationLetter && <FormMessage className="text-red-400 ml-1">{String(errors.bankConfirmationLetter.message)}</FormMessage>}
                    </FormField>
                  </div>
                </div>

                <div className="rounded-3xl border border-[#f97316]/30 bg-[#f97316]/5 p-6 md:p-8 mt-8">
                  <FormField>
                    <Label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" className="mt-1 h-5 w-5 rounded bg-[#0f111a] border-[#f97316]/50 text-[#f97316] focus:ring-[#f97316]" {...register('popiaConsent', { required: true })} />
                      <span className="text-white text-sm leading-relaxed">
                        I hereby consent to XMF Human Capital Partners collecting, processing, and storing my personal information exclusively for employment and learnership placements in compliance with the POPI Act.
                      </span>
                    </Label>
                    {errors.popiaConsent && <FormMessage className="text-red-400 mt-2 ml-8">You must consent to the privacy policy to submit.</FormMessage>}
                  </FormField>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-end">
                  <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto h-14 px-10 text-lg font-bold bg-[#f97316] text-white hover:bg-[#ea680a] shadow-lg shadow-[#f97316]/20 rounded-2xl transition-all">
                    {isSubmitting ? 'Processing Profile...' : 'Submit Application'}
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </div>
    </>
  );
}