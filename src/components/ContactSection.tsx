import React, { useEffect, useState } from 'react';
import { CheckCircle2, Mail, Phone, Send } from 'lucide-react';
import { CONTACT_CONTENT, SERVICES_CONTENT, WHY_UBP_CONTENT } from '../data/ubpContent';

interface ContactSectionProps {
  preselectedService?: string;
}

interface FormState {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  engagementModel: string;
  message: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService }) => {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    service: preselectedService || SERVICES_CONTENT[0].title,
    engagementModel: WHY_UBP_CONTENT.deliveryModel.models[0].name,
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!form.company.trim()) {
      nextErrors.company = 'Please enter your organization name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid work email address.';
    }
    if (!/^[+\d\s()-]{7,20}$/.test(form.phone.trim())) {
      nextErrors.phone = 'Please enter a valid contact phone number.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = 'Please share brief details of your operational requirements.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="bg-[#0B1F3A] text-white py-20 lg:py-24 border-t border-slate-800"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left column: Closing statement & Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-wider text-blue-300">
                Partner With UBP
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance leading-tight">
                {CONTACT_CONTENT.quote}
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                {CONTACT_CONTENT.subtext}
              </p>
            </div>

            <div className="border-t border-slate-700/80 pt-8 space-y-6">
              <div>
                <h3 className="text-xs font-semibold tracking-wider text-slate-400 mb-3">
                  Direct Phone Lines
                </h3>
                <ul className="space-y-2.5">
                  {CONTACT_CONTENT.phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-3 text-base font-medium text-white hover:text-blue-300 transition-colors tabular-nums"
                      >
                        <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                        <span>{phone}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold tracking-wider text-slate-400 mb-2">
                  Email Inquiry
                </h3>
                <a
                  href={`mailto:${CONTACT_CONTENT.email}`}
                  className="inline-flex items-center gap-3 text-base font-medium text-white hover:text-blue-300 transition-colors break-all"
                >
                  <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>{CONTACT_CONTENT.email}</span>
                </a>
              </div>
            </div>

            <div className="border-t border-slate-700/80 pt-6 text-sm text-slate-300">
              <p className="font-semibold text-white">24/7 Continuity Commitment</p>
              <p className="mt-1 text-slate-300">
                Always-on operational support, crisis escalation handling, and backup resource readiness tailored to your organizational budget.
              </p>
            </div>
          </div>

          {/* Right column: Validated Consultation / Quote Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 text-slate-900">
              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#0B1F3A]">
                    Consultation Request Prepared
                  </h3>
                  <p className="mx-auto max-w-md text-sm text-slate-600 leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-900">{form.fullName}</span>. Your operational inquiry for{' '}
                    <span className="font-semibold text-slate-900">{form.service}</span> ({form.engagementModel} model) is ready. You may also send this directly to our desk or call us anytime 24/7.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={`mailto:${CONTACT_CONTENT.email}?subject=${encodeURIComponent(
                        `UBP Consultation Request: ${form.service} (${form.company})`
                      )}&body=${encodeURIComponent(
                        `Name: ${form.fullName}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nService Vertical: ${form.service}\nEngagement Model: ${form.engagementModel}\n\nRequirements:\n${form.message}`
                      )}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#0B1F3A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Open in Email Client</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setForm((prev) => ({ ...prev, message: '' }));
                      }}
                      className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-display text-xl font-bold text-[#0B1F3A]">
                      Book a Consultation & Request a Tailored Proposal
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Share your operational scope and preferred engagement model for a structured response.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ubp-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Full Name
                      </label>
                      <input
                        id="ubp-name"
                        type="text"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="e.g. Rajesh Kumar"
                        className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="ubp-company" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Organization Name
                      </label>
                      <input
                        id="ubp-company"
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="e.g. Meridian Manufacturing Pvt. Ltd."
                        className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none"
                      />
                      {errors.company && (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.company}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="ubp-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Work Email
                      </label>
                      <input
                        id="ubp-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="ubp-phone" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        id="ubp-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98XXX XXXXX"
                        className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none tabular-nums"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="ubp-service" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Primary Service Vertical
                      </label>
                      <select
                        id="ubp-service"
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                      >
                        {SERVICES_CONTENT.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.number}. {s.title}
                          </option>
                        ))}
                        <option value="Full 360-Degree Integrated Operations">
                          Full 360° Integrated Operations
                        </option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="ubp-model" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Engagement Model
                      </label>
                      <select
                        id="ubp-model"
                        value={form.engagementModel}
                        onChange={(e) => setForm({ ...form, engagementModel: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                      >
                        {WHY_UBP_CONTENT.deliveryModel.models.map((m) => (
                          <option key={m.name} value={m.name}>
                            {m.name} — {m.description}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="ubp-message" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Scope & Operational Requirements
                    </label>
                    <textarea
                      id="ubp-message"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe team size, compliance requirements, locations, or timeline..."
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs font-medium text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
                    <p className="text-xs text-slate-500">
                      Transparent, structured, outcome-driven pricing aligned to your scope.
                    </p>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Request Consultation</span>
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
