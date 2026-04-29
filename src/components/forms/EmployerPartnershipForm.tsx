import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
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
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EmployerFormValues>();

  useEffect(() => {
    if (submitted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [submitted]);

  const onSubmit = async (data: EmployerFormValues) => {
    setIsSubmitting(true);
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof EmployerFormValues];
      if (Array.isArray(value)) {
        // Formspree requires array values (checkboxes) to be appended multiple times or bracketed
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, String(value));
      }
    });

    try {
      const response = await fetch("https://formspree.io/f/myklalqn", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
        reset();
      } else {
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="glass-panel rounded-[2rem] border border-white/10 bg-slate-950/35 p-8 shadow-2xl shadow-black/20">
      <div className="mb-8 space-y-3">
        <p className="text-sm uppercase tracking-[0.30em] text-orange-300">Employer partnership</p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Partner with us to scale your talent pipeline.</h2>
        <p className="max-w-3xl text-slate-300">
          Share your employer needs and we will help you access learners, graduates, interns and skilled candidates aligned to your transformation goals.
        </p>
      </div>

      {!submitted ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 lg:grid-cols-2">
            <FormField>
              <FormLabel htmlFor="organisationName">Organisation Name</FormLabel>
              <FormControl>
                <Input id="organisationName" placeholder="Example Holdings" {...register('organisationName', { required: true })} />
              </FormControl>
              {errors.organisationName && <FormMessage>This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="industrySector">Industry Sector</FormLabel>
              <FormControl>
                <Input id="industrySector" placeholder="Financial Services" {...register('industrySector', { required: true })} />
              </FormControl>
              {errors.industrySector && <FormMessage>This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="contactPerson">Contact Person (Full Name)</FormLabel>
              <FormControl>
                <Input id="contactPerson" placeholder="Thabo Mokoena" {...register('contactPerson', { required: true })} />
              </FormControl>
              {errors.contactPerson && <FormMessage>This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
              <FormControl>
                <Input id="jobTitle" placeholder="HR Manager" {...register('jobTitle', { required: true })} />
              </FormControl>
              {errors.jobTitle && <FormMessage>This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="emailAddress">Email Address</FormLabel>
              <FormControl>
                <Input id="emailAddress" type="email" placeholder="contact@company.co.za" {...register('emailAddress', { required: true })} />
              </FormControl>
              {errors.emailAddress && <FormMessage>Email address is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
              <FormControl>
                <Input id="phoneNumber" type="tel" placeholder="+27 11 123 4567" {...register('phoneNumber', { required: true })} />
              </FormControl>
              {errors.phoneNumber && <FormMessage>Phone number is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="provinceLocation">Province / Location</FormLabel>
              <FormControl>
                <Input id="provinceLocation" placeholder="Western Cape" {...register('provinceLocation', { required: true })} />
              </FormControl>
              {errors.provinceLocation && <FormMessage>This field is required.</FormMessage>}
            </FormField>

            <FormField className="lg:col-span-2">
              <FormLabel>Type of Support Required</FormLabel>
              <div className="grid gap-3 sm:grid-cols-2">
                {supportOptions.map((option) => (
                  <Label key={option} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-orange-300/40">
                    <Checkbox value={option} {...register('supportRequired')} />
                    <span>{option}</span>
                  </Label>
                ))}
              </div>
              {errors.supportRequired && <FormMessage>Please select at least one support type.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="estimatedNumber">Estimated Number of Candidates Required</FormLabel>
              <FormControl>
                <Input id="estimatedNumber" placeholder="e.g. 20" {...register('estimatedNumber', { required: true })} />
              </FormControl>
              {errors.estimatedNumber && <FormMessage>This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="programmeRoleType">Programme / Role Type</FormLabel>
              <FormControl>
                <Input id="programmeRoleType" placeholder="Graduate programme / Learnership" {...register('programmeRoleType', { required: true })} />
              </FormControl>
              {errors.programmeRoleType && <FormMessage>This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="preferredStartDate">Preferred Start Date</FormLabel>
              <FormControl>
                <Input id="preferredStartDate" type="date" {...register('preferredStartDate', { required: true })} />
              </FormControl>
              {errors.preferredStartDate && <FormMessage>This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="bbbeeLink">Linked to Skills Development or B-BBEE targets?</FormLabel>
              <FormControl>
                <Select id="bbbeeLink" defaultValue="" {...register('bbbeeLink', { required: true })}>
                  <option value="" disabled>Select option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Unsure">Unsure</option>
                </Select>
              </FormControl>
              {errors.bbbeeLink && <FormMessage>This field is required.</FormMessage>}
            </FormField>

            <FormField className="lg:col-span-2">
              <FormLabel htmlFor="additionalInformation">Additional Information or Requirements</FormLabel>
              <FormControl>
                <Textarea id="additionalInformation" placeholder="Please share any context, timelines or candidate profile detail" {...register('additionalInformation')} />
              </FormControl>
            </FormField>

            <FormField className="lg:col-span-2">
              <FormLabel htmlFor="preferredNextStep">Preferred Next Step</FormLabel>
              <FormControl>
                <Select id="preferredNextStep" defaultValue="" {...register('preferredNextStep', { required: true })}>
                  <option value="" disabled>Select a next step</option>
                  <option value="Introductory Meeting">Introductory Meeting</option>
                  <option value="Proposal Submission">Proposal Submission</option>
                  <option value="Candidate Shortlist">Candidate Shortlist</option>
                  <option value="Information Session">Information Session</option>
                </Select>
              </FormControl>
              {errors.preferredNextStep && <FormMessage>This field is required.</FormMessage>}
            </FormField>
          </div>

          <FormItem className="mt-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Label className="flex items-start gap-3">
                <Checkbox {...register('consentToContact', { required: true })} />
                <span className="text-sm text-slate-200">
                  I consent to XMF Human Capital Partners contacting me about this enquiry.
                </span>
              </Label>
              {errors.consentToContact && <FormMessage>Consent is required.</FormMessage>}
            </div>
          </FormItem>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.28em] text-orange-200">What happens next</p>
              <p className="text-sm text-slate-400">
                Our employer partnership team will review your enquiry and follow up with a detailed introduction and next-step proposal.
              </p>
            </div>
            <Button type="submit" disabled={isSubmitting} className="bg-[#D76A36] hover:bg-[#b85a2d] text-white">
              {isSubmitting ? "Sending..." : "Send partnership enquiry"}
            </Button>
          </div>
        </Form>
      ) : (
        <div className="mt-6 rounded-3xl border-2 border-emerald-400/40 bg-emerald-500/20 p-12 text-center shadow-inner shadow-emerald-400/20">
          <h3 className="mb-4 text-4xl font-bold text-emerald-300">Enquiry Received!</h3>
          <p className="text-lg text-emerald-100">
            Thank you! We have securely received your partnership enquiry. Our team will review your requirements and contact you shortly to outline the next steps.
          </p>
        </div>
      )}
    </section>
  );
}