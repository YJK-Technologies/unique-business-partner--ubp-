export type ViewId =
  | 'overview'
  | 'about'
  | 'vision-mission'
  | 'why-ubp'
  | 'hr-management'
  | 'admin-management'
  | 'finance-accounts'
  | 'operations-management'
  | 'legal-consulting'
  | 'corporate-events';

export type ServiceId =
  | 'hr-management'
  | 'admin-management'
  | 'finance-accounts'
  | 'operations-management'
  | 'legal-consulting'
  | 'corporate-events';

export interface ServiceItem {
  title: string;
  description: string;
}

export interface ServiceGroup {
  groupTitle: string;
  items: ServiceItem[];
}

export interface ServiceVertical {
  id: ServiceId;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  intro: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  groups: ServiceGroup[];
}

export const IMAGES = {
  heroBoardroom: '/src/assets/images/hero_boardroom_1794977875356.jpg',
  whyUbpSkyline: '/src/assets/images/why_ubp_skyline_1794977877147.jpg',
  hrAdmin: '/src/assets/images/service_hr_admin_1794977900916.jpg',
  financeOps: '/src/assets/images/service_finance_ops_1794977878338.jpg',
  legalEvents: '/src/assets/images/service_legal_events_1794977878652.jpg',
  mathiPortrait: '/assets/mathi-purshoth.jpg',
};

export const HERO_CONTENT = {
  kicker: 'UNIQUE business partner provides',
  headline: 'Your Integrated Business Operations Enablement Partner',
  subHeadline: 'Owning and Executing Your Success',
  summary:
    'Supporting organizations from ground-level execution to leadership oversight with 24/7 operational continuity, statutory governance, and 360-degree functional accountability.',
  trustPoints: ['24/7 Support', '360° Solutions', 'End-to-End Ownership'],
  primaryCta: 'Explore Our Services',
  secondaryCta: 'Book a Consultation',
};

export const ABOUT_CONTENT = {
  title: 'About UNIQUE Business Partner (UBP)',
  overview:
    'UNIQUE Business Partner (UBP) is an integrated business execution and operations partner supporting organizations from ground-level execution to leadership oversight. We bring structure, accountability, and continuity across critical business functions.',
  scopeSummary:
    'UBP operates across Human Resources, Finance & Accounts, Administration, Legal Services, Operations Management, and Corporate Events.',
  operatingFunctions: [
    'Human Resources',
    'Finance & Accounts',
    'Administration',
    'Legal Services',
    'Operations Management',
    'Corporate Events',
  ],
  leadership: {
    sectionTitle: 'Leadership Team',
    name: 'Mathi Purshoth',
    designation: 'Head – HR & Operations',
    experienceYears: '15+ Years of Experience',
    portrait: IMAGES.mathiPortrait,
    experienceHighlights: [
      'IT & Non-IT Recruitment',
      'Payroll & Statutory Compliance',
      'Industrial Relations & Company Licences',
      'Training & Development (NSDC / NABH)',
      'HR Governance & Process Implementation',
    ],
    academicCredentials: [
      'Dual MBA – Travel & Tourism Management & Human Resources',
      'Master of Law (ML) – Corporate Law',
      'LL.B (Hons) – Pursuing',
    ],
    softwareExpertise: [
      'Zoho Books',
      'Tally ERP',
      'GST Portal',
      'Income Tax Portal',
      'Other Accounting Software',
    ],
    regulatoryLicences: [
      'Shops & Establishment',
      'Factory Licence',
      'CLRA',
      'Trade Licence',
      'Professional Tax',
      'Labour Welfare',
      'NSDC',
      'NABH',
    ],
  },
};

