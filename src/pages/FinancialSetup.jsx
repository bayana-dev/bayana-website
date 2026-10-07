import ServiceLayout from '../components/ServiceLayout'
import { L } from '../components/InlineLink'

// Blueprint page 7 — /adgm-financial-services-company-setup
// Main keyword: ADGM financial services company setup
// Edit this page's text, FAQs and links in the object below. Layout is in components/ServiceLayout.jsx.
const service = {
  id: 7,
  slug: 'adgm-financial-services-company-setup',
  keyword: 'ADGM financial services company setup',
  title: 'ADGM Financial Services Company Setup | Bayana',
  description:
    'Corporate setup support for asset managers, advisers and brokers in ADGM: incorporation, office, visas and coordination with your FSRA consultant.',
  h1: 'ADGM Financial Services Company Setup',
  intro: (
    <>
      <p>
        ADGM financial services company setup involves more than a commercial licence. Asset managers, investment
        advisers, brokers and other regulated financial businesses may also need permission from the FSRA.
      </p>
      <p>
        Bayana handles the corporate side of your <L to="adgm-company-formation">ADGM company formation</L> while
        your regulatory adviser handles the FSRA application.
      </p>
    </>
  ),
  sections: [
    {
      h2: 'What Bayana Handles',
      bullets: [
        'Company incorporation',
        'Business activity coordination',
        'Office-space arrangements',
        'Corporate documentation',
        'Visa and immigration',
        'Establishment card and government procedures',
        'Coordination of regulatory documentation',
        'Coordination with regulatory consultants and lawyers',
        'Arranging MLRO and compliance providers',
      ],
    },
    {
      h2: 'What Your Regulatory Adviser Handles',
      text: (
        <p>
          The FSRA application itself is handled by your regulatory consultant, lawyer or qualified professional.
          Bayana does not submit FSRA applications — we work alongside your adviser so the corporate and regulatory
          tracks move together.
        </p>
      ),
    },
  ],
  steps: {
    h2: 'Setup Steps',
    items: ['Structure and activities', 'Adviser coordination', 'Incorporation', 'Office', 'Visas', 'MLRO / compliance providers'],
  },
  audience: 'Asset managers, investment advisers, brokers, fund managers and fintech firms.',
  faqs: [
    { q: 'Do financial firms need FSRA approval in ADGM?', a: 'Regulated financial activities generally need FSRA permission in addition to the commercial licence. Your regulatory adviser confirms what applies. (VERIFY)' },
    { q: 'Does Bayana submit the FSRA application?', a: 'No. The FSRA application is handled by your regulatory consultant or lawyer. We handle the corporate setup and coordinate with them.' },
    { q: 'Can you arrange an MLRO?', a: <>Yes — we arrange MLRO and compliance providers through our partners. See <L to="adgm-aml-dnfbp-compliance">ADGM AML and DNFBP compliance</L>.</> },
    { q: 'What office do financial firms need?', a: <>Requirements depend on the activity and permission. See <L to="adgm-office-space-lease">ADGM office space options</L>. (VERIFY)</> },
  ],
  related: ['adgm-aml-dnfbp-compliance', 'adgm-office-space-lease', 'adgm-visa-work-permit'],
  disclaimer: true,
}

function FinancialSetup() {
  return <ServiceLayout service={service} />
}

export default FinancialSetup
