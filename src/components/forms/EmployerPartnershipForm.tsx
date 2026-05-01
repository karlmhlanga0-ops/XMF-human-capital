import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface EmployerFormValues {
  organisationName: string;
  industrySector: string;
  contactPerson: string;
  jobTitle: string;
  emailAddress: string;
  phoneNumber: string;
  provinceLocation: string;
  supportRequired: string[];
  estimatedNumber: string;
  programmeRoleType: string;
  preferredStartDate: string;
  bbbeeLink: string;
  additionalInformation: string;
  preferredNextStep: string;
  consentToContact: boolean;
}

const supportOptions = [
  'Learnership Candidate Sourcing',
  'Graduate Programme Recruitment',
  'Internship Pipeline Support',
  'Early-Career Talent Placement',
  'Transformation-Aligned Hiring Support',
  'Leadership / Specialist Talent Identification',
  'Other',
];

export function EmployerPartnershipForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EmployerFormValues>({
    defaultValues: { consentToContact: false }
  });

  useEffect(() => {
    if (submitted || submitError) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [submitted, submitError]);

  const onSubmit = async (data: EmployerFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxp6G21cuRBy6SE5nT1mglnz6rS0Y-MBMKBX9XsvpV7yVe7Hx8uStn6hXD-NvyVaasE/exec';

    try {
      const payload: any = {
        formType: 'Employer' 
      };

      Object.keys(data).forEach((key) => {
        const value = data[key as keyof EmployerFormValues];
        if (Array.isArray(value)) {
          payload[key] = value.join(', ');
        } else if (typeof value === 'boolean') {
          payload[key] = value ? 'Yes' : 'No';
        } else {
          payload[key] = String(value);
        }
      });

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

  // Base class forces text-slate-900. 
  const inputBaseClass = "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-[#D76A36] focus:ring-[#D76A36]/20 h-12 font-medium w-full";

  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 p-8 md:p-12 shadow-xl shadow-slate-200/50 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#3E4CA0]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

      {submitError && (
        <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
          <p className="font-semibold text-red-900">Submission Failed</p>
          <p className="text-sm mt-1">{submitError}</p>
        </div>
      )}

      <div className="mb-10 space-y-3 relative z-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3E4CA0]">Employer Partnership</p>
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Partner with us to scale your talent pipeline.</h2>
        <p className="max-w-3xl text-slate-600 text-lg">
          Share your employer needs and we will help you access learners, graduates, interns and skilled candidates aligned to your transformation goals.
        </p>
      </div>

      {!submitted ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-8 lg:grid-cols-2 relative z-10">
            
            {/* ... standard inputs ... */}
            <FormField>
              <FormLabel htmlFor="organisationName" className="text-slate-700 font-semibold">Organisation Name</FormLabel>
              <FormControl>
                <Input id="organisationName" placeholder="Example Holdings" className={inputBaseClass} {...register('organisationName', { required: true })} />
              </FormControl>
              {errors.organisationName && <FormMessage className="text-red-500">This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="industrySector" className="text-slate-700 font-semibold">Industry Sector</FormLabel>
              <FormControl>
                <Input id="industrySector" placeholder="Financial Services" className={inputBaseClass} {...register('industrySector', { required: true })} />
              </FormControl>
              {errors.industrySector && <FormMessage className="text-red-500">This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="contactPerson" className="text-slate-700 font-semibold">Contact Person (Full Name)</FormLabel>
              <FormControl>
                <Input id="contactPerson" placeholder="Thabo Mokoena" className={inputBaseClass} {...register('contactPerson', { required: true })} />
              </FormControl>
              {errors.contactPerson && <FormMessage className="text-red-500">This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="jobTitle" className="text-slate-700 font-semibold">Job Title</FormLabel>
              <FormControl>
                <Input id="jobTitle" placeholder="HR Manager" className={inputBaseClass} {...register('jobTitle', { required: true })} />
              </FormControl>
              {errors.jobTitle && <FormMessage className="text-red-500">This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="emailAddress" className="text-slate-700 font-semibold">Email Address</FormLabel>
              <FormControl>
                <Input id="emailAddress" type="email" placeholder="contact@company.co.za" className={inputBaseClass} {...register('emailAddress', { required: true })} />
              </FormControl>
              {errors.emailAddress && <FormMessage className="text-red-500">Email address is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="phoneNumber" className="text-slate-700 font-semibold">Phone Number</FormLabel>
              <FormControl>
                <Input id="phoneNumber" type="tel" placeholder="+27 11 123 4567" className={inputBaseClass} {...register('phoneNumber', { required: true })} />
              </FormControl>
              {errors.phoneNumber && <FormMessage className="text-red-500">Phone number is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="provinceLocation" className="text-slate-700 font-semibold">Province / Location</FormLabel>
              <FormControl>
                <Input id="provinceLocation" placeholder="Western Cape" className={inputBaseClass} {...register('provinceLocation', { required: true })} />
              </FormControl>
              {errors.provinceLocation && <FormMessage className="text-red-500">This field is required.</FormMessage>}
            </FormField>

            {/* Fixed Checkbox Sizing */}
            <FormField className="lg:col-span-2">
              <FormLabel className="text-slate-700 font-semibold block mb-4">Type of Support Required</FormLabel>
              <div className="grid gap-3 sm:grid-cols-2">
                {supportOptions.map((option) => (
                  <Label key={option} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-[#1E254C]/40 cursor-pointer">
                    <Checkbox value={option} className="h-5 w-5 shrink-0 border-slate-300 text-[#D76A36] focus:ring-[#D76A36] bg-white" {...register('supportRequired')} />
                    <span className="font-medium">{option}</span>
                  </Label>
                ))}
              </div>
              {errors.supportRequired && <FormMessage className="text-red-500 mt-2">Please select at least one support type.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="estimatedNumber" className="text-slate-700 font-semibold">Estimated Number of Candidates</FormLabel>
              <FormControl>
                <Input id="estimatedNumber" placeholder="e.g. 20" className={inputBaseClass} {...register('estimatedNumber', { required: true })} />
              </FormControl>
              {errors.estimatedNumber && <FormMessage className="text-red-500">This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="programmeRoleType" className="text-slate-700 font-semibold">Programme / Role Type</FormLabel>
              <FormControl>
                <Input id="programmeRoleType" placeholder="Graduate programme / Learnership" className={inputBaseClass} {...register('programmeRoleType', { required: true })} />
              </FormControl>
              {errors.programmeRoleType && <FormMessage className="text-red-500">This field is required.</FormMessage>}
            </FormField>

            {/* FIXED: Date Input styling */}
            <FormField>
              <FormLabel htmlFor="preferredStartDate" className="text-slate-700 font-semibold">Preferred Start Date</FormLabel>
              <FormControl>
                <Input id="preferredStartDate" type="date" className={`${inputBaseClass} text-slate-900 block`} style={{ color: '#0f172a' }} {...register('preferredStartDate', { required: true })} />
              </FormControl>
              {errors.preferredStartDate && <FormMessage className="text-red-500">This field is required.</FormMessage>}
            </FormField>

            {/* FIXED: Select Input styling */}
            <FormField>
              <FormLabel htmlFor="bbbeeLink" className="text-slate-700 font-semibold">Linked to Skills / B-BBEE targets?</FormLabel>
              <FormControl>
                <Select id="bbbeeLink" defaultValue="" className={`${inputBaseClass} text-slate-900 appearance-none`} style={{ color: '#0f172a' }} {...register('bbbeeLink', { required: true })}>
                  <option value="" disabled className="text-slate-500">Select option</option>
                  <option value="Yes" className="text-slate-900">Yes</option>
                  <option value="No" className="text-slate-900">No</option>
                  <option value="Unsure" className="text-slate-900">Unsure</option>
                </Select>
              </FormControl>
              {errors.bbbeeLink && <FormMessage className="text-red-500">This field is required.</FormMessage>}
            </FormField>

            <FormField className="lg:col-span-2">
              <FormLabel htmlFor="additionalInformation" className="text-slate-700 font-semibold">Additional Information</FormLabel>
              <FormControl>
                <Textarea id="additionalInformation" placeholder="Please share any context, timelines or candidate profile detail" className={`${inputBaseClass} min-h-[120px] resize-y p-4 text-slate-900`} {...register('additionalInformation')} />
              </FormControl>
            </FormField>

            {/* FIXED: Select Input styling */}
            <FormField className="lg:col-span-2">
              <FormLabel htmlFor="preferredNextStep" className="text-slate-700 font-semibold">Preferred Next Step</FormLabel>
              <FormControl>
                <Select id="preferredNextStep" defaultValue="" className={`${inputBaseClass} text-slate-900 appearance-none`} style={{ color: '#0f172a' }} {...register('preferredNextStep', { required: true })}>
                  <option value="" disabled className="text-slate-500">Select a next step</option>
                  <option value="Introductory Meeting" className="text-slate-900">Introductory Meeting</option>
                  <option value="Proposal Submission" className="text-slate-900">Proposal Submission</option>
                  <option value="Candidate Shortlist" className="text-slate-900">Candidate Shortlist</option>
                  <option value="Information Session" className="text-slate-900">Information Session</option>
                </Select>
              </FormControl>
              {errors.preferredNextStep && <FormMessage className="text-red-500">This field is required.</FormMessage>}
            </FormField>
          </div>

          {/* FIXED: Restored Consent Checkbox Layout */}
          <FormItem className="mt-8 border-t border-slate-100 pt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Label className="flex items-start gap-3 cursor-pointer">
                <Checkbox className="h-5 w-5 shrink-0 border-slate-300 text-[#D76A36] focus:ring-[#D76A36] mt-1 bg-white" {...register('consentToContact', { required: true })} />
                <span className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                  I consent to XMF Human Capital Partners contacting me and processing this information in line with POPIA.
                </span>
              </Label>
              {errors.consentToContact && <FormMessage className="text-red-500 whitespace-nowrap">Consent is required.</FormMessage>}
            </div>
          </FormItem>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mt-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3E4CA0]">What happens next</p>
              <p className="text-sm text-slate-600">
                Our employer partnership team will review your enquiry and follow up with a detailed introduction and proposal.
              </p>
            </div>
            <Button type="submit" disabled={isSubmitting} className="bg-[#D76A36] hover:bg-[#c25a29] text-white px-8 py-6 h-auto text-base font-semibold shadow-lg transition-all whitespace-nowrap">
              {isSubmitting ? "Sending..." : "Send partnership enquiry"}
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
          <h3 className="mb-4 text-3xl font-bold text-slate-900">Enquiry Received!</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Thank you! We have securely received your partnership enquiry. Our team will review your requirements and contact you shortly to outline the next steps.
          </p>
        </div>
      )}
    </div>
  );
}