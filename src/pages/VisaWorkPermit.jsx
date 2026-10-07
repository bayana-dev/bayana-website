import ServiceLayout from '../components/ServiceLayout'
import { L } from '../components/InlineLink'

// Blueprint page 16 — /adgm-visa-work-permit
// Main keyword: ADGM visa services
// Edit this page's text, FAQs and links in the object below. Layout is in components/ServiceLayout.jsx.
const service = {
  id: 16,
  slug: 'adgm-visa-work-permit',
  keyword: 'ADGM visa services',
  title: 'ADGM Visa & Work Permit Services | Bayana Al Reem',
  description:
    'Director, employee and dependent visas plus ADGM work permits for golden-visa and family-visa holders. Establishment card, e-channel, medical and Emirates ID.',
  h1: 'ADGM Visa and Work Permit Services',
  intro: (
    <>
      <p>
        ADGM visa services start after your licence is issued: the company needs an establishment card and e-channel
        before it can sponsor employees.
      </p>
      <p>
        Visas are the final stage of <L to="adgm-company-formation">ADGM company formation</L>, and we handle them from
        start to finish.
      </p>
    </>
  ),
  sections: [
    { h2: 'Step 1 — Establishment Card and E-Channel', text: <p>The establishment card registers your company with immigration, and e-channel lets it apply for visas. Both come before any visa application.</p> },
    {
      h2: 'Visas We Process',
      defs: [
        ['Director visa', 'Shareholders and directors may be eligible, subject to ADGM rules.'],
        ['Employee visa', 'For staff employed by your ADGM company.'],
        ['Dependent visa', 'For family members of visa holders.'],
      ],
    },
    { h2: 'ADGM Work Permits', text: <p>For people who already hold UAE residence: family-visa holders, golden-visa holders, UAE nationals where applicable, and other eligible residents.</p> },
    { h2: 'Medical, Emirates ID and Renewals', bullets: ['Medical fitness', 'Emirates ID', 'Visa renewals', 'Amendments', 'Cancellations'] },
    { h2: 'How Many Visas Can My Company Get?', text: <p>It depends on your registered office arrangement. See <L to="adgm-office-space-lease">ADGM office space on Al Reem Island</L>. We confirm the current quota for your office before you sign a lease.</p> },
    { h2: 'Portals We Use', text: <p>The ACCESSADGM portal and, where applicable, UAE federal ICP channels.</p> },
  ],
  steps: { h2: 'How It Works', items: ['Establishment card', 'E-channel registration', 'Entry permit / work permit', 'Medical fitness test', 'Emirates ID', 'Visa stamping and renewals'] },
  audience: 'New and existing ADGM companies hiring staff, and directors relocating to the UAE.',
  faqs: [
    { q: 'How do I get a director visa in ADGM?', a: 'Once the company has its establishment card and e-channel, we apply for the director visa. Eligibility depends on ADGM rules. (VERIFY)' },
    { q: 'Can my golden-visa holder spouse work for my ADGM company?', a: 'Yes, through an ADGM work permit, subject to eligibility.' },
    { q: 'What is an ADGM establishment card?', a: 'It registers your company with immigration and is required before sponsoring visas.' },
    { q: 'How long does an ADGM employment visa take?', a: 'Timelines vary with medical and Emirates ID appointments. (VERIFY)' },
    { q: 'Can I cancel a visa through Bayana?', a: 'Yes, we handle visa cancellations.' },
    { q: 'What is the ACCESSADGM portal?', a: 'ADGM’s portal for establishment card, e-channel, visa and work permit applications.' },
  ],
  related: ['adgm-office-space-lease', 'adgm-company-formation', 'adgm-company-closure'],
  disclaimer: true,
}

function VisaWorkPermit() {
  return <ServiceLayout service={service} />
}

export default VisaWorkPermit
