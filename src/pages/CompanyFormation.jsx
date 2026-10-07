import ServiceLayout from '../components/ServiceLayout'
import { L, Ext } from '../components/InlineLink'

// Blueprint page 6 — /adgm-company-formation
// Main keyword: ADGM company formation
// Edit this page's text, FAQs and links in the object below. Layout is in components/ServiceLayout.jsx.
const service = {
  id: 6,
  slug: 'adgm-company-formation',
  keyword: 'ADGM company formation',
  title: 'ADGM Company Formation & Registration | Bayana',
  description:
    'Set up your ADGM company with Bayana: structure advice, name reservation, documents, KYC, Registration Authority filing, licence and establishment card.',
  h1: 'ADGM Company Formation and Registration',
  intro: (
    <>
      <p>
        Bayana handles ADGM company formation from choosing the right legal structure to receiving your commercial
        licence and establishment card. One team on Al Reem Island manages the documents, the filings and the
        follow-up with the ADGM Registration Authority.
      </p>
      <p>
        Whether you are a <L to="adgm-financial-services-company-setup">financial services firm</L>, a{' '}
        <L to="adgm-non-financial-company-setup">consultancy or tech company</L> or a{' '}
        <L to="adgm-retail-licence">shop or restaurant</L>, the process starts the same way: a free consultation on
        your structure and activities.
      </p>
    </>
  ),
  sections: [
    {
      h2: 'Our ADGM Company Formation Services',
      bullets: [
        'Advice on legal structure and business activities',
        'Company name reservation',
        'Business activity selection',
        'Preparation and review of incorporation documents',
        'KYC documentation',
        'Articles of Association and corporate documents',
        'Submission and follow-up with the ADGM Registration Authority',
        'Registered office arrangements',
        'Commercial licence issuance',
        'Establishment card and immigration procedures',
      ],
    },
    {
      h2: 'Choose Your Sector',
      cards: ['adgm-financial-services-company-setup', 'adgm-non-financial-company-setup', 'adgm-retail-licence'],
    },
    { h2: 'Special Structures', cards: ['adgm-spv-setup', 'adgm-foundation-setup'] },
    {
      h2: 'Office Requirement',
      text: (
        <p>
          Companies on Al Reem Island and Al Maryah Island need a suitable registered office — a desk or an office.
          See <L to="adgm-office-space-lease">ADGM office space on Al Reem Island</L>, available through our sister
          company <Ext href="https://aegiscoworking.ae">Aegis Coworking Business Center</Ext> at Addax Tower.
        </p>
      ),
    },
    {
      h2: '100% Foreign Ownership',
      text: (
        <p>
          ADGM allows foreign investors to own 100% of their company, subject to applicable requirements. We confirm
          what applies to your chosen activity during the consultation.
        </p>
      ),
    },
    {
      h2: 'After Your Company Is Registered',
      text: (
        <p>
          Registration is the start. We also handle <L to="adgm-annual-filings-licence-renewal">ADGM licence renewal
          and annual filings</L>, <L to="adgm-visa-work-permit">ADGM visa services</L> and, when needed,{' '}
          <L to="adgm-company-closure">company closure</L>. If you are moving an existing Al Reem Island business across, see{' '}
          <L to="ded-to-adgm-licence-conversion">DED to ADGM licence conversion</L>.
        </p>
      ),
    },
  ],
  steps: {
    h2: 'The ADGM Company Formation Process',
    items: [
      'Consultation and activity check',
      'Name reservation',
      'Documents and KYC',
      'Articles of Association',
      'Registration Authority submission',
      'Office / lease registration',
      'Commercial licence',
      'Establishment card, e-channel and visas',
    ],
  },
  audience:
    'Entrepreneurs, investors, family offices and growing companies that want an ADGM company with one point of contact for licence, visas and office.',
  faqs: [
    { q: 'What documents do I need to form an ADGM company?', a: 'Typically passport copies and KYC documents for shareholders and directors, proof of address, a business plan or activity description and a registered office arrangement. We send you an exact checklist for your structure. (VERIFY)' },
    { q: 'How long does ADGM registration take?', a: 'It depends on the structure, activity and how quickly documents are ready. We give you a realistic timeline at the consultation. (VERIFY typical timeline)' },
    { q: 'Can I set up without visiting the UAE?', a: 'Much of the process can be done remotely with properly certified documents. Some later steps, such as visa medicals and Emirates ID, need you in the UAE. (VERIFY)' },
    { q: 'Do I need a local partner?', a: 'No. ADGM allows 100% foreign ownership, subject to applicable requirements.' },
    { q: 'What happens after the licence is issued?', a: 'Next come the establishment card, e-channel registration and visas, followed by yearly filings and licence renewal. Bayana handles all of these.' },
    { q: 'What types of companies can be registered in ADGM?', a: 'Common forms include companies limited by shares, special purpose vehicles (SPVs) and foundations, among others.' },
  ],
  related: ['adgm-office-space-lease', 'adgm-visa-work-permit', 'ded-to-adgm-licence-conversion'],
  disclaimer: true,
}

function CompanyFormation() {
  return <ServiceLayout service={service} />
}

export default CompanyFormation
