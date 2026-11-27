import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import {
  ABOUT_CONTENT,
  IMAGES,
  SERVICES_CONTENT,
  ServiceVertical,
  VISION_MISSION_CONTENT,
  ViewId,
  WHY_UBP_CONTENT,
} from '../data/ubpContent';
import { ContactSection } from './ContactSection';
import { ResilientImage } from './ResilientImage';

interface DetailViewProps {
  viewId: Exclude<ViewId, 'overview'>;
  onBackToOverview: () => void;
  onOpenDetailView: (view: ViewId) => void;
}

export const DetailView: React.FC<DetailViewProps> = ({
  viewId,
  onBackToOverview,
  onOpenDetailView,
}) => {
  const service = SERVICES_CONTENT.find((s) => s.id === viewId);
  const [activeGroupTab, setActiveGroupTab] = useState<string>('all');

  useEffect(() => {
    setActiveGroupTab('all');
  }, [viewId]);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50">
      {/* Top Detail Navigation & Breadcrumb Strip */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToOverview}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Overview</span>
          </button>

          {/* Quick switcher across all 6 service verticals when viewing a service */}
          {service && (
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {SERVICES_CONTENT.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onOpenDetailView(item.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    item.id === service.id
                      ? 'bg-[#0B1F3A] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#0B1F3A]'
                  }`}
                >
                  {item.number}. {item.shortTitle}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Render Dedicated View Content */}
      {viewId === 'about' && (
        <AboutDetailSection onConsult={scrollToContact} />
      )}

      {viewId === 'vision-mission' && (
        <VisionMissionDetailSection onConsult={scrollToContact} />
      )}

      {viewId === 'why-ubp' && (
        <WhyUbpDetailSection onConsult={scrollToContact} />
      )}

      {service && (
        <ServiceVerticalDetailSection
          service={service}
          activeGroupTab={activeGroupTab}
          onChangeTab={setActiveGroupTab}
          onConsult={scrollToContact}
          onSwitchService={(id) => onOpenDetailView(id)}
        />
      )}

      {/* Pre-filled Consultation & Contact Form */}
      <ContactSection
        preselectedService={
          service ? service.title : 'Full 360-Degree Integrated Operations'
        }
      />
    </div>
  );
};

const AboutDetailSection: React.FC<{ onConsult: () => void }> = ({ onConsult }) => {
  const { leadership } = ABOUT_CONTENT;
  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold tracking-wider text-blue-700">
            Company Profile & Leadership
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B1F3A] text-balance">
            {ABOUT_CONTENT.title}
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed">
            {ABOUT_CONTENT.overview}
          </p>
          <p className="text-base text-slate-600 leading-relaxed">
            {ABOUT_CONTENT.scopeSummary}
          </p>
        </div>

        {/* Full Leadership Dossier */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4 space-y-5">
              <div className="aspect-[3/4] max-w-xs overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <ResilientImage
                  src={leadership.portrait}
                  alt={`${leadership.name} — ${leadership.designation}`}
                  fallbackTitle={leadership.name}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-700">
                  {leadership.sectionTitle}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-[#0B1F3A]">
                  {leadership.name}
                </h2>
                <p className="text-sm font-medium text-slate-600">
                  {leadership.designation}
                </p>
                <p className="mt-1 font-mono text-xs font-semibold text-slate-500">
                  {leadership.experienceYears}
                </p>
              </div>

              <button
                type="button"
                onClick={onConsult}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0B1F3A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors cursor-pointer"
              >
                <span>Schedule Leadership Briefing</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div>
                <h3 className="font-display text-lg font-bold text-[#0B1F3A] mb-3">
                  Core Experience & Functional Command ({leadership.experienceYears})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {leadership.experienceHighlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm font-medium text-slate-800"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-slate-200 pt-8">
                <div>
                  <h3 className="font-display text-base font-bold text-[#0B1F3A] mb-3">
                    Academic Credentials
                  </h3>
                  <ul className="space-y-2.5">
                    {leadership.academicCredentials.map((cred) => (
                      <li key={cred} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <Check className="mt-0.5 h-4 w-4 text-blue-700 shrink-0" />
                        <span>{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-base font-bold text-[#0B1F3A] mb-3">
                    Software & Portal Expertise
                  </h3>
                  <ul className="space-y-2">
                    {leadership.softwareExpertise.map((sw) => (
                      <li key={sw} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <Check className="mt-0.5 h-4 w-4 text-blue-700 shrink-0" />
                        <span>{sw}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-8">
                <h3 className="font-display text-base font-bold text-[#0B1F3A] mb-3">
                  Regulatory & Licence Handling Expertise
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {leadership.regulatoryLicences.map((lic) => (
                    <div
                      key={lic}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-[#0B1F3A]"
                    >
                      {lic}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VisionMissionDetailSection: React.FC<{ onConsult: () => void }> = ({ onConsult }) => {
  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold tracking-wider text-blue-700">
            Strategic Mandate
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B1F3A] text-balance">
            Vision & Mission
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Built to deliver 24/7, 360-degree execution with unified governance across people, process, budget, and statutory compliance.
          </p>
        </div>

        <div className="rounded-xl bg-[#0B1F3A] p-8 sm:p-10 text-white space-y-4">
          <p className="text-xs font-semibold tracking-wider text-amber-300">
            Our {VISION_MISSION_CONTENT.visionTitle}
          </p>
          <p className="font-display text-xl sm:text-2xl font-bold leading-relaxed text-white max-w-4xl">
            “{VISION_MISSION_CONTENT.visionStatement}”
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
                Our {VISION_MISSION_CONTENT.missionTitle}
              </h2>
              <p className="mt-1 text-base text-slate-600">
                {VISION_MISSION_CONTENT.missionIntro}
              </p>
            </div>
            <button
              type="button"
              onClick={onConsult}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0B1F3A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Align With UBP</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VISION_MISSION_CONTENT.missionPillars.map((pillar) => (
              <div
                key={pillar.number}
                className="rounded-xl border border-slate-200 bg-white p-6 space-y-3"
              >
                <span className="font-mono text-lg font-bold text-blue-700 tabular-nums">
                  {pillar.number}
                </span>
                <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyUbpDetailSection: React.FC<{ onConsult: () => void }> = ({ onConsult }) => {
  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs font-semibold tracking-wider text-blue-700">
              Engagement Architecture
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B1F3A] text-balance">
              {WHY_UBP_CONTENT.title}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              {WHY_UBP_CONTENT.deliveryModel.intro}
            </p>
            <button
              type="button"
              onClick={onConsult}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition-colors cursor-pointer"
            >
              <span>Discuss Your Engagement Model</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="lg:col-span-6">
            <div className="h-64 sm:h-80 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-900">
              <ResilientImage
                src={IMAGES.whyUbpSkyline}
                alt="UNIQUE Business Partner corporate governance team"
                fallbackTitle="Why UNIQUE Business Partner"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Service Delivery Models */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            {WHY_UBP_CONTENT.deliveryModel.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_UBP_CONTENT.deliveryModel.models.map((model, idx) => (
              <div
                key={model.name}
                className="rounded-xl border border-slate-200 bg-white p-6 space-y-2"
              >
                <span className="font-mono text-xs font-semibold text-blue-700 tabular-nums">
                  0{idx + 1}
                </span>
                <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
                  {model.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing + 24/7 + Why UBP */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <h3 className="font-display text-xl font-bold text-[#0B1F3A]">
              {WHY_UBP_CONTENT.pricingApproach.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {WHY_UBP_CONTENT.pricingApproach.intro}
            </p>
            <ul className="space-y-2">
              {WHY_UBP_CONTENT.pricingApproach.factors.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 text-blue-700 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <p className="border-t border-slate-100 pt-3 text-sm font-bold text-[#0B1F3A]">
              {WHY_UBP_CONTENT.pricingApproach.tagline}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <div className="flex items-center gap-2 text-blue-700">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-semibold">Continuous Ownership</span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#0B1F3A]">
              {WHY_UBP_CONTENT.support247.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {WHY_UBP_CONTENT.support247.intro}
            </p>
            <ul className="space-y-2">
              {WHY_UBP_CONTENT.support247.pillars.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-slate-700">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-700 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="border-t border-slate-100 pt-3 text-sm font-bold text-[#0B1F3A]">
              {WHY_UBP_CONTENT.support247.tagline}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <h3 className="font-display text-xl font-bold text-[#0B1F3A]">
              {WHY_UBP_CONTENT.whyUbp.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {WHY_UBP_CONTENT.whyUbp.intro}
            </p>
            <ul className="space-y-2.5">
              {WHY_UBP_CONTENT.whyUbp.differentiators.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm font-medium text-slate-800">
                  <Check className="mt-0.5 h-4 w-4 text-emerald-700 shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ServiceDetailProps {
  service: ServiceVertical;
  activeGroupTab: string;
  onChangeTab: (tab: string) => void;
  onConsult: () => void;
  onSwitchService: (id: ViewId) => void;
}

const ServiceVerticalDetailSection: React.FC<ServiceDetailProps> = ({
  service,
  activeGroupTab,
  onChangeTab,
  onConsult,
  onSwitchService,
}) => {
  const showTabs = service.groups.length > 1;
  const visibleGroups =
    activeGroupTab === 'all'
      ? service.groups
      : service.groups.filter((g) => g.groupTitle === activeGroupTab);

  const currentIdx = SERVICES_CONTENT.findIndex((s) => s.id === service.id);
  const nextService = SERVICES_CONTENT[(currentIdx + 1) % SERVICES_CONTENT.length];

  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Service Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="font-mono text-xs font-semibold text-blue-700 tabular-nums">
                Vertical {service.number} · {service.tagline}
              </p>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B1F3A] text-balance">
                {service.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                {service.intro}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onConsult}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Request {service.shortTitle} Proposal</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onSwitchService(nextService.id)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#0B1F3A] hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Next: {nextService.shortTitle}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="h-64 sm:h-80 lg:h-full min-h-[260px] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-900">
              <ResilientImage
                src={service.image}
                alt={service.imageAlt}
                fallbackTitle={service.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Optional Group Filter Tabs (for multi-group verticals like HR Management) */}
        {showTabs && (
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 w-fit">
            <button
              type="button"
              onClick={() => onChangeTab('all')}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeGroupTab === 'all'
                  ? 'bg-[#0B1F3A] text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#0B1F3A]'
              }`}
            >
              All Capability Areas
            </button>
            {service.groups.map((group) => (
              <button
                key={group.groupTitle}
                type="button"
                onClick={() => onChangeTab(group.groupTitle)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeGroupTab === group.groupTitle
                    ? 'bg-[#0B1F3A] text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-[#0B1F3A]'
                }`}
              >
                {group.groupTitle}
              </button>
            ))}
          </div>
        )}

        {/* Unabridged Deliverables Breakdown */}
        <div className="space-y-10">
          {visibleGroups.map((group) => (
            <div key={group.groupTitle} className="space-y-5">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
                  {group.groupTitle}
                </h2>
                <span className="font-mono text-xs text-slate-500 tabular-nums">
                  {group.items.length} Deliverables
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.items.map((item, idx) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-slate-200 bg-white p-6 space-y-2.5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 font-mono text-xs font-semibold text-blue-700 tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="space-y-1.5">
                        <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
