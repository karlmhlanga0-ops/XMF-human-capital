import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select } from '../ui/select';

interface CandidateFormValues {
  fullName: string;
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
  employmentStatus: string;
  programmeType: string;
  preferredIndustry: string;
  disability?: string;
  cv: FileList;
  certificates: FileList;
  popiaConsent: boolean;
}

export function CandidateRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CandidateFormValues>({
    defaultValues: {
      popiaConsent: false,
    }
  });

  useEffect(() => {
    if (submitted || submitError) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [submitted, submitError]);

  const onSubmit = async (data: CandidateFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxp6G21cuRBy6SE5nT1mglnz6rS0Y-MBMKBX9XsvpV7yVe7Hx8uStn6hXD-NvyVaasE/exec';

    const fileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const base64String = result.split(',')[1]; 
            resolve(base64String);
        };
        reader.onerror = error => reject(error);
      });
    };

    try {
      const payload: any = {
        formType: 'Candidate' // Added to route the data in Google Sheets
      };

      Object.keys(data).forEach((key) => {
        const value = data[key as keyof CandidateFormValues];
        if (key !== 'cv' && key !== 'certificates') {
           if (key === 'popiaConsent') {
            payload[key] = value ? 'Yes' : 'No';
          } else {
            payload[key] = String(value);
          }
        }
      });

      if (data.cv && data.cv.length > 0) {
        const cvFile = data.cv[0];
        const cvBase64 = await fileToBase64(cvFile);
        payload.cvBase64 = cvBase64;
        payload.cvMimeType = cvFile.type;
        payload.cvName = cvFile.name;
      }

      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
      reset();

    } catch (error) {
      console.error("Error submitting form", error);
      setSubmitError("There was an issue connecting to the secure server. Please try submitting again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // The base input class for perfect visibility
  const inputBaseClass = "bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-[#3E4CA0] focus:ring-[#3E4CA0]/20 h-12";

  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 p-8 md:p-12 shadow-xl shadow-slate-200/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D76A36]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

      {submitError && (
        <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
          <p className="font-semibold text-red-900">Submission Failed</p>
          <p className="text-sm mt-1">{submitError}</p>
        </div>
      )}

      <div className="mb-10 space-y-3 relative z-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D76A36]">Candidate Registration</p>
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Register to join our talent pipeline.</h2>
        <p className="max-w-3xl text-slate-600 text-lg">
          Complete this form to share your profile, qualifications and career preferences. We match candidates to learnerships, graduate programmes, internships and entry-level roles across South Africa.
        </p>
      </div>

      {!submitted ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-8 lg:grid-cols-2 relative z-10">
            <FormField>
              <FormLabel htmlFor="fullName" className="text-slate-700 font-semibold">Full Name</FormLabel>
              <FormControl>
                <Input id="fullName" placeholder="Jane Doe" className={inputBaseClass} {...register('fullName', { required: true })} />
              </FormControl>
              {errors.fullName && <FormMessage className="text-red-500">Full name is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="idNumber" className="text-slate-700 font-semibold">ID Number</FormLabel>
              <FormControl>
                <Input id="idNumber" placeholder="8001015000084" className={inputBaseClass} {...register('idNumber', { required: true })} />
              </FormControl>
              {errors.idNumber && <FormMessage className="text-red-500">ID number is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="dateOfBirth" className="text-slate-700 font-semibold">Date of Birth</FormLabel>
              <FormControl>
                <Input id="dateOfBirth" type="date" className={inputBaseClass} {...register('dateOfBirth', { required: true })} />
              </FormControl>
              {errors.dateOfBirth && <FormMessage className="text-red-500">Date of birth is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="phoneNumber" className="text-slate-700 font-semibold">Phone Number</FormLabel>
              <FormControl>
                <Input id="phoneNumber" type="tel" placeholder="+27 82 123 4567" className={inputBaseClass} {...register('phoneNumber', { required: true })} />
              </FormControl>
              {errors.phoneNumber && <FormMessage className="text-red-500">Phone number is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="emailAddress" className="text-slate-700 font-semibold">Email Address</FormLabel>
              <FormControl>
                <Input id="emailAddress" type="email" placeholder="jane.doe@example.com" className={inputBaseClass} {...register('emailAddress', { required: true })} />
              </FormControl>
              {errors.emailAddress && <FormMessage className="text-red-500">Email address is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="province" className="text-slate-700 font-semibold">Province</FormLabel>
              <FormControl>
                <Input id="province" placeholder="Gauteng" className={inputBaseClass} {...register('province', { required: true })} />
              </FormControl>
              {errors.province && <FormMessage className="text-red-500">Province is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="institution" className="text-slate-700 font-semibold">Institution</FormLabel>
              <FormControl>
                <Input id="institution" placeholder="University of Pretoria" className={inputBaseClass} {...register('institution', { required: true })} />
              </FormControl>
              {errors.institution && <FormMessage className="text-red-500">Institution is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="yearCompleted" className="text-slate-700 font-semibold">Year Completed / Current Year</FormLabel>
              <FormControl>
                <Input id="yearCompleted" placeholder="2024 / 2nd Year" className={inputBaseClass} {...register('yearCompleted', { required: true })} />
              </FormControl>
              {errors.yearCompleted && <FormMessage className="text-red-500">Year completed or current year is required.</FormMessage>}
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
              {errors.gender && <FormMessage className="text-red-500">Gender selection is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="race" className="text-slate-700 font-semibold">Race (optional)</FormLabel>
              <FormControl>
                <Select id="race" defaultValue="" className={inputBaseClass} {...register('race')}>
                  <option value="">Prefer not to answer</option>
                  <option value="African">African</option>
                  <option value="Coloured">Coloured</option>
                  <option value="Indian">Indian</option>
                  <option value="White">White</option>
                </Select>
              </FormControl>
            </FormField>

            <FormField>
              <FormLabel htmlFor="highestQualification" className="text-slate-700 font-semibold">Highest Qualification</FormLabel>
              <FormControl>
                <Select id="highestQualification" defaultValue="" className={inputBaseClass} {...register('highestQualification', { required: true })}>
                  <option value="" disabled>Select qualification</option>
                  <option value="Grade 11 or lower">Grade 11 or lower</option>
                  <option value="Matric (National Senior Certificate)">Matric (National Senior Certificate)</option>
                  <option value="N3 / N4 / N5 / N6 Certificate">N3 / N4 / N5 / N6 Certificate</option>
                  <option value="Higher Certificate (NQF 5)">Higher Certificate (NQF 5)</option>
                  <option value="National Diploma (NQF 6)">National Diploma (NQF 6)</option>
                  <option value="Bachelor's Degree (NQF 7)">Bachelor's Degree (NQF 7)</option>
                  <option value="Honours Degree / Postgrad (NQF 8+)">Honours Degree / Postgrad (NQF 8+)</option>
                </Select>
              </FormControl>
              {errors.highestQualification && <FormMessage className="text-red-500">This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="fieldOfStudy" className="text-slate-700 font-semibold">Field of Study</FormLabel>
              <FormControl>
                <Select id="fieldOfStudy" defaultValue="" className={inputBaseClass} {...register('fieldOfStudy', { required: true })}>
                  <option value="" disabled>Select field of study</option>
                  <option value="Information Technology / Computer Science">Information Technology / Computer Science</option>
                  <option value="Business Administration / Management">Business Administration / Management</option>
                  <option value="Accounting / Finance">Accounting / Finance</option>
                  <option value="Engineering / Artisan Trades">Engineering / Artisan Trades</option>
                  <option value="Human Resources / Industrial Psychology">Human Resources / Industrial Psychology</option>
                  <option value="Marketing / Communications">Marketing / Communications</option>
                  <option value="Retail / Sales">Retail / Sales</option>
                  <option value="Logistics / Supply Chain">Logistics / Supply Chain</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
              {errors.fieldOfStudy && <FormMessage className="text-red-500">This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="employmentStatus" className="text-slate-700 font-semibold">Employment Status</FormLabel>
              <FormControl>
                <Select id="employmentStatus" defaultValue="" className={inputBaseClass} {...register('employmentStatus', { required: true })}>
                  <option value="" disabled>Select employment status</option>
                  <option value="Unemployed (Never worked)">Unemployed (Never worked)</option>
                  <option value="Unemployed (Previously worked)">Unemployed (Previously worked)</option>
                  <option value="Currently Employed (Full-time)">Currently Employed (Full-time)</option>
                  <option value="Currently Employed (Part-time / Contract)">Currently Employed (Part-time / Contract)</option>
                  <option value="Self-Employed">Self-Employed</option>
                  <option value="Student / Learner">Student / Learner</option>
                </Select>
              </FormControl>
              {errors.employmentStatus && <FormMessage className="text-red-500">This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="programmeType" className="text-slate-700 font-semibold">Interested Programme Type</FormLabel>
              <FormControl>
                <Select id="programmeType" defaultValue="" className={inputBaseClass} {...register('programmeType', { required: true })}>
                  <option value="" disabled>Select programme type</option>
                  <option value="Learnership">Learnership</option>
                  <option value="Graduate Programme">Graduate Programme</option>
                  <option value="Internship">Internship</option>
                  <option value="Permanent Role">Permanent Role</option>
                </Select>
              </FormControl>
              {errors.programmeType && <FormMessage className="text-red-500">This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="preferredIndustry" className="text-slate-700 font-semibold">Preferred Industry</FormLabel>
              <FormControl>
                <Select id="preferredIndustry" defaultValue="" className={inputBaseClass} {...register('preferredIndustry', { required: true })}>
                  <option value="" disabled>Select preferred industry</option>
                  <option value="Financial Services / Banking">Financial Services / Banking</option>
                  <option value="Information Technology / Tech">Information Technology / Tech</option>
                  <option value="Retail / FMCG">Retail / FMCG</option>
                  <option value="Mining / Engineering">Mining / Engineering</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Telecommunications">Telecommunications</option>
                  <option value="Business Consulting / HR">Business Consulting / HR</option>
                  <option value="Public Sector / NGO">Public Sector / NGO</option>
                </Select>
              </FormControl>
              {errors.preferredIndustry && <FormMessage className="text-red-500">This field is required.</FormMessage>}
            </FormField>

            <FormField className="lg:col-span-2">
              <FormLabel htmlFor="disability" className="text-slate-700 font-semibold">Do you have a disability? (Optional)</FormLabel>
              <FormControl>
                <Input id="disability" placeholder="If yes, please specify" className={inputBaseClass} {...register('disability')} />
              </FormControl>
            </FormField>

            <FormField className="lg:col-span-2">
              <FormLabel htmlFor="cv" className="text-slate-700 font-semibold">Upload CV</FormLabel>
              <FormControl>
                <Input id="cv" type="file" accept=".pdf,.doc,.docx" className={`pt-2.5 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#3E4CA0]/10 file:text-[#3E4CA0] hover:file:bg-[#3E4CA0]/20 ${inputBaseClass}`} {...register('cv', { required: true })} />
              </FormControl>
              {errors.cv && <FormMessage className="text-red-500">CV upload is required.</FormMessage>}
            </FormField>

            <FormField className="lg:col-span-2">
              <FormLabel htmlFor="certificates" className="text-slate-700 font-semibold">Upload Certificates</FormLabel>
              <FormControl>
                <Input id="certificates" type="file" accept=".pdf,.doc,.docx" className={`pt-2.5 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#3E4CA0]/10 file:text-[#3E4CA0] hover:file:bg-[#3E4CA0]/20 ${inputBaseClass}`} {...register('certificates')} />
              </FormControl>
            </FormField>
          </div>

          <FormItem className="mt-8 border-t border-slate-100 pt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Label className="flex items-start gap-3 cursor-pointer">
                <Checkbox className="mt-1 border-slate-300 text-[#3E4CA0] focus:ring-[#3E4CA0]" {...register('popiaConsent', { required: true })} />
                <span className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                  I consent to XMF Human Capital Partners processing my information in line with POPIA.
                </span>
              </Label>
              {errors.popiaConsent && <FormMessage className="text-red-500 whitespace-nowrap">Consent is required.</FormMessage>}
            </div>
          </FormItem>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mt-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D76A36]">Next step</p>
              <p className="text-sm text-slate-600">
                Once submitted, our team will review your profile and connect you with matching opportunities.
              </p>
            </div>
            <Button type="submit" disabled={isSubmitting} className="bg-[#D76A36] hover:bg-[#b85a2d] text-white px-8 py-6 h-auto text-base font-semibold shadow-lg transition-all whitespace-nowrap">
              {isSubmitting ? "Submitting securely..." : "Submit candidate profile"}
            </Button>
          </div>
        </Form>
      ) : (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-12 text-center shadow-sm relative z-10">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mb-4 text-3xl font-bold text-slate-900">Application Received!</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Thank you! Your information and documents have been securely uploaded to our system. A member of our candidate team will review your profile and be in touch soon.
          </p>
        </div>
      )}
    </div>
  );
}