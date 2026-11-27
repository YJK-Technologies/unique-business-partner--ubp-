/**
 * UNIQUE Business Partner (UBP) — Pure Vanilla JavaScript (Multi-Page + ScrollSpy)
 * Handles:
 *  1. Navbar scroll state & responsive mobile menu toggler auto-close
 *  2. Automatic active link highlighting (Page URL on subpages + ScrollSpy on index.html)
 *  3. Services page Bootstrap Nav-Tab hash activation, dropdown active sync & HR filtering
 *  4. Contact Enquiry Form pre-selection & Google Apps Script fetch() submission
 */

// Replace with your deployed Google Apps Script Web App URL after deploying Code.gs
const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_GOOGLE_APPS_SCRIPT_DEPLOYMENT_ID/exec';

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('ubp-navbar');
  const navbarCollapseEl = document.getElementById('ubpNavbarNav');
  const navLinks = Array.from(document.querySelectorAll('#ubpNavbarNav .nav-link[data-page]'));
  const dropdownItems = Array.from(document.querySelectorAll('.ubp-dropdown-menu .dropdown-item'));

  const enquiryForm = document.getElementById('ubp-enquiry-form');
  const submitBtn = document.getElementById('enquiry-submit-btn');
  const submitBtnLabel = document.getElementById('enquiry-submit-label');
  const submitBtnSpinner = document.getElementById('enquiry-submit-spinner');
  const formAlert = document.getElementById('form-status-alert');
  const serviceSelect = document.getElementById('enquiry-service');

  const SERVICE_TAB_IDS = [
    'hr-management',
    'admin-management',
    'finance-accounts',
    'operations-management',
    'legal-consulting',
    'corporate-events',
  ];

  function getCurrentPageFilename() {
    const rawPath = window.location.pathname.split('/').pop() || 'index.html';
    return rawPath === '' ? 'index.html' : rawPath.toLowerCase();
  }

  // Close mobile collapse menu on navigation link click
  function closeMobileNavbar() {
    if (!navbarCollapseEl || !navbarCollapseEl.classList.contains('show')) return;
    if (window.bootstrap && window.bootstrap.Collapse) {
      window.bootstrap.Collapse.getOrCreateInstance(navbarCollapseEl).hide();
    } else {
      navbarCollapseEl.classList.remove('show');
    }
  }

  document
    .querySelectorAll('#ubpNavbarNav a.nav-link:not(.dropdown-toggle), #ubpNavbarNav .dropdown-item')
    .forEach((el) => {
      el.addEventListener('click', closeMobileNavbar);
    });

  // Set active nav-link by target key ('index.html' | 'about.html' | 'vision-mission.html' | 'why-ubp.html' | 'services.html' | 'contact')
  function setActiveNavPage(activeTarget) {
    navLinks.forEach((link) => {
      const targetPage = (link.getAttribute('data-page') || '').toLowerCase();
      const isActive = targetPage === activeTarget;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  // Highlight active item inside Services dropdown menu on services.html
  function updateServicesDropdownActive(activeTabId) {
    const currentPage = getCurrentPageFilename();
    if (currentPage !== 'services.html') {
      dropdownItems.forEach((item) => item.classList.remove('active'));
      return;
    }

    const resolvedHash = `#${activeTabId || 'hr-management'}`.toLowerCase();
    dropdownItems.forEach((item) => {
      const href = (item.getAttribute('href') || '').toLowerCase();
      const matchesService = href.endsWith(resolvedHash);
      item.classList.toggle('active', matchesService);
    });
  }

  // 1. ScrollSpy on index.html + Navbar Scroll Elevation across all pages
  const indexScrollTargets = [
    { id: 'home', navKey: 'index.html' },
    { id: 'services', navKey: 'services.html' },
    { id: 'contact', navKey: 'contact' },
  ];

  function updateScrollState() {
    if (navbar) {
      navbar.classList.toggle('is-scrolled', window.scrollY > 12);
    }

    const currentPage = getCurrentPageFilename();
    if (currentPage !== 'index.html' && currentPage !== '') {
      return;
    }

    const navbarOffset = (navbar ? navbar.offsetHeight : 76) + 56;
    const scrollMarker = window.scrollY + navbarOffset;
    let activeKey = 'index.html';

    indexScrollTargets.forEach((entry) => {
      const sectionEl = document.getElementById(entry.id);
      if (sectionEl && scrollMarker >= sectionEl.offsetTop) {
        activeKey = entry.navKey;
      }
    });

    // If scrolled near page bottom, prioritize Contact Us
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
      activeKey = 'contact';
    }

    setActiveNavPage(activeKey);
  }

  // 2. Initialize Active Page Highlighting
  function syncActiveNavigation() {
    const currentPage = getCurrentPageFilename();
    const currentHash = window.location.hash.replace('#', '').toLowerCase();

    if (currentPage === 'index.html' || currentPage === '') {
      if (currentHash === 'contact') {
        setActiveNavPage('contact');
      } else if (currentHash === 'services') {
        setActiveNavPage('services.html');
      } else {
        updateScrollState();
      }
      updateServicesDropdownActive(null);
      return;
    }

    setActiveNavPage(currentPage);

    if (currentPage === 'services.html') {
      const activeService = SERVICE_TAB_IDS.includes(currentHash) ? currentHash : 'hr-management';
      updateServicesDropdownActive(activeService);
    }
  }

  window.addEventListener('scroll', updateScrollState, { passive: true });
  window.addEventListener('hashchange', syncActiveNavigation);
  syncActiveNavigation();

  // 3. Services Page: Activate Bootstrap Tab matching URL Hash (#hr-management, etc.)
  const serviceTabTriggers = Array.from(document.querySelectorAll('[data-service-tab]'));

  function activateServiceTabFromHash() {
    if (serviceTabTriggers.length === 0) return;
    const hashId = window.location.hash.replace('#', '').toLowerCase();
    const resolvedId = SERVICE_TAB_IDS.includes(hashId) ? hashId : 'hr-management';

    const matchingTrigger = serviceTabTriggers.find(
      (btn) => (btn.getAttribute('data-service-tab') || '').toLowerCase() === resolvedId
    );

    if (matchingTrigger && window.bootstrap && window.bootstrap.Tab) {
      window.bootstrap.Tab.getOrCreateInstance(matchingTrigger).show();
      updateServicesDropdownActive(resolvedId);

      if (hashId && SERVICE_TAB_IDS.includes(hashId)) {
        const tabContainer = document.getElementById('services-tabs-section');
        if (tabContainer) {
          setTimeout(() => {
            tabContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 60);
        }
      }
    }
  }

  serviceTabTriggers.forEach((btn) => {
    btn.addEventListener('shown.bs.tab', () => {
      const tabId = btn.getAttribute('data-service-tab');
      if (tabId) {
        if (window.location.hash !== `#${tabId}`) {
          window.history.replaceState(null, '', `#${tabId}`);
        }
        setActiveNavPage('services.html');
        updateServicesDropdownActive(tabId);
      }
    });
  });

  // Support "Next Vertical" buttons inside services.html tab panes
  document.querySelectorAll('[data-next-service-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextId = btn.getAttribute('data-next-service-tab');
      if (!nextId) return;
      const targetTrigger = serviceTabTriggers.find(
        (tabBtn) => tabBtn.getAttribute('data-service-tab') === nextId
      );
      if (targetTrigger && window.bootstrap && window.bootstrap.Tab) {
        window.bootstrap.Tab.getOrCreateInstance(targetTrigger).show();
        const tabContainer = document.getElementById('services-tabs-section');
        if (tabContainer) {
          tabContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  activateServiceTabFromHash();
  window.addEventListener('hashchange', activateServiceTabFromHash);

  // HR Group Filter Tabs inside Services Page (Vertical 01: HR Management)
  const hrFilterTabs = Array.from(document.querySelectorAll('[data-hr-filter]'));
  const hrGroups = Array.from(document.querySelectorAll('[data-hr-group]'));

  hrFilterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filterValue = tab.getAttribute('data-hr-filter');
      hrFilterTabs.forEach((t) => t.classList.toggle('active', t === tab));
      hrGroups.forEach((group) => {
        if (filterValue === 'all' || group.getAttribute('data-hr-group') === filterValue) {
          group.classList.remove('d-none');
        } else {
          group.classList.add('d-none');
        }
      });
    });
  });

  // 4. Pre-select Service Vertical on index.html?service=...#contact
  if (serviceSelect) {
    const params = new URLSearchParams(window.location.search);
    const requestedService = params.get('service');
    if (requestedService) {
      const matchingOption = Array.from(serviceSelect.options).find(
        (opt) => opt.value.toLowerCase() === requestedService.toLowerCase()
      );
      if (matchingOption) {
        serviceSelect.value = matchingOption.value;
      }
    }
  }

  // Dynamic Footer Year
  const yearEl = document.getElementById('ubp-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // 5. Google Apps Script Enquiry Form Submission
  function showFormAlert(type, title, message) {
    if (!formAlert) return;
    formAlert.className = `alert alert-${type} d-flex align-items-start gap-2 mb-4`;
    formAlert.setAttribute('role', 'alert');
    formAlert.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'} mt-1"></i>
      <div>
        <strong class="d-block">${title}</strong>
        <span class="small">${message}</span>
      </div>
    `;
  }

  function setSubmittingState(isLoading) {
    if (!submitBtn || !submitBtnLabel || !submitBtnSpinner) return;
    submitBtn.disabled = isLoading;
    submitBtnSpinner.classList.toggle('d-none', !isLoading);
    submitBtnLabel.textContent = isLoading ? 'Submitting Enquiry...' : 'Request Consultation';
  }

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!enquiryForm.checkValidity()) {
        enquiryForm.classList.add('was-validated');
        showFormAlert(
          'danger',
          'Please check the required fields',
          'Ensure your name, organization, valid email address, phone number, and requirement summary are completed.'
        );
        return;
      }

      enquiryForm.classList.remove('was-validated');

      if (SCRIPT_URL.includes('YOUR_GOOGLE_APPS_SCRIPT_DEPLOYMENT_ID')) {
        showFormAlert(
          'warning',
          'Google Apps Script URL Not Configured Yet',
          'Replace SCRIPT_URL in script.js with your deployed Google Apps Script Web App URL from Code.gs to enable live sheet & email submissions. In the meantime, you can reach us directly at uniquebusinesspartner@gmail.com or +91 44 4280 4200.'
        );
        return;
      }

      setSubmittingState(true);
      if (formAlert) {
        formAlert.className = 'd-none';
      }

      try {
        const response = await fetch(SCRIPT_URL, {
          method: 'POST',
          body: new FormData(enquiryForm),
        });

        let result = { status: 'success' };
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          result = await response.json();
        }

        if (!response.ok || result.status === 'error') {
          throw new Error(result.message || 'Unable to process your request at this time.');
        }

        showFormAlert(
          'success',
          'Consultation Enquiry Submitted Successfully',
          'Thank you for contacting UNIQUE Business Partner. Our operations leadership team has received your enquiry and will respond shortly.'
        );
        enquiryForm.reset();
      } catch (err) {
        showFormAlert(
          'danger',
          'Submission Failed',
          err instanceof Error
            ? `${err.message} Please contact us directly at uniquebusinesspartner@gmail.com or +91 44 4280 4200.`
            : 'An unexpected network error occurred. Please contact us directly at uniquebusinesspartner@gmail.com.'
        );
      } finally {
        setSubmittingState(false);
      }
    });
  }
});
