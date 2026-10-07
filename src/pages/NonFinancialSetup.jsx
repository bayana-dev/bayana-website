import ServiceLayout from '../components/ServiceLayout'
import { L } from '../components/InlineLink'

// Blueprint page 8 — /adgm-non-financial-company-setup
// Main keyword: ADGM non-financial licence
// Edit this page's text, FAQs and links in the object below. Layout is in components/ServiceLayout.jsx.
const service = {
  id: 8,
  slug: 'adgm-non-financial-company-setup',
  keyword: 'ADGM non-financial licence',
  title: 'ADGM Non-Financial Licence & Company Setup | Bayana',
  description:
    'Set up a consultancy, tech, holding, trading or professional services company in ADGM. Licence, office, establishment card, visas and renewals.',
  h1: 'ADGM Non-Financial Company Setup',
  intro: (
    <>
      <p>
        An ADGM non-financial licence (Category B) covers businesses such as consultancies, technology companies,
        holding companies, trading companies and professional services firms.
      </p>
      <p>
        It follows the same path as every <L to="adgm-company-formation">ADGM company registration</L>, and Bayana
        takes you from activity selection to visas.
      </p>
    </>
  ),
  sections: [
    {
      h2: 'Businesses We Set Up',
      defs: [
        ['Management Consultancy', 'Advisory and consulting firms serving clients in the UAE and abroad.'],
        ['Technology Company', 'Software, IT services and tech start-ups.'],
        ['Holding Company', 'Companies that hold shares in other businesses.'],
        ['Trading Company', 'Businesses trading permitted goods.'],
        ['Professional Services Firm', 'Specialist professional practices.'],
        ['Other permitted activities', 'We check your activity against the ADGM activity list.'],
      ],
    },
    {
      h2: 'Services Included',
      bullets: [
        'Activity selection',
        'Company registration',
        'Documentation',
        'Office space',
        'Commercial licence',
        'Establishment card',
        'E-channel',
        'Visa applications',
        'Government permits and approvals',
        'Post-registration amendments',
        'Licence renewal',
        'Corporate filings',
      ],
    },
  ],
  steps: {
    h2: 'Steps',
    items: ['Consultation and activity check', 'Name reservation', 'Documents and KYC', 'Registration Authority submission', 'Office / lease registration', 'Commercial licence', 'Establishment card, e-channel and visas'],
  },
  audience: 'Founders of consultancies, tech companies, holding companies, trading companies and professional firms.',
  faqs: [
    { q: 'What is a Category B licence in ADGM?', a: 'It is the ADGM licence category for non-financial activities — consultancies, technology, holding, trading and professional services companies. Financial (FSRA-regulated) and retail activities follow their own routes. (VERIFY category labels)' },
    { q: 'Can I add activities later?', a: <>Yes, through a licence amendment. See <L to="adgm-annual-filings-licence-renewal">ADGM company amendments</L>.</> },
    { q: 'Can a holding company in ADGM also operate?', a: 'This depends on the activities on its licence. We advise during the consultation. (VERIFY)' },
    { q: 'How many visas can a non-financial company get?', a: <>It depends on your registered office arrangement. See <L to="adgm-office-space-lease">ADGM office space and visa quota</L>.</> },
  ],
  related: ['adgm-annual-filings-licence-renewal', 'adgm-visa-work-permit', 'adgm-office-space-lease'],
  disclaimer: true,
}

function NonFinancialSetup() {
  return <ServiceLayout service={service} />
}

export default NonFinancialSetup
