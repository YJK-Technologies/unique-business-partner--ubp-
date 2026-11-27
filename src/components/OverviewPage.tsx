import React from 'react';
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  Check,
  Clock,
  FileCheck2,
  Layers,
  Scale,
  ShieldCheck,
  Users,
} from 'lucide-react';
import {
  ABOUT_CONTENT,
  HERO_CONTENT,
  IMAGES,
  SERVICES_CONTENT,
  ServiceId,
  VISION_MISSION_CONTENT,
  ViewId,
  WHY_UBP_CONTENT,
} from '../data/ubpContent';
import { ContactSection } from './ContactSection';
import { ResilientImage } from './ResilientImage';

interface OverviewPageProps {
  onOpenDetailView: (view: ViewId) => void;
  onScrollToSection: (sectionId: 'services' | 'contact') => void;
}

const SERVICE_ICONS: Record<ServiceId, React.ReactNode> = {
  'hr-management': <Users className="h-5 w-5 text-blue-700" />,
  'admin-management': <Building2 className="h-5 w-5 text-blue-700" />,
  'finance-accounts': <Briefcase className="h-5 w-5 text-blue-700" />,
  'operations-management': <Layers className="h-5 w-5 text-blue-700" />,
  'legal-consulting': <Scale className="h-5 w-5 text-blue-700" />,
  'corporate-events': <Award className="h-5 w-5 text-blue-700" />,
};

