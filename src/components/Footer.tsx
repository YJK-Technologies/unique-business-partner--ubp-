import React from 'react';
import { CONTACT_CONTENT, SERVICES_CONTENT, ViewId } from '../data/ubpContent';
import { NavSectionId } from './Navbar';
import { UbpLogo } from './UbpLogo';

interface FooterProps {
  onNavigateSection: (section: NavSectionId) => void;
  onOpenDetailView: (view: ViewId) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenDetailView,
}) => {
  return (
    <footer className="bg-[#071528] text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-4">
            <UbpLogo variant="light" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Your Integrated Business Operations Enablement Partner. Owning and executing your success with 24/7, 360-degree operational accountability.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display text-xs font-semibold tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenDetailView('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us & Leadership
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenDetailView('vision-mission')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Vision & Mission
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenDetailView('why-ubp')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Why UBP
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-xs font-semibold tracking-wider text-white">
              Service Verticals
            </h3>
            <ul className="space-y-2 text-sm">
              {SERVICES_CONTENT.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onOpenDetailView(service.id)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-xs font-semibold tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-2 text-sm tabular-nums">
              {CONTACT_CONTENT.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="hover:text-white transition-colors"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <a
                  href={`mailto:${CONTACT_CONTENT.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {CONTACT_CONTENT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} UNIQUE Business Partner (UBP). All rights reserved.</p>
          <p>24/7 Support · 360° Solutions</p>
        </div>
      </div>
    </footer>
  );
};