export const VISION_MISSION_CONTENT = {
  visionTitle: 'Vision',
  visionStatement:
    'To be a trusted and accountable business operations partner delivering 24/7, 360-degree execution—enabling organizations to operate with continuity, control, and confidence, without operational gaps or dependency on internal bandwidth.',
  missionTitle: 'Mission',
  missionIntro: 'Our mission is to own and execute business support functions end-to-end by:',
  missionPillars: [
    {
      number: '01',
      title: 'Continuous 24/7 Operational Availability',
      description: 'Ensuring uninterrupted support coverage across critical shifts, deadlines, and escalations.',
    },
    {
      number: '02',
      title: 'Integrated Strategy, Execution & Reporting',
      description: 'Delivering seamless alignment from executive strategy down to ground-level workflows and MIS reporting.',
    },
    {
      number: '03',
      title: 'Unified Planning, Control & Governance',
      description: 'Managing planning, internal controls, and corporate governance under a single unified framework.',
    },
    {
      number: '04',
      title: 'Disciplined Multi-Domain Oversight',
      description: 'Maintaining rigorous oversight across people, processes, budgets, and statutory compliance.',
    },
    {
      number: '05',
      title: 'Full Scope-Aligned Accountability',
      description: 'Taking complete ownership of outcomes aligned with defined scope and business priorities.',
    },
  ],
};

export const WHY_UBP_CONTENT = {
  title: 'Why UNIQUE Business Partner?',
  deliveryModel: {
    title: 'Service Delivery Model',
    intro:
      'At UNIQUE Business Partner, our delivery structure is designed to align with business size, operational complexity, and risk exposure. We operate through flexible engagement models:',
    models: [
      {
        name: 'In-House',
        description: 'Dedicated on-site operational ownership',
      },
      {
        name: 'Outsource',
        description: 'Complete functional accountability',
      },
      {
        name: 'Hybrid',
        description: 'On-site + remote integrated governance',
      },
      {
        name: 'Project Basis',
        description: 'Defined scope with performance-driven execution accountability',
      },
    ],
  },
  pricingApproach: {
    title: 'Pricing Approach',
    intro: 'Our pricing reflects ownership, risk, and operational depth—not just manpower allocation. Pricing is structured based on:',
    factors: [
      'Scope of ownership',
      'Client budget size',
      'Operational & compliance risk level',
      '24/7 responsibility requirement',
      'Hybrid model: Base + performance-linked component or fixed monthly management fee',
    ],
    tagline: 'Transparent. Structured. Outcome-driven.',
  },
  support247: {
    title: 'What 24/7 Really Means',
    intro: '24/7 is not about extended hours—it is about uninterrupted responsibility.',
    pillars: [
      'Always-on operational support',
      'Crisis & escalation handling',
      'Business continuity coverage',
      'Backup resource availability',
    ],
    tagline: 'Your business never stops. Neither do we.',
  },
  whyUbp: {
    title: 'Why UBP?',
    intro: 'Organizations choose us because we operate as extension partners—',
    differentiators: [
      'Ownership-driven execution',
      'Senior-level strategic framework',
      'Cross-functional operational alignment',
      'Leadership emphasis with ground-level discipline',
      'Measurable execution outcomes',
    ],
  },
};