export const OverviewPage: React.FC<OverviewPageProps> = ({
  onOpenDetailView,
  onScrollToSection,
}) => {
  return (
    <div>
      {/* A. HERO SECTION */}
      <section id="home" className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Hero Text Column */}
            <div className="lg:col-span-6 flex flex-col justify-between py-2 space-y-6">
              <div className="space-y-5">
                <p className="text-sm font-semibold text-blue-700">
                  {HERO_CONTENT.kicker}
                </p>

                <h1
                  className="font-display font-extrabold tracking-tight text-[#0B1F3A] text-balance leading-[1.12]"
                  style={{ fontSize: 'clamp(2.15rem, 3.6vw, 3.35rem)' }}
                >
                  {HERO_CONTENT.headline}
                </h1>

                <p className="font-display text-lg sm:text-xl font-semibold italic text-slate-700">
                  {HERO_CONTENT.subHeadline}
                </p>

                <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                  {HERO_CONTENT.summary}
                </p>
              </div>

              <div className="space-y-6 pt-2">
                {/* Unboxed editorial trust strip */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-[#0B1F3A]">
                  {HERO_CONTENT.trustPoints.map((point, index) => (
                    <React.Fragment key={point}>
                      {index > 0 && (
                        <span aria-hidden="true" className="text-slate-300">
                          ·
                        </span>
                      )}
                      <span>{point}</span>
                    </React.Fragment>
                  ))}
                </div>

                {/* Primary & Secondary CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onScrollToSection('services')}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>{HERO_CONTENT.primaryCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onScrollToSection('contact')}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#0B1F3A] transition-colors duration-150 hover:bg-slate-50 hover:border-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>{HERO_CONTENT.secondaryCta}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Photography Column */}
            <div className="lg:col-span-6">
              <div className="relative h-72 sm:h-96 lg:h-full min-h-[340px] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-900">
                <ResilientImage
                  src={IMAGES.heroBoardroom}
                  alt="UNIQUE Business Partner leadership boardroom reviewing business operations analytics"
                  fallbackTitle="Integrated Business Operations Governance"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/85 via-[#0B1F3A]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
                  <p className="text-xs font-semibold text-amber-300">
                    Ground-Level Execution to Leadership Oversight
                  </p>
                  <p className="mt-1 font-display text-base sm:text-lg font-bold text-white">
                    Structured operational control across HR, Finance, Admin, Operations, Legal & Events
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width 4-Column Capabilities Strip below Hero Split */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-slate-200 pt-8">
            <div>
              <p className="font-mono text-2xl font-bold text-[#0B1F3A] tabular-nums">24/7</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Uninterrupted Responsibility</p>
              <p className="mt-0.5 text-xs text-slate-600">
                Always-on operational coverage, crisis escalation, and backup continuity.
              </p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-[#0B1F3A] tabular-nums">360°</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">6 Core Business Verticals</p>
              <p className="mt-0.5 text-xs text-slate-600">
                Unified execution across HR, Admin, Finance, Operations, Legal, and Events.
              </p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-[#0B1F3A] tabular-nums">15+ Yrs</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Leadership Stewardship</p>
              <p className="mt-0.5 text-xs text-slate-600">
                Led by dual-MBA and corporate law expertise across statutory compliance.
              </p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-[#0B1F3A] tabular-nums">4 Models</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Flexible Delivery Fit</p>
              <p className="mt-0.5 text-xs text-slate-600">
                In-House, Outsource, Hybrid, and Project-Basis accountability structures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* B. ABOUT US & LEADERSHIP TEAM */}
      <section id="about" className="bg-slate-50 py-20 lg:py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold tracking-wider text-blue-700">
                About Us & Leadership
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F3A] text-balance">
                {ABOUT_CONTENT.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onOpenDetailView('about')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-[#0B1F3A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore Full Details</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Company Overview */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-base text-slate-700 leading-relaxed">
                {ABOUT_CONTENT.overview}
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                {ABOUT_CONTENT.scopeSummary}
              </p>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-xs font-semibold tracking-wider text-slate-500 mb-3">
                  Core Operational Functions
                </h3>
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                  {ABOUT_CONTENT.operatingFunctions.map((fn, idx) => (
                    <div key={fn} className="flex items-center gap-2 text-sm font-medium text-[#0B1F3A]">
                      <span className="font-mono text-xs text-blue-700 tabular-nums">
                        0{idx + 1}.
                      </span>
                      <span>{fn}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Leadership Team Card: Mathi Purshoth */}
            <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-36 sm:w-40 aspect-[3/4] shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  <ResilientImage
                    src={ABOUT_CONTENT.leadership.portrait}
                    alt={`${ABOUT_CONTENT.leadership.name} — ${ABOUT_CONTENT.leadership.designation}`}
                    fallbackTitle={ABOUT_CONTENT.leadership.name}
                    className="h-full w-full object-cover object-top"
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-blue-700">
                      {ABOUT_CONTENT.leadership.sectionTitle}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-bold text-[#0B1F3A]">
                      {ABOUT_CONTENT.leadership.name}
                    </h3>
                    <p className="text-sm font-medium text-slate-600">
                      {ABOUT_CONTENT.leadership.designation} · {ABOUT_CONTENT.leadership.experienceYears}
                    </p>
                  </div>

                  <ul className="space-y-1.5">
                    {ABOUT_CONTENT.leadership.experienceHighlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <Check className="mt-0.5 h-4 w-4 text-emerald-700 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-200 pt-6">
                <div>
                  <h4 className="text-xs font-semibold tracking-wider text-slate-500 mb-2">
                    Academic Credentials
                  </h4>
                  <ul className="space-y-1.5 text-sm text-slate-700">
                    {ABOUT_CONTENT.leadership.academicCredentials.map((cred) => (
                      <li key={cred} className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-blue-700 font-bold">·</span>
                        <span>{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold tracking-wider text-slate-500 mb-2">
                    Software Expertise
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {ABOUT_CONTENT.leadership.softwareExpertise.join(' · ')}
                  </p>

                  <h4 className="text-xs font-semibold tracking-wider text-slate-500 mt-4 mb-1.5">
                    Regulatory & Licence Handling
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {ABOUT_CONTENT.leadership.regulatoryLicences.join(' · ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* C. VISION & MISSION */}
      <section id="vision-mission" className="bg-[#0B1F3A] text-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-wider text-amber-400">
                Purpose & Governance Framework
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Vision & Mission
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onOpenDetailView('vision-mission')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore Full Details</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Vision Block */}
            <div className="lg:col-span-5 rounded-xl border border-slate-700 bg-slate-900/60 p-6 sm:p-8 space-y-4">
              <h3 className="font-display text-xl font-bold text-amber-300">
                {VISION_MISSION_CONTENT.visionTitle}
              </h3>
              <p className="text-base sm:text-lg text-slate-100 leading-relaxed">
                {VISION_MISSION_CONTENT.visionStatement}
              </p>
            </div>

            {/* Mission Block */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  {VISION_MISSION_CONTENT.missionTitle}
                </h3>
                <p className="mt-1 text-sm text-slate-300">
                  {VISION_MISSION_CONTENT.missionIntro}
                </p>
              </div>

              <div className="divide-y divide-slate-800 border-y border-slate-800">
                {VISION_MISSION_CONTENT.missionPillars.map((pillar) => (
                  <div key={pillar.number} className="py-4 flex items-start gap-4">
                    <span className="font-mono text-sm font-semibold text-amber-400 tabular-nums pt-0.5">
                      {pillar.number}
                    </span>
                    <div>
                      <h4 className="font-display text-base font-semibold text-white">
                        {pillar.title}
                      </h4>
                      <p className="mt-1 text-sm text-slate-300 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D. WHY UNIQUE BUSINESS PARTNER? */}
      <section id="why-ubp" className="bg-white py-20 lg:py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold tracking-wider text-blue-700">
                Delivery, Pricing & Continuity
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F3A] text-balance">
                {WHY_UBP_CONTENT.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onOpenDetailView('why-ubp')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-[#0B1F3A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore Full Details</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Wide Architectural Banner */}
          <div className="relative h-56 sm:h-72 w-full overflow-hidden rounded-xl border border-slate-200 mb-10 bg-slate-900">
            <ResilientImage
              src={IMAGES.whyUbpSkyline}
              alt="UNIQUE Business Partner executive operations team inside corporate atrium"
              fallbackTitle="Extension-Partner Governance"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/85 via-[#0B1F3A]/45 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex flex-col justify-end p-6 sm:p-8 max-w-xl text-white">
              <p className="text-xs font-semibold text-amber-300">
                Extension-Partner Philosophy
              </p>
              <p className="mt-1 font-display text-xl sm:text-2xl font-bold leading-snug">
                {WHY_UBP_CONTENT.support247.tagline}
              </p>
            </div>
          </div>

          {/* 2x2 Grid covering all 4 blocks from Page 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1. Service Delivery Model */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7 space-y-5">
              <div>
                <h3 className="font-display text-xl font-bold text-[#0B1F3A]">
                  {WHY_UBP_CONTENT.deliveryModel.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {WHY_UBP_CONTENT.deliveryModel.intro}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WHY_UBP_CONTENT.deliveryModel.models.map((model) => (
                  <div key={model.name} className="rounded-lg border border-slate-200 bg-white p-4">
                    <p className="font-display text-sm font-bold text-[#0B1F3A]">
                      {model.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                      {model.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Pricing Approach */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0B1F3A]">
                    {WHY_UBP_CONTENT.pricingApproach.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {WHY_UBP_CONTENT.pricingApproach.intro}
                  </p>
                </div>
                <ul className="space-y-2">
                  {WHY_UBP_CONTENT.pricingApproach.factors.map((factor) => (
                    <li key={factor} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 text-blue-700 shrink-0" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="border-t border-slate-200 pt-4 font-display text-sm font-bold text-[#0B1F3A]">
                {WHY_UBP_CONTENT.pricingApproach.tagline}
              </p>
            </div>

            {/* 3. What 24/7 Really Means */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-blue-700 mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-semibold">Uninterrupted Continuity</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0B1F3A]">
                    {WHY_UBP_CONTENT.support247.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {WHY_UBP_CONTENT.support247.intro}
                  </p>
                </div>
                <ul className="space-y-2">
                  {WHY_UBP_CONTENT.support247.pillars.map((pillar) => (
                    <li key={pillar} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-700 shrink-0" />
                      <span>{pillar}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="border-t border-slate-200 pt-4 font-display text-sm font-bold text-[#0B1F3A]">
                {WHY_UBP_CONTENT.support247.tagline}
              </p>
            </div>

            {/* 4. Why UBP? */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-blue-700 mb-1">
                  <FileCheck2 className="h-4 w-4" />
                  <span className="text-xs font-semibold">Partner Differentiators</span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#0B1F3A]">
                  {WHY_UBP_CONTENT.whyUbp.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {WHY_UBP_CONTENT.whyUbp.intro}
                </p>
              </div>
              <ul className="space-y-2.5">
                {WHY_UBP_CONTENT.whyUbp.differentiators.map((diff) => (
                  <li key={diff} className="flex items-start gap-2.5 text-sm font-medium text-slate-800">
                    <Check className="mt-0.5 h-4 w-4 text-emerald-700 shrink-0" />
                    <span>{diff}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* E. OUR SERVICES (6 VERTICALS) */}
      <section id="services" className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3 mb-12">
            <p className="text-xs font-semibold tracking-wider text-blue-700">
              360° Operational Capabilities
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F3A] text-balance">
              Our Six Integrated Service Verticals
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Select any vertical below to explore the complete scope, deliverables, and governance structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_CONTENT.map((service) => {
              const totalDeliverables = service.groups.reduce(
                (acc, g) => acc + g.items.length,
                0
              );
              return (
                <article
                  key={service.id}
                  className="flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors duration-150 hover:border-blue-300"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <ResilientImage
                        src={service.image}
                        alt={service.imageAlt}
                        fallbackTitle={service.title}
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-[#0B1F3A]/20 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                        <span className="font-mono text-xs font-semibold text-amber-300 tabular-nums">
                          {service.number} · {totalDeliverables} Core Capabilities
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                          {SERVICE_ICONS[service.id]}
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
                            {service.title}
                          </h3>
                          <p className="mt-0.5 text-xs font-medium text-slate-500">
                            {service.tagline}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {service.intro}
                      </p>

                      <ul className="space-y-1.5 border-t border-slate-100 pt-4">
                        {service.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-slate-700">
                            <Check className="mt-0.5 h-3.5 w-3.5 text-blue-700 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 px-6 py-4 bg-slate-50/50">
                    <button
                      type="button"
                      onClick={() => onOpenDetailView(service.id)}
                      className="inline-flex w-full items-center justify-between text-sm font-semibold text-[#0B1F3A] hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      <span>Explore Full Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* F. CONTACT SECTION */}
      <ContactSection />
    </div>
  );
};
