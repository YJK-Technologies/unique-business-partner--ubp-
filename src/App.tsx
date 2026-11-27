/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { DetailView } from './components/DetailView';
import { Footer } from './components/Footer';
import { Navbar, NavSectionId } from './components/Navbar';
import { OverviewPage } from './components/OverviewPage';
import { ViewId } from './data/ubpContent';

const SECTION_IDS: NavSectionId[] = [
  'home',
  'about',
  'vision-mission',
  'why-ubp',
  'services',
  'contact',
];

const DETAIL_VIEWS: ViewId[] = [
  'about',
  'vision-mission',
  'why-ubp',
  'hr-management',
  'admin-management',
  'finance-accounts',
  'operations-management',
  'legal-consulting',
  'corporate-events',
];

export default function App() {
  const [activeView, setActiveView] = useState<ViewId>('overview');
  const [activeScrollSection, setActiveScrollSection] = useState<NavSectionId>('home');
  const [pendingScrollSection, setPendingScrollSection] = useState<NavSectionId | null>(null);

  // Sync initial hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '');
      if (rawHash.startsWith('detail/')) {
        const detailKey = rawHash.replace('detail/', '') as ViewId;
        if (DETAIL_VIEWS.includes(detailKey)) {
          setActiveView(detailKey);
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        }
      } else if (rawHash === '' || rawHash === 'overview') {
        setActiveView('overview');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // ScrollSpy listener when on Overview page
  useEffect(() => {
    if (activeView !== 'overview') return;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 120;
      let current: NavSectionId = 'home';

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            current = id;
          }
        }
      }

      // Ensure Contact highlights near page bottom
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40
      ) {
        current = 'contact';
      }

      setActiveScrollSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [activeView]);

  // Execute deferred scroll when switching back from a detail view to an overview section
  useEffect(() => {
    if (activeView === 'overview' && pendingScrollSection) {
      const targetId = pendingScrollSection;
      setPendingScrollSection(null);
      requestAnimationFrame(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  }, [activeView, pendingScrollSection]);

  const handleNavigateSection = useCallback(
    (section: NavSectionId) => {
      if (activeView !== 'overview') {
        setActiveView('overview');
        window.history.replaceState(null, '', '#overview');
        setPendingScrollSection(section);
        setActiveScrollSection(section);
        return;
      }

      setActiveScrollSection(section);
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [activeView]
  );

  const handleOpenDetailView = useCallback((view: ViewId) => {
    if (view === 'overview') {
      setActiveView('overview');
      window.history.replaceState(null, '', '#overview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setActiveView(view);
    window.history.pushState(null, '', `#detail/${view}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToOverview = useCallback(() => {
    setActiveView('overview');
    window.history.pushState(null, '', '#overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRequestQuote = useCallback(() => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleNavigateSection('contact');
    }
  }, [handleNavigateSection]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        activeView={activeView}
        activeScrollSection={activeScrollSection}
        onNavigateSection={handleNavigateSection}
        onOpenDetailView={handleOpenDetailView}
        onRequestQuote={handleRequestQuote}
      />

      <main className="flex-1">
        {activeView === 'overview' ? (
          <OverviewPage
            onOpenDetailView={handleOpenDetailView}
            onScrollToSection={(sectionId) => handleNavigateSection(sectionId)}
          />
        ) : (
          <DetailView
            viewId={activeView}
            onBackToOverview={handleBackToOverview}
            onOpenDetailView={handleOpenDetailView}
          />
        )}
      </main>

      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenDetailView={handleOpenDetailView}
      />
    </div>
  );
}
