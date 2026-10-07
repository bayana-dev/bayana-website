import ServiceLayout from '../components/ServiceLayout'
import { L, Ext } from '../components/InlineLink'

// Blueprint page 11 — /adgm-spv-setup
// Main keyword: ADGM SPV setup
// Edit this page's text, FAQs and links in the object below. Layout is in components/ServiceLayout.jsx.
const service = {
  id: 11,
  slug: 'adgm-spv-setup',
  requiresCsp: true,
  keyword: 'ADGM SPV setup',
  title: 'ADGM SPV Setup & Registered Agent Services | Bayana',
  description:
    'Set up an ADGM special purpose vehicle to hold shares, property or investments. Incorporation, registered address, CSP appointment and annual filings.',
  h1: 'ADGM SPV Setup',
  intro: (
    <>
      <p>
        ADGM SPV setup gives you a company used to hold assets — shares, property or investments — and ring-fence
        liabilities.
      </p>
      <p>
        An SPV is one of the structures covered by our <L to="adgm-company-formation">ADGM company formation</L>{' '}
        service.
      </p>
    </>
  ),
  sections: [
    { h2: 'What an ADGM SPV Can Be Used For', bullets: ['Holding shares', 'Holding property', 'Joint ventures', 'Investment holding'] },
    {
      h2: 'Exempt vs Non-Exempt SPVs',
      text: (
        <p>
          Non-exempt SPVs must appoint a licensed company service provider, which also provides the registered
          address. See <L to="adgm-csp-registered-office">ADGM company service provider</L> and the guidance on{' '}
          <Ext href="https://www.adgm.com">adgm.com</Ext>.
        </p>
      ),
    },
    {
      h2: 'Our SPV Services',
      bullets: ['Structuring advice', 'Name reservation', 'Documents and KYC', 'Incorporation', 'Registered address (as CSP, once licensed)', 'Statutory registers', 'UBO records', 'Annual filings and renewal'],
    },
    { h2: 'What It Costs', text: <p>Costs depend on ADGM registration fees, CSP fees and the annual renewal. We send an itemised quote after the structuring consultation, with government fees shown separately from Bayana’s professional fees.</p> },
  ],
  steps: { h2: 'SPV Setup Steps', items: ['Structuring consultation', 'Name reservation', 'Documents and KYC', 'Incorporation filing', 'Registered address and CSP appointment', 'Registers, UBO records and annual filings'] },
  audience: 'Investors, family offices and groups that need a holding or ring-fencing vehicle.',
  faqs: [
    { q: 'What is an ADGM SPV?', a: 'A special purpose vehicle: a company set up to hold specific assets or liabilities separately.' },
    { q: 'Does an SPV need an office?', a: 'Non-exempt SPVs use their CSP’s registered address rather than a physical office. (VERIFY)' },
    { q: 'Does an SPV need a CSP?', a: <>Non-exempt SPVs must appoint a licensed CSP. See <L to="adgm-csp-registered-office">ADGM company service provider</L>.</> },
    { q: 'Can an SPV hold Dubai property?', a: 'Rules depend on the property and area. Confirm with your legal adviser. (VERIFY)' },
    { q: 'Can an SPV get visas?', a: 'Generally SPVs are holding vehicles and are not used for sponsoring visas. (VERIFY)' },
  ],
  related: ['adgm-csp-registered-office', 'adgm-foundation-setup', 'adgm-annual-filings-licence-renewal'],
  disclaimer: true,
}

function SpvSetup() {
  return <ServiceLayout service={service} />
}

export default SpvSetup
