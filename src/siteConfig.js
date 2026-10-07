// ─────────────────────────────────────────────────────────────
// ONE place for business facts (NAP). Every page reads from here,
// so name / address / phone are always identical (Local SEO rule).
// Items marked TODO come from "Section 1 – Fix before launch".
// ─────────────────────────────────────────────────────────────

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.bayana.ae').replace(/\/$/, '')

// TODO (issue #2): set to true only once the CSP licence (activity 7025)
// shows on the ADGM public register. While false, SPV / Foundation / CSP pages
// show a "coming soon" notice and never claim the licence.
export const CSP_LICENCE_CONFIRMED = false

export const business = {
  name: 'Bayana Global Limited',
  shortName: 'Bayana',
  tagline: 'Administrative & Documentation Services',
  street: '3812, Addax Tower',
  area: 'Al Reem Island',
  city: 'Abu Dhabi',
  country: 'United Arab Emirates',
  countryCode: 'AE',
  addressLine: '3812, Addax Tower, Al Reem Island, Abu Dhabi, United Arab Emirates',
  phone: '+971 50 107 4414',
  phoneHref: 'tel:+971501074414',
  whatsapp: '971501074414',
  email: 'info@bayana.ae', // TODO: confirm (hidden by Cloudflare on the old site)
  licenceNumber: '', // TODO: add ADGM licence number
  // TODO: confirm exact coordinates of Addax Tower from the Google Business Profile pin
  geo: { lat: 24.4966, lng: 54.4063 },
  mapEmbed:
    'https://www.google.com/maps?q=Addax+Tower+Al+Reem+Island+Abu+Dhabi&output=embed',
  mapLink: 'https://maps.google.com/?q=Addax+Tower+Al+Reem+Island+Abu+Dhabi',
  hours: [
    { days: 'Mon – Thu', time: '8:00 – 17:00' },
    { days: 'Fri', time: '8:00 – 11:30' },
    { days: 'Sat – Sun', time: 'Closed' },
  ],
  openingHoursSpec: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '08:00', closes: '17:00' },
    { dayOfWeek: ['Friday'], opens: '08:00', closes: '11:30' },
  ],
  social: {
    // TODO: paste real profile URLs
    linkedin: 'https://www.linkedin.com/company/bayana-global',
    instagram: 'https://www.instagram.com/bayana.global',
    facebook: 'https://www.facebook.com/bayana.global',
  },
  partner: { name: 'Aegis Coworking Business Center', url: 'https://aegiscoworking.ae' },
  director: 'Mohammed Swalih Kalippadath',
  logo: '/logo.png', // public/logo.png (used in schema)
  ogImage: '/og-image.jpg',
}

