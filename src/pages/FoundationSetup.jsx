import ServiceLayout from '../components/ServiceLayout'
import { L } from '../components/InlineLink'

// Blueprint page 12 — /adgm-foundation-setup
// Main keyword: ADGM foundation setup
// Edit this page's text, FAQs and links in the object below. Layout is in components/ServiceLayout.jsx.
const service = {
  id: 12,
  slug: 'adgm-foundation-setup',
  requiresCsp: true,
  keyword: 'ADGM foundation setup',
  title: 'ADGM Foundation Setup for Asset Protection | Bayana',
  description:
    'Set up an ADGM foundation for asset protection and succession planning. Charter support, registration, registered address and annual compliance.',
  h1: 'ADGM Foundation Setup',
  intro: (
    <>
      <p>
        ADGM foundation setup creates a separate legal entity with no shareholders, used for asset holding, family
        succession and wealth protection.
      </p>
      <p>
        A foundation sits alongside SPVs as a special structure within <L to="adgm-company-formation">ADGM company formation</L>.
      </p>
    </>
  ),
  sections: [
    { h2: 'Why Families Use an ADGM Foundation', bullets: ['Asset protection', 'Succession planning', 'Governance', 'Holding SPVs'] },
    {
      h2: 'Key Roles',
      defs: [
        ['Founder', 'The person who sets up the foundation and endows its assets.'],
        ['Council', 'Runs the foundation, similar to a board.'],
        ['Beneficiaries', 'The people who benefit from the foundation.'],
        ['Guardian', 'Oversees the council, where required.'],
      ],
    },
    { h2: 'Our Foundation Services', bullets: ['Coordination of charter and by-laws with your lawyers', 'Registration', 'Registered address', 'Annual compliance'] },
    { h2: 'Foundation vs Will', text: <p>A foundation holds assets during your lifetime and after; a will directs assets after death. Many families use both. See <L to="adgm-non-muslim-will-registration">register a non-Muslim will in Abu Dhabi</L>.</p> },
  ],
  steps: { h2: 'Foundation Setup Steps', items: ['Consultation on purpose and assets', 'Charter and by-laws drafted with your lawyer', 'KYC for founder, council and guardian', 'Registration filing', 'Registered address', 'Annual compliance'] },
  audience: 'Families, business owners and investors planning asset protection and succession.',
  faqs: [
    { q: 'Who can set up an ADGM foundation?', a: 'Individuals and companies can act as founder, subject to ADGM rules. (VERIFY)' },
    { q: 'Does a foundation need a CSP?', a: <>Foundations generally need a registered address through a licensed CSP. See <L to="adgm-csp-registered-office">registered office in ADGM</L>. (VERIFY)</> },
    { q: 'Can a foundation hold an SPV?', a: <>Yes, foundations are often used to hold SPVs. See <L to="adgm-spv-setup">ADGM SPV setup</L>.</> },
    { q: 'How long does registration take?', a: 'It depends mainly on how quickly the charter and KYC are ready. (VERIFY)' },
  ],
  related: ['adgm-spv-setup', 'adgm-non-muslim-will-registration', 'adgm-csp-registered-office'],
  disclaimer: true,
}

function FoundationSetup() {
  return <ServiceLayout service={service} />
}

export default FoundationSetup
