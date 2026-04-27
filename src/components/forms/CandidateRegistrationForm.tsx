import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
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
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CandidateFormValues>();

  const onSubmit = async (data: CandidateFormValues) => {
    setIsSubmitting(true);
    
    const formData = new FormData();
    
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof CandidateFormValues];
      if (key === 'cv' || key === 'certificates') {
        const fileList = value as FileList;
        if (fileList && fileList.length > 0) {
          formData.append(key, fileList[0]);
        }
      } else {
        formData.append(key, String(value));
      }
    });

    try {
      const response = await fetch("https://formspree.io/f/xbdqpnwq", {
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
        <p className="text-sm uppercase tracking-[0.30em] text-orange-300">Candidate registration</p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Register to join our talent pipeline.</h2>
        <p className="max-w-3xl text-slate-300">
          Complete this form to share your profile, qualifications and career preferences. We match candidates to learnerships, graduate programmes, internships and entry-level roles across South Africa.
        </p>
      </div>

      {!submitted ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 lg:grid-cols-2">
            <FormField>
              <FormLabel htmlFor="fullName">Full Name</FormLabel>
              <FormControl>
                <Input id="fullName" placeholder="Jane Doe" {...register('fullName', { required: true })} />
              </FormControl>
              {errors.fullName && <FormMessage>Full name is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="idNumber">ID Number</FormLabel>
              <FormControl>
                <Input id="idNumber" placeholder="8001015000084" {...register('idNumber', { required: true })} />
              </FormControl>
              {errors.idNumber && <FormMessage>ID number is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
              <FormControl>
                <Input id="dateOfBirth" type="date" {...register('dateOfBirth', { required: true })} />
              </FormControl>
              {errors.dateOfBirth && <FormMessage>Date of birth is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
              <FormControl>
                <Input id="phoneNumber" type="tel" placeholder="+27 82 123 4567" {...register('phoneNumber', { required: true })} />
              </FormControl>
              {errors.phoneNumber && <FormMessage>Phone number is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="emailAddress">Email Address</FormLabel>
              <FormControl>
                <Input id="emailAddress" type="email" placeholder="jane.doe@example.com" {...register('emailAddress', { required: true })} />
              </FormControl>
              {errors.emailAddress && <FormMessage>Email address is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="province">Province</FormLabel>
              <FormControl>
                <Input id="province" placeholder="Gauteng" {...register('province', { required: true })} />
              </FormControl>
              {errors.province && <FormMessage>Province is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="institution">Institution</FormLabel>
              <FormControl>
                <Input id="institution" placeholder="University of Pretoria" {...register('institution', { required: true })} />
              </FormControl>
              {errors.institution && <FormMessage>Institution is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="yearCompleted">Year Completed / Current Year</FormLabel>
              <FormControl>
                <Input id="yearCompleted" placeholder="2024 / 2nd Year" {...register('yearCompleted', { required: true })} />
              </FormControl>
              {errors.yearCompleted && <FormMessage>Year completed or current year is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="gender">Gender</FormLabel>
              <FormControl>
                <Select id="gender" defaultValue="" {...register('gender', { required: true })}>
                  <option value="" disabled>Select gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </Select>
              </FormControl>
              {errors.gender && <FormMessage>Gender selection is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="race">Race (optional)</FormLabel>
              <FormControl>
                <Select id="race" defaultValue="" {...register('race')}>
                  <option value="">Prefer not to answer</option>
                  <option value="African">African</option>
                  <option value="Coloured">Coloured</option>
                  <option value="Indian">Indian</option>
                  <option value="White">White</option>
                </Select>
              </FormControl>
            </FormField>

            <FormField>
              <FormLabel htmlFor="highestQualification">Highest Qualification</FormLabel>
              <FormControl>
                <Select id="highestQualification" defaultValue="" {...register('highestQualification', { required: true })}>
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
              {errors.highestQualification && <FormMessage>This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="fieldOfStudy">Field of Study</FormLabel>
              <FormControl>
                <Select id="fieldOfStudy" defaultValue="" {...register('fieldOfStudy', { required: true })}>
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
              {errors.fieldOfStudy && <FormMessage>This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="employmentStatus">Employment Status</FormLabel>
              <FormControl>
                <Select id="employmentStatus" defaultValue="" {...register('employmentStatus', { required: true })}>
                  <option value="" disabled>Select employment status</option>
                  <option value="Unemployed (Never worked)">Unemployed (Never worked)</option>
                  <option value="Unemployed (Previously worked)">Unemployed (Previously worked)</option>
                  <option value="Currently Employed (Full-time)">Currently Employed (Full-time)</option>
                  <option value="Currently Employed (Part-time / Contract)">Currently Employed (Part-time / Contract)</option>
                  <option value="Self-Employed">Self-Employed</option>
                  <option value="Student / Learner">Student / Learner</option>
                </Select>
              </FormControl>
              {errors.employmentStatus && <FormMessage>This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="programmeType">Interested Programme Type</FormLabel>
              <FormControl>
                <Select id="programmeType" defaultValue="" {...register('programmeType', { required: true })}>
                  <option value="" disabled>Select programme type</option>
                  <option value="Learnership">Learnership</option>
                  <option value="Graduate Programme">Graduate Programme</option>
                  <option value="Internship">Internship</option>
                  <option value="Permanent Role">Permanent Role</option>
                </Select>
              </FormControl>
              {errors.programmeType && <FormMessage>This field is required.</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="preferredIndustry">Preferred Industry</FormLabel>
              <FormControl>
                <Select id="preferredIndustry" defaultValue="" {...register('preferredIndustry', { required: true })}>
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
              {errors.preferredIndustry && <FormMessage>This field is required.</FormMessage>}
            </FormField>

            <FormField className="lg:col-span-2">
              <FormLabel htmlFor="disability">Do you have a disability? (Optional)</FormLabel>
              <FormControl>
                <Input id="disability" placeholder="If yes, please specify" {...register('disability')} />
              </FormControl>
            </FormField>

            <FormField className="lg:col-span-2">
              <FormLabel htmlFor="cv">Upload CV</FormLabel>
              <FormControl>
                <Input id="cv" type="file" {...register('cv', { required: true })} />
              </FormControl>
              {errors.cv && <FormMessage>CV upload is required.</FormMessage>}
            </FormField>

            <FormField className="lg:col-span-2">
              <FormLabel htmlFor="certificates">Upload Certificates</FormLabel>
              <FormControl>
                <Input id="certificates" type="file" {...register('certificates')} />
              </FormControl>
            </FormField>
          </div>

          <FormItem className="mt-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Label className="flex items-center gap-3">
                <Checkbox {...register('popiaConsent', { required: true })} />
                <span className="text-sm text-slate-200">
                  I consent to XMF Human Capital Partners processing my information in line with POPIA.
                </span>
              </Label>
              {errors.popiaConsent && <FormMessage>Consent is required.</FormMessage>}
            </div>
          </FormItem>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.28em] text-orange-200">Next step</p>
              <p className="text-sm text-slate-400">
                Once submitted, our team will review your profile and connect you with matching opportunities.
              </p>
            </div>
            <Button type="submit" disabled={isSubmitting} className="bg-[#D76A36] hover:bg-[#b85a2d] text-white">
              {isSubmitting ? "Submitting..." : "Submit candidate profile"}
            </Button>
          </div>
        </Form>
      ) : (
        <div className="mt-6 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-8 text-center shadow-inner">
          <h3 className="mb-2 text-2xl font-bold text-emerald-300">Application Received!</h3>
          <p className="text-emerald-100">
            Thank you! Your information and documents have been securely uploaded to our system. A member of our candidate team will review your profile and be in touch soon.
          </p>
        </div>
      )}
    </section>
  );
}