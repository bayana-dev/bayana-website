import ServiceLayout from '../components/ServiceLayout'
import { L } from '../components/InlineLink'

// Blueprint page 14 — /adgm-annual-filings-licence-renewal
// Main keyword: ADGM licence renewal
// Edit this page's text, FAQs and links in the object below. Layout is in components/ServiceLayout.jsx.
const service = {
  id: 14,
  slug: 'adgm-annual-filings-licence-renewal',
  keyword: 'ADGM licence renewal',
  title: 'ADGM Licence Renewal & Annual Filings | Bayana',
  description:
    'Keep your ADGM company compliant: licence renewal, confirmation statement, annual accounts, data protection renewal, UBO records and company changes.',
  h1: 'ADGM Licence Renewal and Annual Corporate Filings',
  intro: (
    <>
      <p>
        ADGM licence renewal is one of several yearly filings every ADGM company must make, alongside event-driven
        changes. Missing them can trigger late-filing penalties.
      </p>
      <p>
        We look after your company from <L to="adgm-company-formation">ADGM company registration</L> onwards, so
        nothing is missed.
      </p>
    </>
  ),
  sections: [
    { h2: 'Annual Filings We Handle', bullets: ['Licence renewal', 'Confirmation statement', 'Annual accounts filing', 'Data protection registration and renewal'] },
    { h2: 'Company Changes (Amendments)', bullets: ['Changes to directors', 'Changes to shareholders', 'Share capital amendments', 'Company name change', 'Registered address change', 'Licence amendments and activity updates'] },
    { h2: 'Registers and Records', bullets: ['Statutory registers', 'Beneficial ownership (UBO) records', 'Corporate resolutions'] },
    { h2: 'Certificates', text: <p>Certificate of incumbency and certificate of good standing. For attestation, see <L to="legal-translation-attestation-abu-dhabi">MOFA attestation</L>.</p> },
    {
      h2: 'Annual Compliance Calendar',
      table: {
        head: ['Filing', 'How often', 'What Bayana does'],
        rows: [
          ['Licence renewal', 'Every year, before the licence expiry date', 'Tracks the date, prepares and files the renewal'],
          ['Confirmation statement', 'Every year', 'Checks register details and files the statement'],
          ['Annual accounts', 'Every financial year', 'Coordinates filing with the Registration Authority'],
          ['Data protection registration', 'Every year, where personal data is processed', 'Files the registration and renewal'],
        ],
      },
    },
  ],
  steps: null,
  audience: 'Every ADGM company, SPV and foundation after registration.',
  faqs: [
    { q: 'When is the ADGM licence renewal due?', a: 'Each year before the licence expiry date. (VERIFY)' },
    { q: 'What is a confirmation statement?', a: 'A yearly filing confirming the company’s details on the register are correct.' },
    { q: 'When must annual accounts be filed?', a: 'Within the deadline set by ADGM after the financial year end. (VERIFY)' },
    { q: 'What is the data protection renewal?', a: 'ADGM companies that process personal data register with the Office of Data Protection and renew yearly. (VERIFY)' },
    { q: 'How do I change a director in ADGM?', a: 'Through a resolution and a filing with the Registration Authority. We prepare both.' },
  ],
  related: ['adgm-csp-registered-office', 'adgm-company-closure', 'adgm-aml-dnfbp-compliance'],
  disclaimer: true,
}

function FilingsRenewal() {
  return <ServiceLayout service={service} />
}

export default FilingsRenewal