export const SERVICES_CONTENT: ServiceVertical[] = [
  {
    id: 'hr-management',
    number: '01',
    title: 'HR Management',
    shortTitle: 'HR Management',
    tagline: 'Workforce Optimization, Talent as a Service & Statutory Governance',
    intro:
      'At UNIQUE Business Partner (UBP), we provide a full spectrum of HR Management solutions, meticulously designed to optimize workforce operations, enhance employee engagement, and ensure statutory compliance.',
    image: IMAGES.hrAdmin,
    imageAlt: 'Executive HR strategy and workforce governance session',
    highlights: [
      'Manpower Planning & TaaS',
      'End-to-End Recruitment & PMS',
      'Payroll Processing & Governance',
      'PF, ESI, PT, Gratuity & CLRA Compliance',
    ],
    groups: [
      {
        groupTitle: 'Core HR Services',
        items: [
          {
            title: 'Manpower Planning & Strategic Workforce Management',
            description:
              'Structured headcount planning and organizational capacity mapping aligned to business growth targets and operational workloads.',
          },
          {
            title: 'Talent Acquisition & Talent as a Service (TaaS)',
            description:
              'We provide end-to-end recruitment and on-demand talent solutions to meet short-term and long-term business needs. Our TaaS model ensures access to skilled professionals without long-term hiring overhead.',
          },
          {
            title: 'End-to-End Recruitment Lifecycle Management',
            description:
              'We manage the complete recruitment process—from sourcing and screening to onboarding—ensuring quality hires, faster turnaround, and reduced recruitment costs.',
          },
          {
            title: 'Performance Management Systems (PMS & KRAs)',
            description:
              'We design and implement structured performance management frameworks, with clear KPIs and KRAs to align employee performance with organizational objectives and improve accountability.',
          },
          {
            title: 'Learning & Development Programs',
            description:
              'We create customized training and development programs to enhance employee skills, leadership capabilities, and organizational competency—ensuring continuous learning and growth.',
          },
        ],
      },
      {
        groupTitle: 'Compensation & Payroll',
        items: [
          {
            title: 'Compensation & Benefits Structuring & Benchmarking',
            description:
              'We develop competitive salary structures and benefits frameworks based on industry benchmarks to attract, retain, and motivate talent, while ensuring cost efficiency.',
          },
          {
            title: 'Payroll Processing & Payroll Governance',
            description:
              'We manage accurate and timely payroll processing, ensuring compliance with statutory regulations, internal policies, and financial controls.',
          },
        ],
      },
      {
        groupTitle: 'Compliance & Employee Relations',
        items: [
          {
            title: 'Statutory Compliance',
            description:
              'We ensure compliance with labour laws and statutory requirements such as PF, ESI, PT, Gratuity, CLRA, and Shops & Establishments, mitigating legal risks and penalties.',
          },
          {
            title: 'HR Policies, SOPs & Employee Handbooks',
            description:
              'We develop clear HR policies, SOPs, and employee handbooks to ensure consistency, transparency, and compliance across organizational processes.',
          },
          {
            title: 'Industrial Relations & Employee Relations Management',
            description:
              'We support healthy employee relationships, manage union interactions, and handle employee communication to maintain workplace harmony.',
          },
          {
            title: 'Exit Management & Knowledge Transfer Processes',
            description:
              'Structured exit interviews, full-and-final settlement governance, and systematic knowledge transfer protocols to protect operational continuity.',
          },
        ],
      },
    ],
  },
  {
    id: 'admin-management',
    number: '02',
    title: 'Administration Management',
    shortTitle: 'Administration',
    tagline: 'Workplace Infrastructure, Vendor Control & Resource Optimization',
    intro:
      'At UNIQUE Business Partner (UBP), we provide comprehensive Admin Management solutions to ensure seamless administration, operational efficiency, and resource optimization.',
    image: IMAGES.hrAdmin,
    imageAlt: 'Modern administrative workplace facility and operations management',
    highlights: [
      'Office & Facility Management',
      'Vendor & Contract Governance',
      'Asset & Inventory Lifecycle Audits',
      'Security, Housekeeping & Logistics',
    ],
    groups: [
      {
        groupTitle: 'Administration Capabilities',
        items: [
          {
            title: 'Office & Facility Management',
            description:
              'We manage day-to-day office operations, facilities, and infrastructure to ensure a safe, efficient, and well-maintained workplace environment.',
          },
          {
            title: 'Vendor & Contract Management',
            description:
              'We oversee vendor selection, contract negotiation, performance monitoring, and renewals to ensure service quality, compliance, and cost control.',
          },
          {
            title: 'Asset & Inventory Management',
            description:
              'We manage organizational assets and inventory through tracking, audits, and lifecycle management to reduce losses, improve utilization, and ensure accountability.',
          },
          {
            title: 'Travel, Transport & Logistics Coordination',
            description:
              'We coordinate employee travel, transport, and logistics requirements efficiently, ensuring cost optimization and smooth operational support.',
          },
          {
            title: 'Security & Housekeeping Management',
            description:
              'We manage security services and housekeeping operations to maintain workplace safety, hygiene, and compliance with regulatory standards.',
          },
          {
            title: 'Infrastructure & Space Optimization',
            description:
              'We plan and optimize workspace layouts and infrastructure usage to improve productivity and reduce operational costs.',
          },
          {
            title: 'Administrative Policies & Controls',
            description:
              'We design and implement administrative policies, SOPs, and controls to ensure consistency, transparency, and governance in administrative operations.',
          },
        ],
      },
    ],
  },
  {
    id: 'finance-accounts',
    number: '03',
    title: 'Finance & Accounts Management',
    shortTitle: 'Finance & Accounts',
    tagline: 'Bookkeeping, MIS Reporting, Direct/Indirect Tax & Financial Controls',
    intro:
      'At UNIQUE Business Partner (UBP), we deliver structured Finance & Accounts Management covering daily accounting accuracy, taxation filings, working capital discipline, and audit readiness across Zoho Books, Tally ERP, GST, and Income Tax portals.',
    image: IMAGES.financeOps,
    imageAlt: 'Financial governance, audit documentation, and accounting analytics',
    highlights: [
      'Accounting & Bookkeeping',
      'Budgeting, Forecasting & MIS',
      'Direct & Indirect Taxation (GST / IT)',
      'Audit Coordination & Cost Optimization',
    ],
    groups: [
      {
        groupTitle: 'Finance & Accounting Services',
        items: [
          {
            title: 'Accounting & Bookkeeping Services',
            description:
              'We handle day-to-day accounting and bookkeeping activities, ensuring accurate financial records and compliance with accounting standards.',
          },
          {
            title: 'Budgeting, Forecasting & MIS Reporting',
            description:
              'We support financial planning through budgeting and forecasting, along with regular MIS reports to enable informed management decisions.',
          },
          {
            title: 'Payroll Processing & Statutory Compliance',
            description:
              'We coordinate payroll accounting and ensure statutory payments and filings are accurate, timely, and compliant with applicable laws.',
          },
          {
            title: 'Taxation Support (Direct & Indirect)',
            description:
              'We provide support for Income Tax, GST, and other statutory tax requirements, ensuring compliance and efficient tax management.',
          },
          {
            title: 'Cash Flow & Working Capital Management',
            description:
              'We monitor cash flows and working capital cycles to ensure financial stability and uninterrupted business operations.',
          },
          {
            title: 'Audit Coordination & Financial Controls',
            description:
              'We support internal and external audits, strengthen financial controls, and ensure adherence to governance and compliance requirements.',
          },
          {
            title: 'Cost Optimization & Profitability Analysis',
            description:
              'We analyze cost structures and profitability drivers to help organizations improve margins and financial efficiency.',
          },
        ],
      },
    ],
  },
  {
    id: 'operations-management',
    number: '04',
    title: 'Operations Management',
    shortTitle: 'Operations',
    tagline: 'Process Engineering, SOP Governance, Quality & Business Continuity',
    intro:
      'At UNIQUE Business Partner (UBP), we provide comprehensive Operations Management solutions to enhance productivity, streamline processes, and ensure operational resilience.',
    image: IMAGES.financeOps,
    imageAlt: 'Operations management workflow planning and enterprise audit',
    highlights: [
      'Process Mapping & Optimization',
      'SOP Design & Quality Systems',
      'Supply Chain & Vendor Operations',
      'Risk & Business Continuity Planning',
    ],
    groups: [
      {
        groupTitle: 'Operations Excellence Framework',
        items: [
          {
            title: 'Process Mapping & Optimization',
            description:
              'We analyze and map existing processes to identify gaps and redesign workflows for improved efficiency and effectiveness.',
          },
          {
            title: 'SOP Design & Implementation',
            description:
              'We develop clear, structured Standard Operating Procedures to ensure consistency, quality, and scalability in operations.',
          },
          {
            title: 'Productivity & Efficiency Improvement',
            description:
              'We implement productivity improvement initiatives using performance metrics and best practices to enhance operational output.',
          },
          {
            title: 'Quality Management Systems',
            description:
              'We support the design and implementation of quality systems to ensure standardization, compliance, and continuous improvement.',
          },
          {
            title: 'Supply Chain & Vendor Operations',
            description:
              'We manage and optimize supply chain activities and vendor performance to ensure timely delivery, cost efficiency, and reliability.',
          },
          {
            title: 'Risk Management & Business Continuity Planning',
            description:
              'We identify operational risks and design business continuity plans to minimize disruptions and ensure operational resilience.',
          },
        ],
      },
    ],
  },
  {
    id: 'legal-consulting',
    number: '05',
    title: 'Legal Consulting & Services',
    shortTitle: 'Legal Services',
    tagline: 'Corporate Advisory, Contract Vetting, Labour Law & Regulatory Liaison',
    intro:
      'At UNIQUE Business Partner (UBP), we provide expert Legal Consulting & Services tailored to ensure compliance, mitigate risks, and protect your business interests.',
    image: IMAGES.legalEvents,
    imageAlt: 'Corporate legal advisory, contract execution, and compliance governance',
    highlights: [
      'Corporate & Commercial Advisory',
      'Contract Drafting & Review',
      'Labor Law & Regulatory Filings',
      'Non-Litigation Dispute Resolution',
    ],
    groups: [
      {
        groupTitle: 'Legal & Regulatory Advisory',
        items: [
          {
            title: 'Corporate & Commercial Advisory',
            description:
              'We provide advisory support on corporate governance, business agreements, and commercial transactions to safeguard organizational interests.',
          },
          {
            title: 'Statutory & Regulatory Compliance',
            description:
              'We ensure compliance with applicable laws and regulations, reducing legal exposure and ensuring legal clarity.',
          },
          {
            title: 'Contract Drafting & Review',
            description:
              'We draft, review, and vet contracts and agreements to protect business interests and ensure legal clarity.',
          },
          {
            title: 'Labor Law & Employment Advisory',
            description:
              'We provide guidance on labor laws and employment regulations to support compliant people management practices.',
          },
          {
            title: 'Policy Governance & Risk Mitigation',
            description:
              'We assist in policy formulation and governance frameworks to mitigate legal and compliance risks.',
          },
          {
            title: 'Liaison & Documentation Support',
            description:
              'We support statutory filings, documentation, and liaison activities with authorities where required.',
          },
          {
            title: 'Dispute Resolution Support (Non-Litigation)',
            description:
              'We assist in resolving disputes through mediation, negotiation, and other non-litigation methods to reach amicable settlements.',
          },
        ],
      },
    ],
  },
  {
    id: 'corporate-events',
    number: '06',
    title: 'Corporate Event Management',
    shortTitle: 'Corporate Events',
    tagline: 'Conferences, Executive Town Halls, Workshops & End-to-End Execution',
    intro:
      'At UNIQUE Business Partner (UBP), we provide professional Corporate Event Management solutions tailored to elevate your brand, engage your workforce, and create memorable experiences.',
    image: IMAGES.legalEvents,
    imageAlt: 'Corporate town hall summit and executive conference management',
    highlights: [
      'Corporate Meetings & Conferences',
      'Training Programs & Workshops',
      'Annual Meets & Town Halls',
      'Product Launches & Engagement',
    ],
    groups: [
      {
        groupTitle: 'Corporate Event Solutions',
        items: [
          {
            title: 'Corporate Meetings & Conferences',
            description:
              'We plan and execute professional meetings and conferences with end-to-end coordination and seamless execution.',
          },
          {
            title: 'Training Programs & Workshops',
            description:
              'We manage training programs and workshops, including venue, logistics, and coordination, ensuring smooth delivery.',
          },
          {
            title: 'Annual Meets & Town Halls',
            description:
              'We organize annual meetings and town halls that strengthen leadership communication and employee engagement.',
          },
          {
            title: 'Product Launches & Brand Events',
            description:
              'We support product launches and brand events that enhance market visibility and stakeholder engagement.',
          },
          {
            title: 'Employee Engagement Events',
            description:
              'We design and manage employee engagement initiatives that foster team bonding and organizational culture.',
          },
          {
            title: 'Vendor Coordination & Event Logistics',
            description:
              'We manage vendors, logistics, and execution details to ensure timely and hassle-free events.',
          },
          {
            title: 'End-to-End Event Planning & Execution',
            description:
              'We provide complete event management—from concept to execution—ensuring quality, professionalism, and impact.',
          },
        ],
      },
    ],
  },
];

export const CONTACT_CONTENT = {
  quote: 'Success in business is built on strong partnerships, clear strategy, and consistent execution.',
  subtext: 'We provide 24/7, 360-degree services across all sectors, customized to suit your budget.',
  phones: ['+91 44 4280 4200', '+91 7824 809 809', '+91 9994 618 999'],
  email: 'uniquebusinesspartner@gmail.com',
};
