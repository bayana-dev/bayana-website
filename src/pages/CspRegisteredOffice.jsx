import ServiceLayout from '../components/ServiceLayout'
import { L, Ext } from '../components/InlineLink'
import { CSP_LICENCE_CONFIRMED } from '../siteConfig'

// Blueprint page 13 — /adgm-csp-registered-office
// Main keyword: ADGM company service provider
// Edit this page's text, FAQs and links in the object below. Layout is in components/ServiceLayout.jsx.
// CSP wording only shows once CSP_LICENCE_CONFIRMED = true in siteConfig.js
const service = {
  id: 13,
  slug: 'adgm-csp-registered-office',
  requiresCsp: true,
  keyword: 'ADGM company service provider',
  title: CSP_LICENCE_CONFIRMED
    ? 'ADGM Company Service Provider (CSP) | Bayana'
    : 'ADGM Registered Office & Registered Agent Services | Bayana',
  // Meta rule: only use the licence wording once CSP_LICENCE_CONFIRMED = true
  description: 'Registered office and corporate filing support for ADGM companies, SPVs and foundations from Bayana on Al Reem Island, through channel partners.',
  descriptionLicensed:
    'Bayana is an ADGM company service provider (activity 7025) offering registered office, registered agent and statutory filing services for SPVs and foundations.',
  h1: CSP_LICENCE_CONFIRMED
    ? 'ADGM Company Service Provider and Registered Office Services'
    : 'ADGM Registered Office and Registered Agent Services',
  intro: (
    <p>
      ADGM registered office and registered agent services for SPVs, foundations and companies — provided through
      channel partners for structures set up via <L to="adgm-company-formation">ADGM company formation</L>.
    </p>
  ),
  sections: [
    { h2: CSP_LICENCE_CONFIRMED ? 'Our CSP Services' : 'Our Registered Office Services', bullets: ['Registered office address', 'Registered agent', 'Statutory registers', 'UBO records', 'Filings with the Registration Authority', 'Licence renewal'] },
    { h2: 'Registered Office for Operating Companies', text: <p>Operating companies need a desk or office. We arrange this through <Ext href="https://www.aegiscoworking.ae/">Aegis Coworking</Ext> — see <L to="adgm-office-space-lease">ADGM office space on Al Reem Island</L>.</p> },
    { h2: CSP_LICENCE_CONFIRMED ? 'Switching Your CSP to Bayana' : 'Moving Your Registered Office to Bayana', bullets: ['Review your current CSP agreement and notice terms', 'KYC and onboarding with Bayana', 'Board resolution approving the change', 'Registered address change filed with the Registration Authority', 'Hand-over of registers and records'] },
  ],
  steps: null,
  audience: 'SPVs, foundations and ADGM companies that need a registered office or agent.',
  faqs: [
    { q: 'What is a CSP in ADGM?', a: 'A licensed firm that provides registered office, registered agent and related corporate services.' },
    { q: 'Who must appoint one?', a: 'Non-exempt SPVs and foundations, among others. (VERIFY)' },
    { q: 'What is the difference between a registered office and a registered agent?', a: 'The registered office is the official address recorded for the entity on the ADGM register. A registered agent is the licensed CSP appointed to act for the entity and keep its records and filings up to date. For non-exempt SPVs and foundations, the CSP provides both. (VERIFY)' },
        { q: 'Can I change my CSP?', a: 'Yes. See the steps for moving your registered office above.' },
  ],
  related: ['adgm-spv-setup', 'adgm-foundation-setup', 'adgm-annual-filings-licence-renewal'],
  disclaimer: true,
}

function CspRegisteredOffice() {
  return <ServiceLayout service={service} />
}

export default CspRegisteredOffice