export const whatsappLink = (text = 'Hello Bayana, I would like to know more about your ADGM services.') =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`

export const DISCLAIMER =
  "Government, ADGM and court fees are separate from Bayana's professional fees. All services are subject to applicable ADGM requirements."

// Header menu (blueprint section 3). Slugs point to entries in `services` below
export const nav = [
  { label: 'Home', to: '/' },
  {
    label: 'Company Setup',
    children: [
      'adgm-company-formation',
      'adgm-financial-services-company-setup',
      'adgm-non-financial-company-setup',
      'adgm-retail-licence',
      'ded-to-adgm-licence-conversion',
      'adgm-spv-setup',
      'adgm-foundation-setup',
    ],
  },
  {
    label: 'Corporate Services',
    children: [
      'adgm-csp-registered-office',
      'adgm-annual-filings-licence-renewal',
      'adgm-company-closure',
      'adgm-aml-dnfbp-compliance',
    ],
  },
  { label: 'Visa & Office', children: ['adgm-visa-work-permit', 'adgm-office-space-lease'] },
  {
    label: 'Legal & Documents',
    children: ['adgm-courts-notary', 'adgm-non-muslim-will-registration', 'legal-translation-attestation-abu-dhabi'],
  },
  { label: 'Other Free Zones', to: '/uae-free-zone-company-setup' },
  { label: 'About', to: '/about' },
]

// ─────────────────────────────────────────────────────────────
// Service list: used by the menu, footer, cards, contact-form dropdown,
// breadcrumbs, prerender and sitemap. Each service's full content lives in
// its own file in src/pages/<page>.jsx
// ─────────────────────────────────────────────────────────────
export const services = [
  { id: 6, slug: 'adgm-company-formation', page: 'CompanyFormation', group: 'Company Setup', short: 'ADGM Company Formation', cardText: 'Structure advice, name reservation, documents, KYC and Registration Authority filing.' },
  { id: 7, slug: 'adgm-financial-services-company-setup', page: 'FinancialSetup', group: 'Company Setup', short: 'Financial Sector Setup', cardText: 'Corporate setup for asset managers, advisers and brokers, alongside your FSRA consultant.' },
  { id: 8, slug: 'adgm-non-financial-company-setup', page: 'NonFinancialSetup', group: 'Company Setup', short: 'Non-Financial Setup', cardText: 'Consultancy, technology, holding, trading and professional services companies.' },
  { id: 9, slug: 'adgm-retail-licence', page: 'RetailLicence', group: 'Company Setup', short: 'Retail Licence', cardText: 'Licences for shops, restaurants, cafés and salons on Al Reem Island.' },
  { id: 10, slug: 'ded-to-adgm-licence-conversion', page: 'DedToAdgmConversion', group: 'Company Setup', short: 'DED to ADGM Conversion', cardText: '500+ conversions handled for Al Reem Island businesses.' },
  { id: 11, slug: 'adgm-spv-setup', page: 'SpvSetup', group: 'Company Setup', short: 'SPV Setup', cardText: 'Special purpose vehicles to hold shares, property or investments.' },
  { id: 12, slug: 'adgm-foundation-setup', page: 'FoundationSetup', group: 'Company Setup', short: 'Foundation Setup', cardText: 'Foundations for asset protection and family succession.' },
  { id: 13, slug: 'adgm-csp-registered-office', page: 'CspRegisteredOffice', group: 'Corporate Services', short: 'CSP & Registered Office', cardText: 'Registered office, registered agent and statutory filings.' },
  { id: 14, slug: 'adgm-annual-filings-licence-renewal', page: 'FilingsRenewal', group: 'Corporate Services', short: 'Filings & Licence Renewal', cardText: 'Renewal, confirmation statement, accounts, data protection and amendments.' },
  { id: 15, slug: 'adgm-company-closure', page: 'CompanyClosure', group: 'Corporate Services', short: 'Company Closure', cardText: 'Visa cancellations, final filings, licence cancellation and strike-off.' },
  { id: 16, slug: 'adgm-visa-work-permit', page: 'VisaWorkPermit', group: 'Visa & Office', short: 'Visa & Work Permits', cardText: 'Establishment card, director, employee and dependent visas, work permits.' },
  { id: 17, slug: 'adgm-office-space-lease', page: 'OfficeSpaceLease', group: 'Visa & Office', short: 'Office Space & Lease Upgrade', cardText: 'Desks and offices at Addax Tower, AccessRP registration and visa-quota upgrades.' },
  { id: 18, slug: 'adgm-courts-notary', page: 'CourtsNotary', group: 'Legal & Documents', short: 'Notary Services', cardText: 'Powers of attorney, resolutions and declarations at ADGM Courts.' },
  { id: 19, slug: 'adgm-non-muslim-will-registration', page: 'NonMuslimWills', group: 'Legal & Documents', short: 'Non-Muslim Wills', cardText: 'Register a will covering UAE assets and guardianship at ADGM Courts.' },
  { id: 20, slug: 'legal-translation-attestation-abu-dhabi', page: 'TranslationAttestation', group: 'Legal & Documents', short: 'Translation & Attestation', cardText: 'Certified translation, MOFA legalisation and ADGM certificates.' },
  { id: 21, slug: 'adgm-aml-dnfbp-compliance', page: 'AmlCompliance', group: 'Corporate Services', short: 'AML & DNFBP Compliance', cardText: 'MLRO, AML/KYC policies and goAML registration through partners.' },
  { id: 22, slug: 'uae-free-zone-company-setup', page: 'OtherFreeZones', group: 'Other', short: 'Other UAE Free Zones', cardText: 'Abu Dhabi mainland, Meydan, Dubai South, Ajman and more.' },
]

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]))
