import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { SERVICES_CONTENT, ServiceId, ViewId } from '../data/ubpContent';
import { UbpLogo } from './UbpLogo';

export type NavSectionId =
  | 'home'
  | 'about'
  | 'vision-mission'
  | 'why-ubp'
  | 'services'
  | 'contact';

interface NavbarProps {
  activeView: ViewId;
  activeScrollSection: NavSectionId;
  onNavigateSection: (section: NavSectionId) => void;
  onOpenDetailView: (view: ViewId) => void;
  onRequestQuote: () => void;
}

const NAV_ITEMS: { id: NavSectionId; label: string; detailView?: ViewId }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us', detailView: 'about' },
  { id: 'vision-mission', label: 'Vision & Mission', detailView: 'vision-mission' },
  { id: 'why-ubp', label: 'Why UBP', detailView: 'why-ubp' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  activeScrollSection,
  onNavigateSection,
  onOpenDetailView,
  onRequestQuote,
}) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const isServiceDetailView = SERVICES_CONTENT.some((s) => s.id === activeView);

  const isNavItemActive = (section: NavSectionId): boolean => {
    if (activeView === 'overview') {
      return activeScrollSection === section;
    }
    if (section === 'services') {
      return isServiceDetailView;
    }
    return activeView === section;
  };

  const handleLinkClick = (section: NavSectionId) => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    onNavigateSection(section);
  };

  const handleServiceSelect = (serviceId: ServiceId) => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    onOpenDetailView(serviceId);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand wordmark */}
        <button
          type="button"
          onClick={() => handleLinkClick('home')}
          className="flex items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 whitespace-nowrap shrink-0 cursor-pointer"
          aria-label="UNIQUE Business Partner Home"
        >
          <UbpLogo compact={false} />
        </button>

        {/* Zone 2: Primary single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {NAV_ITEMS.map((item) => {
            const active = isNavItemActive(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLinkClick(item.id)}
                className={`relative py-2 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 ${
                  active ? 'text-[#0B1F3A] font-semibold' : 'text-slate-600 hover:text-[#0B1F3A]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 bg-blue-700 transition-transform duration-200 origin-left ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}

          {/* Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              className={`relative inline-flex items-center gap-1.5 py-2 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 ${
                isNavItemActive('services')
                  ? 'text-[#0B1F3A] font-semibold'
                  : 'text-slate-600 hover:text-[#0B1F3A]'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-150 ${
                  servicesOpen ? 'rotate-180' : ''
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-0.5 h-0.5 bg-blue-700 transition-transform duration-200 origin-left ${
                  isNavItemActive('services') ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>

            {servicesOpen && (
              <div
                role="menu"
                aria-label="Service Verticals"
                className="absolute left-0 top-full mt-2 w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => handleLinkClick('services')}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold tracking-wide text-blue-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>All 6 Service Verticals</span>
                  <span className="text-slate-400">Overview</span>
                </button>
                <div className="my-1.5 border-t border-slate-100" />
                {SERVICES_CONTENT.map((service) => {
                  const isSelected = activeView === service.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      role="menuitem"
                      onClick={() => handleServiceSelect(service.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/80 text-blue-800 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-[#0B1F3A]'
                      }`}
                    >
                      <span className="font-mono text-xs text-slate-400 tabular-nums">
                        {service.number}
                      </span>
                      <span className="truncate">{service.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className={`relative py-2 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 ${
              isNavItemActive('contact')
                ? 'text-[#0B1F3A] font-semibold'
                : 'text-slate-600 hover:text-[#0B1F3A]'
            }`}
          >
            Contact Us
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 -bottom-0.5 h-0.5 bg-blue-700 transition-transform duration-200 origin-left ${
                isNavItemActive('contact') ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </button>
        </nav>

        {/* Zone 3: Primary Action + Mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onRequestQuote();
            }}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#0B1F3A] px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Get a Quote
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 lg:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = isNavItemActive(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLinkClick(item.id)}
                  className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium ${
                    active ? 'bg-blue-50 text-blue-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.detailView && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileMenuOpen(false);
                        onOpenDetailView(item.detailView!);
                      }}
                      className="text-xs font-medium text-blue-700 underline underline-offset-2"
                    >
                      Details
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-2 pb-1 px-3 text-xs font-semibold text-slate-400">
              Service Verticals
            </div>
            {SERVICES_CONTENT.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => handleServiceSelect(service.id)}
                className={`flex min-h-[44px] items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm ${
                  activeView === service.id
                    ? 'bg-blue-50 text-blue-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="font-mono text-xs text-slate-400 tabular-nums">
                  {service.number}
                </span>
                <span>{service.title}</span>
              </button>
            ))}

            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              className={`flex min-h-[44px] items-center rounded-lg px-3 py-2 text-left text-sm font-medium ${
                isNavItemActive('contact')
                  ? 'bg-blue-50 text-blue-800 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </button>

            <div className="pt-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestQuote();
                }}
                className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#0B1F3A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
