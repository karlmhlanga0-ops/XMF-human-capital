import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Label } from '../ui/label';

interface CandidateFormValues {
  firstName: string;
  surname: string;
  idNumber: string;
  dateOfBirth: string;
  phoneNumber: string;
  emailAddress: string;
  province: string;
  institution: string;
  yearCompleted: string;
  gender: string;
  race?: string;
  highestQualification: string;
  fieldOfStudy: string;
  programmeType: string;
  preferredIndustry: string;
  disability?: string;
  disabilityDetails?: string;
  currentlyEmployed?: string;
  availableStartDate?: string;
  previousLearnership?: string;
  previousLearnershipDetails?: string;
  specialisedField?: string;
  transportAccess?: string;
  willingToRelocate?: string;
  idDocument?: FileList;
  cv?: FileList;
  qualifications?: FileList;
  popiaConsent: boolean;
}

export function CandidateRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<CandidateFormValues>({
    defaultValues: { popiaConsent: false, previousLearnership: 'No', currentlyEmployed: 'No', transportAccess: 'No', willingToRelocate: 'No' },
  });

  const previousLearnership = watch('previousLearnership');

  useEffect(() => {
    if (submitted || submitError) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [submitted, submitError]);

  const onSubmit = async (data: CandidateFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    // Consent modal flow handled outside: if race or disability missing, show modal
    if (!data.race || data.race === '') {
      setShowConsent(true);
      setPendingData(data as any);
      setIsSubmitting(false);
      return;
    }
    if (!data.disability || data.disability === '') {
      setShowConsent(true);
      setPendingData(data as any);
      setIsSubmitting(false);
      return;
    }

    const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxp6G21cuRBy6SE5nT1mglnz6rS0Y-MBMKBX9XsvpV7yVe7Hx8uStn6hXD-NvyVaasE/exec';

    const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string; name: string }> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const result = reader.result as string;
          const base64String = result.split(',')[1];
          resolve({ base64: base64String, mimeType: file.type, name: file.name });
        };
        reader.onerror = (err) => reject(err);
      });

    try {
      const payload: any = { formType: 'Candidate', files: {} };

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'popiaConsent') payload[key] = value ? 'Yes' : 'No';
        else if (key !== 'idDocument' && key !== 'cv' && key !== 'qualifications') payload[key] = String(value ?? '');
      });

      if (data.idDocument && data.idDocument.length > 0) {
        payload.files.idDocument = await fileToBase64(data.idDocument[0]);
      }
      if (data.cv && data.cv.length > 0) {
        payload.files.cv = await fileToBase64(data.cv[0]);
      }
      if (data.qualifications && data.qualifications.length > 0) {
        payload.files.qualifications = [];
        for (let i = 0; i < data.qualifications.length; i += 1) {
          // eslint-disable-next-line no-await-in-loop
          payload.files.qualifications.push(await fileToBase64(data.qualifications[i]));
        }
      }

      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
      reset();
    } catch (err) {
      console.error(err);
      setSubmitError('There was an issue connecting to the secure server. Please try submitting again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [showConsent, setShowConsent] = useState(false);
  const [pendingData, setPendingData] = useState<CandidateFormValues | null>(null);

  const confirmProceed = async () => {
    if (!pendingData) return;
    setShowConsent(false);
    setIsSubmitting(true);
    await onSubmitConfirmed(pendingData);
  };

  const onSubmitConfirmed = async (data: CandidateFormValues) => {
    // reuse previous onSubmit logic but bypass consent checks
    try {
      const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxp6G21cuRBy6SE5nT1mglnz6rS0Y-MBMKBX9XsvpV7yVe7Hx8uStn6hXD-NvyVaasE/exec';

      const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string; name: string }> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const result = reader.result as string;
            const base64String = result.split(',')[1];
            resolve({ base64: base64String, mimeType: file.type, name: file.name });
          };
          reader.onerror = (err) => reject(err);
        });

      const payload: any = { formType: 'Candidate', files: {} };
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'popiaConsent') payload[key] = value ? 'Yes' : 'No';
        else if (key !== 'idDocument' && key !== 'cv' && key !== 'qualifications') payload[key] = String(value ?? '');
      });

      if (data.idDocument && data.idDocument.length > 0) {
        payload.files.idDocument = await fileToBase64(data.idDocument[0]);
      }
      if (data.cv && data.cv.length > 0) {
        payload.files.cv = await fileToBase64(data.cv[0]);
      }
      if (data.qualifications && data.qualifications.length > 0) {
        payload.files.qualifications = [];
        for (let i = 0; i < data.qualifications.length; i += 1) {
          // eslint-disable-next-line no-await-in-loop
          payload.files.qualifications.push(await fileToBase64(data.qualifications[i]));
        }
      }

      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
      reset();
    } catch (err) {
      console.error(err);
      setSubmitError('There was an issue connecting to the secure server. Please try submitting again.');
    } finally {
      setIsSubmitting(false);
      setPendingData(null);
    }
  };

  const inputBaseClass =
    'bg-slate-50 border border-slate-400 text-slate-900 placeholder-slate-500 focus:bg-white focus:border-[#f97316] focus:ring-[#f97316]/20 h-12 font-medium w-full rounded-2xl px-4';

  const idNumberValidation = (value: string) => (/^\d{13}$/.test(value) ? true : 'ID Number must be exactly 13 digits');

  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 p-8 md:p-12 shadow-xl shadow-slate-200/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

      {submitError && (
        <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
          <p className="font-semibold text-red-900">Submission Failed</p>
          <p className="text-sm mt-1">{submitError}</p>
        </div>
      )}

      {submitted ? (
        <div className="rounded-[2rem] border border-[#f97316]/20 bg-[#f97316]/5 p-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Submitted</h2>
          <p className="text-slate-600">Thank you! Your details have been sent and will be reviewed by our team.</p>
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          {showConsent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative z-60 w-full max-w-lg rounded-2xl bg-white p-8">
                <h3 className="text-xl font-semibold text-slate-900">Providing demographic information is voluntary</h3>
                <p className="mt-4 text-slate-700">Providing demographic information is voluntary, but helps us match you with specialized B-BBEE and Employment Equity opportunities. Do you want to proceed without providing this?</p>
                <div className="mt-6 flex justify-end gap-3">
                  <button type="button" onClick={() => setShowConsent(false)} className="rounded-2xl px-4 py-2 bg-slate-100">Go Back</button>
                  <button type="button" onClick={confirmProceed} className="rounded-2xl px-4 py-2 bg-[#f97316] text-white">Proceed Anyway</button>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-10">
            <div className="grid gap-8 lg:grid-cols-2">
              <FormField>
                <FormLabel htmlFor="firstName" className="text-slate-700 font-semibold">First Name</FormLabel>
                <FormControl>
                  <Input id="firstName" placeholder="Jane" className={inputBaseClass} {...register('firstName', { required: true })} />
                </FormControl>
                {errors.firstName && <FormMessage className="text-red-500">First name is required.</FormMessage>}
              </FormField>

              <FormField>
                <FormLabel htmlFor="surname" className="text-slate-700 font-semibold">Surname</FormLabel>
                <FormControl>
                  <Input id="surname" placeholder="Doe" className={inputBaseClass} {...register('surname', { required: true })} />
                </FormControl>
                {errors.surname && <FormMessage className="text-red-500">Surname is required.</FormMessage>}
              </FormField>

              <FormField>
                <FormLabel htmlFor="idNumber" className="text-slate-700 font-semibold">ID Number</FormLabel>
                <FormControl>
                  <Input id="idNumber" placeholder="8001015000084" className={inputBaseClass} {...register('idNumber', { required: 'ID number is required', validate: idNumberValidation })} />
                </FormControl>
                {errors.idNumber && <FormMessage className="text-red-500">{String(errors.idNumber.message)}</FormMessage>}
              </FormField>

              <FormField>
                <FormLabel htmlFor="dateOfBirth" className="text-slate-700 font-semibold">Date of Birth</FormLabel>
                <FormControl>
                  <Input id="dateOfBirth" type="date" className={inputBaseClass} {...register('dateOfBirth', { required: true })} />
                </FormControl>
                {errors.dateOfBirth && <FormMessage className="text-red-500">Date of birth is required.</FormMessage>}
              </FormField>

              <FormField>
                <FormLabel htmlFor="emailAddress" className="text-slate-700 font-semibold">Email Address</FormLabel>
                <FormControl>
                  <Input id="emailAddress" type="email" placeholder="jane.doe@example.com" className={inputBaseClass} {...register('emailAddress', { required: true })} />
                </FormControl>
                {errors.emailAddress && <FormMessage className="text-red-500">Email address is required.</FormMessage>}
              </FormField>

              <FormField>
                <FormLabel htmlFor="phoneNumber" className="text-slate-700 font-semibold">Phone Number</FormLabel>
                <FormControl>
                  <Input id="phoneNumber" type="tel" placeholder="+27 82 123 4567" className={inputBaseClass} {...register('phoneNumber', { required: true })} />
                </FormControl>
                {errors.phoneNumber && <FormMessage className="text-red-500">Phone number is required.</FormMessage>}
              </FormField>

              <FormField>
                <FormLabel htmlFor="province" className="text-slate-700 font-semibold">Which province are you currently based in?</FormLabel>
                <FormControl>
                  <Select id="province" defaultValue="" className={inputBaseClass} {...register('province', { required: true })}>
                    <option value="" disabled>Select province</option>
                    <option value="Eastern Cape">Eastern Cape</option>
                    <option value="Free State">Free State</option>
                    <option value="Gauteng">Gauteng</option>
                    <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                    <option value="Limpopo">Limpopo</option>
                    <option value="Mpumalanga">Mpumalanga</option>
                    <option value="Northern Cape">Northern Cape</option>
                    <option value="North West">North West</option>
                    <option value="Western Cape">Western Cape</option>
                  </Select>
                </FormControl>
                {errors.province && <FormMessage className="text-red-500">Province is required.</FormMessage>}
              </FormField>

              <FormField>
                <FormLabel htmlFor="gender" className="text-slate-700 font-semibold">Gender</FormLabel>
                <FormControl>
                  <Select id="gender" defaultValue="" className={inputBaseClass} {...register('gender', { required: true })}>
                    <option value="" disabled>Select gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </Select>
                </FormControl>
                {errors.gender && <FormMessage className="text-red-500">Gender is required.</FormMessage>}
              </FormField>

              <FormField>
                <FormLabel htmlFor="highestQualification" className="text-slate-700 font-semibold">What is your highest completed qualification?</FormLabel>
                <FormControl>
                  <Input id="highestQualification" placeholder="e.g. NQF 7 - Bachelor's Degree" className={inputBaseClass} {...register('highestQualification', { required: true })} />
                </FormControl>
                {errors.highestQualification && <FormMessage className="text-red-500">Highest qualification is required.</FormMessage>}
              </FormField>

              <FormField>
                <FormLabel htmlFor="yearCompleted" className="text-slate-700 font-semibold">Year completed</FormLabel>
                <FormControl>
                  <Input id="yearCompleted" placeholder="e.g. 2024" className={inputBaseClass} {...register('yearCompleted', { required: true })} />
                </FormControl>
                {errors.yearCompleted && <FormMessage className="text-red-500">Year completed is required.</FormMessage>}
              </FormField>

              <FormField>
                <FormLabel htmlFor="fieldOfStudy" className="text-slate-700 font-semibold">Field of Study</FormLabel>
                <FormControl>
                  <Input id="fieldOfStudy" placeholder="e.g. Business Management" className={inputBaseClass} {...register('fieldOfStudy', { required: true })} />
                </FormControl>
                {errors.fieldOfStudy && <FormMessage className="text-red-500">Field of study is required.</FormMessage>}
              </FormField>

              <FormField>
                <FormLabel htmlFor="preferredIndustry" className="text-slate-700 font-semibold">Preferred Industry</FormLabel>
                <FormControl>
                  <Input id="preferredIndustry" placeholder="e.g. Financial Services" className={inputBaseClass} {...register('preferredIndustry')} />
                </FormControl>
              </FormField>

              <FormField>
                <FormLabel htmlFor="availableStartDate" className="text-slate-700 font-semibold">When are you available to start?</FormLabel>
                <FormControl>
                  <Input id="availableStartDate" type="date" className={inputBaseClass} {...register('availableStartDate')} />
                </FormControl>
              </FormField>

              <FormField>
                <FormLabel htmlFor="specialisedField" className="text-slate-700 font-semibold">What field did you specialise in?</FormLabel>
                <FormControl>
                  <Input id="specialisedField" placeholder="e.g. Human Resources" className={inputBaseClass} {...register('specialisedField', { required: true })} />
                </FormControl>
                {errors.specialisedField && <FormMessage className="text-red-500">Specialised field is required.</FormMessage>}
              </FormField>

              <FormField>
                <FormLabel className="text-slate-700 font-semibold">Are you currently employed?</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-6 mt-2">
                    <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <input type="radio" value="Yes" {...register('currentlyEmployed')} />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <input type="radio" value="No" defaultChecked {...register('currentlyEmployed')} />
                      No
                    </label>
                  </div>
                </FormControl>
              </FormField>

              <FormField>
                <FormLabel className="text-slate-700 font-semibold">Have you previously participated in a learnership?</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-6 mt-2">
                    <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <input type="radio" value="Yes" {...register('previousLearnership')} />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <input type="radio" value="No" defaultChecked {...register('previousLearnership')} />
                      No
                    </label>
                  </div>
                  {previousLearnership === 'Yes' && (
                    <div className="mt-4">
                      <Input id="previousLearnershipDetails" placeholder="Please share the learnership details" className={inputBaseClass} {...register('previousLearnershipDetails')} />
                    </div>
                  )}
                </FormControl>
              </FormField>

              <FormField>
                <FormLabel className="text-slate-700 font-semibold">Do you have reliable access to transport?</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-6 mt-2">
                    <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <input type="radio" value="Yes" {...register('transportAccess')} />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <input type="radio" value="No" defaultChecked {...register('transportAccess')} />
                      No
                    </label>
                  </div>
                </FormControl>
              </FormField>

              <FormField>
                <FormLabel className="text-slate-700 font-semibold">Are you willing to relocate?</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-6 mt-2">
                    <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <input type="radio" value="Yes" {...register('willingToRelocate')} />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <input type="radio" value="No" defaultChecked {...register('willingToRelocate')} />
                      No
                    </label>
                  </div>
                </FormControl>
              </FormField>

              <FormField className="lg:col-span-2">
                <FormLabel htmlFor="institution" className="text-slate-700 font-semibold">Current Institution / Employer</FormLabel>
                <FormControl>
                  <Input id="institution" placeholder="University, college or company" className={inputBaseClass} {...register('institution')} />
                </FormControl>
              </FormField>

              <FormField className="lg:col-span-2">
                <FormLabel htmlFor="programmeType" className="text-slate-700 font-semibold">Preferred Programme / Industry</FormLabel>
                <FormControl>
                  <Input id="programmeType" placeholder="e.g. Learnership, Graduate Programme" className={inputBaseClass} {...register('programmeType')} />
                </FormControl>
              </FormField>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-100 p-6">
              <p className="text-slate-900 font-semibold">Files too large or need splitting? Use <a href="https://www.ilovepdf.com/split_pdf" target="_blank" rel="noreferrer" className="text-slate-900 underline">iLovePDF</a> before uploading.</p>
            </div>

            {/* Employment Equity & Compliance Section */}
            <div className="rounded-3xl border border-slate-200 bg-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Employment Equity & Compliance</h3>
              <p className="text-sm text-slate-700 mb-6">Your race and disability information is voluntary and helps us place you in equity-aligned roles.</p>
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <FormLabel className="text-slate-900 font-semibold">Race</FormLabel>
                  <FormControl>
                    <Select {...register('race')} className={inputBaseClass}>
                      <option value="">Prefer not to answer</option>
                      <option value="African">African</option>
                      <option value="Coloured">Coloured</option>
                      <option value="Indian">Indian</option>
                      <option value="White">White</option>
                      <option value="Other">Other</option>
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <FormLabel className="text-slate-900 font-semibold">Disability</FormLabel>
                  <FormControl>
                    <div className="flex gap-6 items-center mt-2">
                      <label className="flex items-center gap-2 text-slate-900">
                        <input type="radio" value="Yes" {...register('disability')} />
                        <span className="text-sm">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 text-slate-900">
                        <input type="radio" value="No" defaultChecked {...register('disability')} />
                        <span className="text-sm">No</span>
                      </label>
                    </div>
                    {watch('disability') === 'Yes' && (
                      <div className="mt-3">
                        <Input id="disabilityDetails" placeholder="Please specify the nature of your disability" className={inputBaseClass} {...register('disabilityDetails', { required: 'Please specify your disability' })} />
                        {errors.disabilityDetails && <FormMessage className="text-red-500">{String(errors.disabilityDetails.message)}</FormMessage>}
                      </div>
                    )}
                  </FormControl>
                </div>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <FormField>
                <FormLabel htmlFor="idDocument" className="text-slate-700 font-semibold">ID Document</FormLabel>
                <FormControl>
                  <Input id="idDocument" type="file" accept=".pdf,.jpg,.png" className={`${inputBaseClass} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f97316]/10 file:text-[#f97316] hover:file:bg-[#f97316]/20`} {...register('idDocument', { required: 'ID document is required' })} />
                </FormControl>
                {errors.idDocument && <FormMessage className="text-red-500">{String(errors.idDocument.message)}</FormMessage>}
              </FormField>

              <FormField>
                <FormLabel htmlFor="cv" className="text-slate-700 font-semibold">CV</FormLabel>
                <FormControl>
                  <Input id="cv" type="file" accept=".pdf,.doc,.docx" className={`${inputBaseClass} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f97316]/10 file:text-[#f97316] hover:file:bg-[#f97316]/20`} {...register('cv', { required: true })} />
                </FormControl>
                {errors.cv && <FormMessage className="text-red-500">CV upload is required.</FormMessage>}
              </FormField>

              <FormField>
                <FormLabel htmlFor="qualifications" className="text-slate-700 font-semibold">Qualifications</FormLabel>
                <FormControl>
                  <Input id="qualifications" type="file" multiple accept=".pdf,.doc,.docx,.zip" className={`${inputBaseClass} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f97316]/10 file:text-[#f97316] hover:file:bg-[#f97316]/20`} {...register('qualifications', { required: 'Qualifications are required' })} />
                </FormControl>
                {errors.qualifications && <FormMessage className="text-red-500">{String(errors.qualifications.message)}</FormMessage>}
                <p className="text-xs text-slate-500 mt-1">Attach individual qualification files or a combined archive.</p>
              </FormField>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <FormField>
                <Label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#f97316] focus:ring-[#f97316]" {...register('popiaConsent', { required: true })} />
                  <span className="text-slate-700 text-sm">I agree to the POPIA privacy and information processing policy.</span>
                </Label>
                {errors.popiaConsent && <FormMessage className="text-red-500">You must consent before submitting.</FormMessage>}
              </FormField>

              <div className="flex items-end justify-end">
                <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-[#f97316] text-white hover:bg-[#ea680a]">
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </div>
  );
}
